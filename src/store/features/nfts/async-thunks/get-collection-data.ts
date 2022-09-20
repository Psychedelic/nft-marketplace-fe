import { createAsyncThunk } from '@reduxjs/toolkit';
import { nftsActions } from '../nfts-slice';
import { NSKyasshuUrl } from '../../../../integrations/kyasshu';
import { notificationActions } from '../../notifications';
import { settingsActions } from '../../settings';
import { AppLog } from '../../../../utils/log';
import { marketplaceSlice } from '../../marketplace/marketplace-slice';
import { isUnsupportedPage } from '../../../../utils/error';
import { jellyJsInstanceHandler } from '../../../../integrations/jelly-js';
import { getJellyCollection } from '../../../../utils/jelly';

export const getCollectionData = createAsyncThunk<
  void,
  NSKyasshuUrl.GetCollectionDataQueryParams
>('nfts/getCollectionData', async ({ collectionId }, thunkAPI) => {
  const { dispatch } = thunkAPI;
  dispatch(nftsActions.setCollectionDataLoading());

  const jellyInstance = await jellyJsInstanceHandler({
    thunkAPI,
    collectionId,
    slice: marketplaceSlice,
  });

  try {
    const collection = await getJellyCollection({
      jellyInstance,
      collectionId,
    });

    if (!collection)
      throw Error(`Oops! collection ${collectionId} not found!`);

    const response = await jellyInstance.getCollections();
    const responseData = response.find(
      (collectionData) => collectionData.id.toText() === collectionId,
    );
    if (!responseData)
      throw new Error(`Oops! collection ${collectionId} not found!`);

    const jellyCollection = await jellyInstance.getJellyCollection(
      collection,
    );

    const uniqueOwners = await jellyCollection.getUniqueNFTOwners();

    const actionPayload = {
      ownersCount: Number(uniqueOwners),
      price: Number(responseData.fungibleFloor),
      totalVolume: Number(responseData.fungibleVolume),
    };
    dispatch(nftsActions.setCollectionData(actionPayload));
  } catch (error: any) {
    AppLog.error(error);

    if (isUnsupportedPage(error?.response)) {
      dispatch(settingsActions.setPageNotFoundStatus(true));

      return;
    }

    dispatch(
      notificationActions.setErrorMessage(
        'Oops! Unable to fetch collection data',
      ),
    );
  }
});

