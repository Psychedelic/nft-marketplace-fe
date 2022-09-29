import { createAsyncThunk } from '@reduxjs/toolkit';
import { actorInstanceHandler } from '../../../../integrations/actor';
import { marketplaceSlice } from '../marketplace-slice';
import { notificationActions } from '../../notifications';
import { AppLog } from '../../../../utils/log';
import { parseGetCollectionsResponse } from '../../../../utils/parser';

export type GetCollectionsProps = DefaultCallbacks;

export const getCollections = createAsyncThunk<
  any | undefined,
  GetCollectionsProps
>('marketplace/getCollections', async (params, thunkAPI) => {
  // Checks if an actor instance exists already
  // otherwise creates a new instance
  const actorInstance = await actorInstanceHandler({
    thunkAPI,
    serviceName: 'marketplace',
    slice: marketplaceSlice,
  });

  const { collectionId, onSuccess, onFailure } = params;

  try {
    const collectionsResponse = await actorInstance.getCollections();

    const parsedCollections =
      !Array.isArray(collectionsResponse) ||
      !collectionsResponse.length
        ? []
        : parseGetCollectionsResponse(collectionsResponse);

    if (typeof onSuccess === 'function') {
      onSuccess(parsedCollections);
    }

    return parsedCollections;
  } catch (err) {
    AppLog.error(err);
    thunkAPI.dispatch(
      notificationActions.setErrorMessage(
        `Oops! Failed to get collection details`,
      ),
    );
    if (typeof onFailure === 'function') {
      onFailure(err);
    }
  }
});

