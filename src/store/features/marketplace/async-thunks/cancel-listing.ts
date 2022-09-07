import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { notificationActions } from '../../notifications';
import marketplaceV2IdlFactory from '../../../../declarations/marketplace-v2.did';
import {
  CancelListing,
  CollectionDetails,
  marketplaceSlice,
} from '../marketplace-slice';
import { AppLog } from '../../../../utils/log';
import { KyasshuUrl } from '../../../../integrations/kyasshu';
import { errorMessageHandler } from '../../../../utils/error';
import { jellyJsInstanceHandler } from '../../../../integrations/jelly-js';
import { getJellyCollection } from '../../../../utils/jelly';

export type CancelListingProps = DefaultCallbacks &
  CancelListing &
  CollectionDetails;

export const cancelListing = createAsyncThunk<
  CancelListing | undefined,
  CancelListingProps
>(
  'marketplace/cancelListing',
  async ({ id, collectionId, onSuccess, onFailure }, thunkAPI) => {
    const { dispatch } = thunkAPI;

    // Checks if an actor instance exists already
    // otherwise creates a new instance
    const jellyInstance = await jellyJsInstanceHandler({
      thunkAPI,
      collectionId: collectionId.toString(),
      slice: marketplaceSlice,
    });

    const collection = await getJellyCollection({
      jellyInstance,
      collectionId: collectionId.toString(),
    });

    if (!collection)
      throw Error(`Oops! collection ${collectionId} not found!`);

    if (!collection?.marketplaceId)
      throw Error(
        `Oops! marketplace id ${collection?.marketplaceId} not found!`,
      );

    const { marketplaceId } = collection;

    try {
      const MKP_CANCEL_LISTING = {
        idl: marketplaceV2IdlFactory,
        canisterId: marketplaceId.toString(),
        methodName: 'cancel_listing',
        args: [
          {
            collection: collection.id,
            token_id: id,
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

          onSuccess();
        },
      };

      const batchTxRes = await window.ic?.plug?.batchTransactions([
        MKP_CANCEL_LISTING,
      ]);

      if (!batchTxRes) {
        throw new Error('Empty response');
      }

      return {
        id,
      };
    } catch (err: any) {
      AppLog.error(err);

      const defaultErrorMessage = `Oops! Failed to cancel listing`;

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
