import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { notificationActions } from '../../notifications';
import {
  CancelOffer,
  CollectionDetails,
  marketplaceSlice,
} from '../marketplace-slice';
import { jellyJsInstanceHandler } from '../../../../integrations/jelly-js';
import { getJellyCollection } from '../../../../utils/jelly';
import marketplaceV2IdlFactory from '../../../../declarations/marketplace-v2.did';
import { AppLog } from '../../../../utils/log';
import { KyasshuUrl } from '../../../../integrations/kyasshu';
import { errorMessageHandler } from '../../../../utils/error';

export type CancelOfferProps = DefaultCallbacks &
  CancelOffer &
  CollectionDetails;

export const cancelOffer = createAsyncThunk<
  CancelOffer | undefined,
  CancelOfferProps
>('marketplace/cancelOffer', async (params, thunkAPI) => {
  const { id, collectionId, onSuccess, onFailure } = params;
  const { dispatch } = thunkAPI;

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
    const MKP_CANCEL_OFFER = {
      idl: marketplaceV2IdlFactory,
      canisterId: marketplaceId.toString(),
      methodName: 'cancel_offer',
      args: [
        {
          token_id: id,
          collection: collection.id,
          seller: [],
          version: [],
          fungible_id: [],
          caller: [],
          buyer: [],
          price: [],
        },
      ],
      onSuccess: async (res: any) => {
        if ('Err' in res)
          throw new Error(errorMessageHandler(res.Err));

        if (typeof onSuccess !== 'function') return;

        // We call the Cap Sync process
        await axios.get(KyasshuUrl.getCAPJellySync());

        onSuccess();
      },
      onFail: (res: any) => {
        throw res;
      },
    };

    const batchTxRes = await window.ic?.plug?.batchTransactions([
      MKP_CANCEL_OFFER,
    ]);

    if (!batchTxRes) {
      throw new Error('Empty response');
    }

    return {
      id,
    };
  } catch (err: any) {
    AppLog.error(err);

    const defaultErrorMessage = `Oops! Failed to cancel offer`;

    dispatch(
      notificationActions.setErrorMessage(
        err?.message || defaultErrorMessage,
      ),
    );
    if (typeof onFailure === 'function') {
      onFailure(err);
    }
  }
});

