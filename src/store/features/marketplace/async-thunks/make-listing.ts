import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import nftIdlFactory from '../../../../declarations/nft.did';
import marketplaceV2IdlFactory from '../../../../declarations/marketplace-v2.did';
import { notificationActions } from '../../notifications';
import {
  MakeListing,
  marketplaceActions,
  CollectionDetails,
  marketplaceSlice,
} from '../marketplace-slice';
import { jellyJsInstanceHandler } from '../../../../integrations/jelly-js';
import { getJellyCollection } from '../../../../utils/jelly';
import { AppLog } from '../../../../utils/log';
import { parseAmountToE8S } from '../../../../utils/formatters';
import { KyasshuUrl } from '../../../../integrations/kyasshu';
import { errorMessageHandler } from '../../../../utils/error';
import { TransactionStatus } from '../../../../constants/transaction-status';

type MakeListingProps = DefaultCallbacks &
  MakeListing &
  CollectionDetails;

export const makeListing = createAsyncThunk<
  MakeListing | undefined,
  MakeListingProps
>(
  'marketplace/makeListing',
  async (
    { id, amount, collectionId, onSuccess, onFailure },
    thunkAPI,
  ) => {
    const { dispatch } = thunkAPI;

    // Checks if an actor instance exists already
    // otherwise creates a new instance
    const jellyInstance = await jellyJsInstanceHandler({
      thunkAPI,
      collectionId,
      slice: marketplaceSlice,
    });

    const collection = await getJellyCollection({
      jellyInstance,
      collectionId,
    });

    if (!collection)
      throw Error(`Oops! collection ${collectionId} not found!`);

    if (!collection?.marketplaceId)
      throw Error(
        `Oops! marketplace id ${collection?.marketplaceId} not found!`,
      );

    const { marketplaceId } = collection;

    const userOwnedTokenId = BigInt(id);
    const userListForPrice = parseAmountToE8S(amount);

    dispatch(marketplaceActions.setTransactionStepsToDefault());

    try {
      const NFT_APPROVE_MARKETPLACE = {
        idl: nftIdlFactory,
        canisterId: collectionId,
        methodName: 'dip721_approve',
        args: [marketplaceId, userOwnedTokenId],
        onSuccess: (res: any) => {
          if ('Err' in res)
            throw new Error(errorMessageHandler(res.Err));

          const transactionStepStatus = {
            approveWICPStatus: TransactionStatus.completed,
            listingStatus: TransactionStatus.inProgress,
          };
          dispatch(
            marketplaceActions.updateTransactionSteps(
              transactionStepStatus,
            ),
          );
        },
        onFail: (res: any) => {
          throw res;
        },
      };

      const MKP_MAKE_LISTING = {
        idl: marketplaceV2IdlFactory,
        canisterId: marketplaceId.toString(),
        methodName: 'make_listing',
        args: [
          {
            token_id: userOwnedTokenId.toString(),
            collection: collection.id,
            seller: [],
            version: [],
            fungible_id: [],
            caller: [],
            buyer: [],
            price: [userListForPrice],
          },
        ],
        onSuccess: async (res: any) => {
          if ('Err' in res)
            throw new Error(errorMessageHandler(res.Err));

          if (typeof onSuccess !== 'function') return;

          // TODO: should run cap sync for v2
          // We call the Cap Sync process
          await axios.get(KyasshuUrl.getCAPJellySync());

          const transactionStepStatus = {
            approveWICPStatus: TransactionStatus.completed,
            listingStatus: TransactionStatus.completed,
          };
          dispatch(
            marketplaceActions.updateTransactionSteps(
              transactionStepStatus,
            ),
          );

          onSuccess();
        },
        onFail: (res: any) => {
          throw res;
        },
      };

      // TODO: Show transaction progress steps in UI
      const batchTxRes = await window.ic?.plug?.batchTransactions([
        NFT_APPROVE_MARKETPLACE,
        MKP_MAKE_LISTING,
      ]);

      if (!batchTxRes) {
        throw new Error('Empty response');
      }

      return {
        id,
        amount,
      };
    } catch (err: any) {
      AppLog.error(err);

      const defaultErrorMessage = `Oops! Failed to make listing`;

      dispatch(
        notificationActions.setErrorMessage(
          err?.message || defaultErrorMessage,
        ),
      );
      if (typeof onFailure === 'function') {
        onFailure(err);
      }
    }
  },
);
