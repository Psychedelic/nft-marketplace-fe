import { createAsyncThunk } from '@reduxjs/toolkit';
import { JellyCollection, SortKey } from '@psychedelic/jelly-js';
import { jellyJsInstanceHandler } from '../../../../integrations/jelly-js';
import { nftsActions } from '../nfts-slice';
import { marketplaceSlice } from '../../marketplace/marketplace-slice';
import { NSKyasshuUrl } from '../../../../integrations/kyasshu';
import { getJellyCollection } from '../../../../utils/jelly';
import { AppLog } from '../../../../utils/log';
import { settingsActions } from '../../settings';

export type GetLatestActiveTokenProps =
  NSKyasshuUrl.GetNFTsQueryParams & {
    payload?: any;
    abortController?: AbortController;
  };

export const getLatestActiveToken = createAsyncThunk<
  any | undefined,
  any
>(
  'marketplace/getLatestActiveToken',
  async ({ count, collectionId }, thunkAPI) => {
    // Checks if an actor instance exists already
    // otherwise creates a new instance
    const jellyInstance = await jellyJsInstanceHandler({
      thunkAPI,
      collectionId,
      slice: marketplaceSlice,
    });

    const { dispatch } = thunkAPI;

    dispatch(nftsActions.setCollectionDataLoading());

    try {
      const collection = await getJellyCollection({
        jellyInstance,
        collectionId,
      });

      if (!collection)
        throw Error(`Oops! collection ${collectionId} not found!`);

      const jellyCollection: JellyCollection =
        await jellyInstance.getJellyCollection(collection);

      const res = await jellyCollection.getAllNFTs({
        count: BigInt(count),
        sortKey: SortKey.all,
      });

      const { data } = res;

      const extractedNFTSList = data.map((nft: any) => {
        const metadata = {
          id: nft.id,
          name: nft.collectionName,
          price: nft.listing?.price,
          lastOffer: nft.lastOfferTime,
          lastSale: nft.lastSale,
          listing: nft.listing,
          lastListingTime: nft.lastListingTime,
          offers: nft.offers,
          lastOfferTime: nft.lastOfferTime,
          lastSaleTime: nft.lastSaleTime,
        };
        return metadata;
      });

      dispatch(
        settingsActions.setLatestActiveToken(extractedNFTSList),
      );

      if (!data) {
        AppLog.warn(
          'Oops! Failed to get last active token via Jelly-js!',
        );

        return [];
      }

      return data;
    } catch (err) {
      AppLog.error(err);
    }
  },
);
