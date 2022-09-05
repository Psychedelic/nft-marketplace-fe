// import { Principal } from '@dfinity/principal';
import { createAsyncThunk } from '@reduxjs/toolkit';
// import { Collection } from '@psychedelic/jelly-js';
import { jellyJsInstanceHandler } from '../../../../integrations/jelly-js';
import { getJellyCollection } from '../../../../utils/jelly';
import { parseAmountToE8S } from '../../../../utils/formatters';
import {
  // MakeListing,
  marketplaceActions,
  // CollectionDetails,
  marketplaceSlice,
} from '../marketplace-slice';
import { notificationActions } from '../../notifications';
import { AppLog } from '../../../../utils/log';
import { TransactionStatus } from '../../../../constants/transaction-status';

// TODO: set the correct thunk types
export const addToListing = createAsyncThunk<any | undefined, any>(
  'marketplace/addToListing',
  async (
    { id, amount, collectionId, onSuccess, onFailure },
    thunkAPI,
  ) => {
    const { dispatch } = thunkAPI;

    const userOwnedTokenId = BigInt(id);
    const userListForPrice = parseAmountToE8S(amount);

    dispatch(marketplaceActions.setTransactionStepsToDefault());

    try {
      // Checks if an actor instance exists already
      // otherwise creates a new instance
      const jellyInstance = await jellyJsInstanceHandler({
        thunkAPI,
        collectionId,
        slice: marketplaceSlice,
      });

      const collection = getJellyCollection({
        jellyInstance,
        collectionId,
      });

      if (!collection)
        throw Error(`Oops! collection ${collectionId} not found!`);

      const jellyCollection = await jellyInstance.getJellyCollection(
        collection,
      );

      const { ok } = await jellyCollection.addToListing({
        tokenId: userOwnedTokenId,
        price: userListForPrice,
      });

      if (!ok) throw new Error('Oops! Failed to make listing');

      const transactionStepStatus = {
        approveWICPStatus: TransactionStatus.completed,
        listingStatus: TransactionStatus.completed,
      };
      dispatch(
        marketplaceActions.updateTransactionSteps(
          transactionStepStatus,
        ),
      );

      if (typeof onSuccess === 'function') onSuccess();

      return {
        id: userOwnedTokenId,
        amount: userListForPrice,
      };
    } catch (err: any) {
      AppLog.error(err);

      dispatch(notificationActions.setErrorMessage(err?.message));
      if (typeof onFailure === 'function') {
        onFailure(err);
      }
    }
  },
);

