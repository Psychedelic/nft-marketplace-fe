import { Principal } from '@dfinity/principal';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../../../config/env';
import nftIdlFactory from '../../../../declarations/nft.did';
import crownsIdlFactory from '../../../../declarations/crowns.did';
import marketplaceIdlFactory from '../../../../declarations/marketplace.did';
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

    console.log('[debug] collection >>', collection);

    console.log('[debug] make-listing: bp: ', 2);

    if (!collection)
      throw Error(`Oops! collection ${collectionId} not found!`);

    if (!collection?.marketplaceId)
      throw Error(
        `Oops! marketplace id ${collection?.marketplaceId} not found!`,
      );

    const { marketplaceId } = collection;

    const nonFungibleContractAddress =
      Principal.fromText(collectionId);

    const userOwnedTokenId = BigInt(id);
    const userListForPrice = parseAmountToE8S(amount);

    console.log('[debug] make-listing: bp: ', 3);

    dispatch(marketplaceActions.setTransactionStepsToDefault());

    console.log('[debug] make-listing: bp: ', 4);

    try {
      const NFT_APPROVE_MARKETPLACE = {
        // idl: crownsIdlFactory,
        // canisterId: 'vlhm2-4iaaa-aaaam-qaatq-cai',
        idl: nftIdlFactory,
        canisterId: collectionId,
        methodName: 'approve',
        args: [marketplaceId, userOwnedTokenId],
        onSuccess: (res: any) => {
          // if ('Err' in res)
          //   throw new Error(errorMessageHandler(res.Err));
          console.log('[debug] make-listing: bp: ', 5);

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
          console.log('[debug] make-listing: bp: ', 5.1);
          throw res;
        },
      };

      console.log('[debug] make-listing: bp: ', 4.1);

      const MKP_MAKE_LISTING = {
        idl: marketplaceIdlFactory,
        canisterId: marketplaceId.toString(),
        methodName: 'make_listing',
        args: [
          {
            token_id: userOwnedTokenId.toString(),
            collection,
            price: userListForPrice,
            // nonFungibleContractAddress,
            // userOwnedTokenId,
            // userListForPrice,
          },
        ],
        onSuccess: async (res: any) => {
          // if ('Err' in res)
          //   throw new Error(errorMessageHandler(res.Err));

          // if (typeof onSuccess !== 'function') return;

          // We call the Cap Sync process
          // await axios.get(KyasshuUrl.getCAPJellySync());

          console.log('[debug] make-listing: bp: ', 6);

          const transactionStepStatus = {
            approveWICPStatus: TransactionStatus.completed,
            listingStatus: TransactionStatus.completed,
          };
          dispatch(
            marketplaceActions.updateTransactionSteps(
              transactionStepStatus,
            ),
          );

          // onSuccess();
        },
        onFail: (res: any) => {
          throw res;
        },
      };

      console.log('[debug] make-listing: bp: ', 4.2);

      // TODO: Show transaction progress steps in UI
      const batchTxRes = await window.ic?.plug?.batchTransactions([
        NFT_APPROVE_MARKETPLACE,
        // MKP_MAKE_LISTING,
      ]);

      console.log('[debug] make-listing: bp: ', 4.3);

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
