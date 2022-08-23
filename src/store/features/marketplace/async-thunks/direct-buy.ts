import { Principal } from '@dfinity/principal';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { notificationActions } from '../../notifications';
import {
  DirectBuy,
  marketplaceActions,
  CollectionDetails,
} from '../marketplace-slice';
import config from '../../../../config/env';
import wicpIdlFactory from '../../../../declarations/wicp.did';
import marketplaceIdlFactory from '../../../../declarations/marketplace.did';
import { AppLog } from '../../../../utils/log';
import { KyasshuUrl } from '../../../../integrations/kyasshu';
import { errorMessageHandler } from '../../../../utils/error';
import { parseAmountToE8S } from '../../../../utils/formatters';
import { TransactionStatus } from '../../../../constants/transaction-status';

type DirectBuyProps = DefaultCallbacks &
  DirectBuy &
  CollectionDetails;

export const directBuy = createAsyncThunk<
  DirectBuy | undefined,
  DirectBuyProps
>('marketplace/directBuy', async (params, { dispatch, getState }) => {
  const { tokenId, price, collectionId, onSuccess, onFailure } =
    params;

  const {
    marketplace: { sumOfUserAllowance },
  }: any = getState();

  const marketplaceCanisterId = Principal.fromText(
    config.marketplaceCanisterId,
  );
  const nonFungibleContractAddress = Principal.fromText(collectionId);

  dispatch(marketplaceActions.setTransactionStepsToDefault());

  try {
    const allowanceAmountInWICP = sumOfUserAllowance
      ? sumOfUserAllowance + Number(price)
      : Number(price);

    const allowanceAmount = parseAmountToE8S(
      allowanceAmountInWICP.toString(),
    );

    const WICP_APPROVE = {
      idl: wicpIdlFactory,
      canisterId: config.wICPCanisterId,
      methodName: 'approve',
      args: [marketplaceCanisterId, allowanceAmount],
      onSuccess: (res: any) => {
        // check if error
        if ('Err' in res)
          throw new Error(errorMessageHandler(res.Err));

        const transactionStepStatus = {
          approveWICPStatus: TransactionStatus.completed,
          saleStatus: TransactionStatus.inProgress,
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

    const MKP_DIRECT_BUY = {
      idl: marketplaceIdlFactory,
      canisterId: config.marketplaceCanisterId,
      methodName: 'directBuy',
      args: [nonFungibleContractAddress, tokenId],
      onFail: (res: any) => {
        throw res;
      },
      onSuccess: async (res: any) => {
        if ('Err' in res)
          throw new Error(errorMessageHandler(res.Err));

        if (typeof onSuccess !== 'function') return;

        // We call the Cap Sync process
        await axios.get(KyasshuUrl.getCAPJellySync());

        const transactionStepStatus = {
          approveWICPStatus: TransactionStatus.completed,
          saleStatus: TransactionStatus.completed,
        };
        dispatch(
          marketplaceActions.updateTransactionSteps(
            transactionStepStatus,
          ),
        );

        onSuccess();
      },
    };

    // TODO: Show transaction progress steps in UI
    const batchTxRes = await window.ic?.plug?.batchTransactions([
      WICP_APPROVE,
      // MKP_DEPOSIT_WICP,
      MKP_DIRECT_BUY,
    ]);

    if (!batchTxRes) {
      throw new Error('Empty response');
    }

    return {
      tokenId,
      price,
    };
  } catch (err: any) {
    AppLog.error(err);

    const defaultErrorMessage = `Oops! Failed to direct buy`;

    dispatch(
      notificationActions.setErrorMessage(
        err?.message || defaultErrorMessage,
      ),
    );
    if (typeof onFailure === 'function') {
      onFailure(err);
    }
    dispatch(
      marketplaceActions.setFailedTransactions(defaultErrorMessage),
    );
  }
});
