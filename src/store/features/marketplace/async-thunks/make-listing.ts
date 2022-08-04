import { Principal } from '@dfinity/principal';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../../../config/env';
import crownsIdlFactory from '../../../../declarations/nft.did';
import marketplaceIdlFactory from '../../../../declarations/marketplace.did';
import { notificationActions } from '../../notifications';
import {
  MakeListing,
  marketplaceActions,
} from '../marketplace-slice';
import { AppLog } from '../../../../utils/log';
import { parseAmountToE8S } from '../../../../utils/formatters';
import { KyasshuUrl } from '../../../../integrations/kyasshu';
import { errorMessageHandler } from '../../../../utils/error';
import { TransactionStatus } from '../../../../constants/transaction-status';

type MakeListingProps = DefaultCallbacks & MakeListing;

export const makeListing = createAsyncThunk<
  MakeListing | undefined,
  MakeListingProps
>(
  'marketplace/makeListing',
  async ({ id, amount, onSuccess, onFailure }, { dispatch }) => {
    const marketplaceCanisterId = Principal.fromText(
      config.marketplaceCanisterId,
    );
    const nonFungibleContractAddress = Principal.fromText(
      config.nftCollectionId,
    );

    const userOwnedTokenId = BigInt(id);
    const userListForPrice = parseAmountToE8S(amount);

    dispatch(marketplaceActions.setTransactionStepsToDefault());

    try {
      const CROWNS_APPROVE_MARKETPLACE = {
        idl: crownsIdlFactory,
        canisterId: config.nftCollectionId,
        methodName: 'approve',
        args: [marketplaceCanisterId, userOwnedTokenId],
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
        idl: marketplaceIdlFactory,
        canisterId: config.marketplaceCanisterId,
        methodName: 'makeListing',
        args: [
          nonFungibleContractAddress,
          userOwnedTokenId,
          userListForPrice,
        ],
        onSuccess: async (res: any) => {
          if ('Err' in res)
            throw new Error(errorMessageHandler(res.Err));

          if (typeof onSuccess !== 'function') return;

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
        CROWNS_APPROVE_MARKETPLACE,
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
