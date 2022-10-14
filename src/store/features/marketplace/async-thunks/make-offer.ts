import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { notificationActions } from '../../notifications';
import {
  MakeOffer,
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
import { parseAmountToE8S } from '../../../../utils/formatters';
import { errorMessageHandler } from '../../../../utils/error';
import { KyasshuUrl } from '../../../../integrations/kyasshu';
import { TransactionStatus } from '../../../../constants/transaction-status';

export type MakeOfferProps = DefaultCallbacks &
  MakeOffer &
  CollectionDetails;

export const makeOffer = createAsyncThunk<
  MakeOffer | undefined,
  MakeOfferProps
>('marketplace/makeOffer', async (params, thunkAPI) => {
  const { id, amount, collectionId, onSuccess, onFailure } = params;

  const { dispatch, getState } = thunkAPI;

  // Checks if an actor instance exists already
  // otherwise creates a new instance
  const jellyInstance = await jellyJsInstanceHandler({
    thunkAPI,
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
  const userOfferInPrice = parseAmountToE8S(amount);

  // Allowance amount calculation
  const {
    marketplace: { sumOfUserAllowance },
  }: any = getState();

  const allowanceAmountInWICP = sumOfUserAllowance
    ? sumOfUserAllowance + Number(amount)
    : Number(amount);

  const allowanceAmount = parseAmountToE8S(
    allowanceAmountInWICP.toString(),
  );

  console.log(allowanceAmount, 'allowanceAmount');

  // Initialize transaction steps in UI
  dispatch(marketplaceActions.setTransactionStepsToDefault());

  try {
    const WICP_APPROVE_MARKETPLACE = {
      idl: wicpIdlFactory,
      canisterId: config.wICPCanisterId,
      methodName: 'approve',
      args: [marketplaceId, allowanceAmount],
      onSuccess: (res: any) => {
        if ('Err' in res)
          throw new Error(errorMessageHandler(res.Err));

        const transactionStepStatus = {
          approveWICPStatus: TransactionStatus.completed,
          makeOfferStatus: TransactionStatus.inProgress,
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

    const MKP_MAKE_OFFER = {
      idl: marketplaceV2IdlFactory,
      canisterId: marketplaceId.toString(),
      methodName: 'make_offer',
      args: [
        {
          token_id: userOwnedTokenId.toString(),
          collection: collection.id,
          seller: [],
          version: [],
          fungible_id: [],
          caller: [],
          buyer: [],
          price: [userOfferInPrice],
        },
      ],
      onSuccess: async (res: any) => {
        if ('Err' in res)
          throw new Error(errorMessageHandler(res.Err));

        if (typeof onSuccess !== 'function') return;

        // We call the Cap Sync process
        await axios.get(KyasshuUrl.getCAPJellySync());

        const transactionStepStatus = {
          approveWICPStatus: TransactionStatus.completed,
          makeOfferStatus: TransactionStatus.completed,
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
      WICP_APPROVE_MARKETPLACE,
      MKP_MAKE_OFFER,
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

    const defaultErrorMessage = `Oops! Failed to make offer`;

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
