import { createAsyncThunk } from '@reduxjs/toolkit';
import { JellyCollection } from '@psychedelic/jelly-js';
import { jellyJsInstanceHandler } from '../../../../integrations/jelly-js';
import { nftsActions, LoadedNFTData } from '../nfts-slice';
import { marketplaceSlice } from '../../marketplace/marketplace-slice';
import { NSKyasshuUrl } from '../../../../integrations/kyasshu';
import { getJellyCollection } from '../../../../utils/jelly';
import { AppLog } from '../../../../utils/log';
import { getSortValue } from '../../../../utils/sorting';

export type GetAllNFTsProps = NSKyasshuUrl.GetNFTsQueryParams & {
  payload?: any;
  abortController?: AbortController;
};

export const getAllNFTs = createAsyncThunk<any | undefined, any>(
  'marketplace/getAllNFTs',
  async (
    {
      // TODO: map previous sorting fields to body jelly js fn args
      sort,
      reverse,
      // order,
      traits,
      // TODO: what's passed as page is the index
      // as such it should be refactored, renamed to avoid confusion
      lastIndex,
      count,
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
    const {
      nfts: { hasMoreNFTs },
    } = thunkAPI.getState() as any;

    // TODO: should move to the UI side to make this more reusable
    // and controlled from client use-case only
    // Prevent pagination
    if (typeof hasMoreNFTs !== 'undefined' && !hasMoreNFTs) return;

    // set loading NFTS state to true
    dispatch(nftsActions.setIsNFTSLoading(true));
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
        lastIndex,
        sortKey: getSortValue(sort),
        reverse,
        traits,
      });
      const { data, total, lastIndex: responseHasLastIndex } = res;

      const extractedNFTSList = data.map((nft: any) => {
        const metadata = {
          // TODO: Finalize object format after validating mock and kyasshu data
          id: nft.id,
          name: nft.collectionName,
          price: nft?.price,
          lastOffer: nft?.lastOffer,
          lastSale: nft.lastSale,
          preview: nft.thumbnail,
          location: nft?.location,
          traits: nft.traits,
          status: nft?.lastActionTaken,
          owner: nft?.owner,
          lastActionTaken: nft?.lastActionTaken,
          operator: nft?.operator,
          listing: nft?.listing,
          lastListingTime: nft?.lastListingTime,
          offers: nft?.offers,
          lastOfferTime: nft?.lastOfferTime,
          lastSaleTime: nft?.lastSaleTime,
          rendered: true,
        };
        return metadata;
      });

      const actionPayload: LoadedNFTData = {
        loadedNFTList: extractedNFTSList,
        total: Number(total),
      };

      if (responseHasLastIndex) {
        actionPayload.lastIndex = Number(responseHasLastIndex) - 1;
        actionPayload.nextPage =
          Math.floor(Number(total) / Number(responseHasLastIndex)) +
          1;
      }

      // update store with loaded NFTS details
      dispatch(nftsActions.setLoadedNFTS(actionPayload));

      const collectionPayload = {
        itemsCount: Number(total),
      };
      dispatch(nftsActions.setCollectionData(collectionPayload));

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
