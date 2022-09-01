import { createAsyncThunk } from '@reduxjs/toolkit';
import { Collection } from '@psychedelic/jelly-js';
import { jellyJsInstanceHandler } from '../../../../integrations/jelly-js';
import { nftsActions } from '../nfts-slice';
import { marketplaceSlice } from '../../marketplace/marketplace-slice';
import { NSKyasshuUrl } from '../../../../integrations/kyasshu';
import { isEmptyObject } from '../../../../utils/common';
import { AppLog } from '../../../../utils/log';

export type GetAllNFTsProps = NSKyasshuUrl.GetNFTsQueryParams & {
  payload?: any;
  abortController?: AbortController;
};

export const getAllNFTs = createAsyncThunk<any | undefined, any>(
  'marketplace/getAllNFTs',
  async (
    {
      payload,
      // TODO: map previous sorting fields to body jelly js fn args
      // sort,
      // order,
      // page,
      // count,
      collectionId,
    },
    thunkAPI,
  ) => {
    // Checks if an actor instance exists already
    // otherwise creates a new instance
    const jellyInstance = await jellyJsInstanceHandler({
      thunkAPI,
      collectionId,
      slice: marketplaceSlice,
    });

    const { dispatch } = thunkAPI;

    // set loading NFTS state to true
    dispatch(nftsActions.setIsNFTSLoading(true));

    if (!isEmptyObject(payload)) {
      dispatch(nftsActions.setCollectionDataLoading());
    }

    try {
      // TODO: populate the getAllNFTs arguments
      // const lastIndex = null;
      // const traits = [] as any;
      // const sortKey = 'all';
      // const reverse = false;
      // const count = BigInt(20);

      const collections: Collection[] =
        await jellyInstance.getCollections();
      const collection = collections.find(
        (c: Collection) => c.id.toText() === collectionId,
      );

      if (!collection)
        throw Error(`Oops! collection ${collectionId} not found!`);

      const jellyCollection = await jellyInstance.getJellyCollection(
        collection,
      );
      const { data } = await jellyCollection.getAllNFTs();

      console.log('[debug] marketplace/getAllNFTs -> data ->', data);

      if (!data) {
        AppLog.warn('Oops! Failed to get all NFTs via Jelly-js!');

        return [];
      }

      return data;
    } catch (err) {
      AppLog.error(err);
    }
  },
);

