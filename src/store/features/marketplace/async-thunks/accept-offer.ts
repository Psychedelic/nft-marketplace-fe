import { createAsyncThunk } from '@reduxjs/toolkit';
import { Principal } from '@dfinity/principal';
import axios from 'axios';
import { notificationActions } from '../../notifications';
import {
  AcceptOffer,
  CollectionDetails,
  marketplaceActions,
  marketplaceSlice,
} from '../marketplace-slice';
import { jellyJsInstanceHandler } from '../../../../integrations/jelly-js';
import { getJellyCollection } from '../../../../utils/jelly';
import marketplaceV2IdlFactory from '../../../../declarations/marketplace-v2.did';
import nftIdlFactory from '../../../../declarations/nft.did';
import { AppLog } from '../../../../utils/log';
import { KyasshuUrl } from '../../../../integrations/kyasshu';
import { errorMessageHandler } from '../../../../utils/error';
import { TransactionStatus } from '../../../../constants/transaction-status';

export type AcceptOfferProps = DefaultCallbacks &
  AcceptOffer &
  CollectionDetails;

export const acceptOffer = createAsyncThunk<
  AcceptOffer | undefined,
  AcceptOfferProps
>('marketplace/acceptOffer', async (params, thunkAPI) => {
  const {
    id,
    collectionId,
    buyerPrincipalId,
    offerPrice,
    onSuccess,
    onFailure,
  } = params;

  const { dispatch } = thunkAPI;

  dispatch(marketplaceActions.setTransactionStepsToDefault());

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

  try {
    const userOwnedTokenId = BigInt(id);
    const buyerAddress = Principal.fromText(buyerPrincipalId);

    const NFT_APPROVE_MARKETPLACE = {
      idl: nftIdlFactory,
      canisterId: collectionId,
      methodName: 'dip721_approve',
      args: [marketplaceId, userOwnedTokenId],
      onSuccess: (res: any) => {
        // check if error
        if ('Err' in res)
          throw new Error(errorMessageHandler(res.Err));

        const transactionStepStatus = {
          approveWICPStatus: TransactionStatus.completed,
          acceptOfferStatus: TransactionStatus.inProgress,
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

    const MKP_ACCEPT_OFFER = {
      idl: marketplaceV2IdlFactory,
      canisterId: marketplaceId.toString(),
      methodName: 'accept_offer',
      args: [
        {
          token_id: userOwnedTokenId.toString(),
          collection: collection.id,
          seller: [],
          version: [],
          fungible_id: [],
          caller: [],
          buyer: [buyerAddress],
          price: [],
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
          acceptOfferStatus: TransactionStatus.completed,
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
    const batchTxRes = await (
      window as any
    )?.ic?.plug?.batchTransactions([
      NFT_APPROVE_MARKETPLACE,
      MKP_ACCEPT_OFFER,
    ]);

    if (!batchTxRes) {
      throw new Error('Empty response');
    }

    return {
      id,
      buyerPrincipalId,
      offerPrice,
    };
  } catch (err: any) {
    AppLog.error(err);

    const defaultErrorMessage = `Oops! Failed to accept offer`;

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
