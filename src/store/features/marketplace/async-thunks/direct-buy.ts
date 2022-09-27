import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { notificationActions } from '../../notifications';
import {
  DirectBuy,
  marketplaceActions,
  CollectionDetails,
  marketplaceSlice,
} from '../marketplace-slice';
import { jellyJsInstanceHandler } from '../../../../integrations/jelly-js';
import { getJellyCollection } from '../../../../utils/jelly';
import config from '../../../../config/env';
import wicpIdlFactory from '../../../../declarations/wicp.did';
import marketplaceV2IdlFactory from '../../../../declarations/marketplace-v2.did';
import { AppLog } from '../../../../utils/log';
import { KyasshuUrl } from '../../../../integrations/kyasshu';
import { errorMessageHandler } from '../../../../utils/error';
import { parseAmountToE8S } from '../../../../utils/formatters';
import { TransactionStatus } from '../../../../constants/transaction-status';

type DirectBuyProps = DefaultCallbacks &
  DirectBuy &
  CollectionDetails &
  CollectionDetails;

export const directBuy = createAsyncThunk<
  DirectBuy | undefined,
  DirectBuyProps
>('marketplace/directBuy', async (params, thunkAPI) => {
  const { tokenId, price, collectionId, onSuccess, onFailure } =
    params;

  const { dispatch, getState } = thunkAPI;

  const {
    marketplace: { sumOfUserAllowance },
  }: any = getState();

  dispatch(marketplaceActions.setTransactionStepsToDefault());

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

  try {
    const allowanceAmountInWICP = sumOfUserAllowance
      ? sumOfUserAllowance + Number(price)
      : Number(price);

    const allowanceAmount = parseAmountToE8S(
      allowanceAmountInWICP.toString(),
    );

    const WICP_APPROVE_MARKETPLACE = {
      idl: wicpIdlFactory,
      canisterId: config.wICPCanisterId,
      methodName: 'approve',
      args: [marketplaceId, allowanceAmount],
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
      idl: marketplaceV2IdlFactory,
      canisterId: marketplaceId.toString(),
      methodName: 'direct_buy',
      args: [
        {
          token_id: tokenId.toString(),
          collection: collection.id,
          seller: [],
          version: [],
          fungible_id: [],
          caller: [],
          buyer: [],
          price: [],
        },
      ],
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

    const batchTxRes = await window.ic?.plug?.batchTransactions([
      WICP_APPROVE_MARKETPLACE,
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
