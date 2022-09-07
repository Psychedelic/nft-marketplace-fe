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
      page,
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

    // set loading NFTS state to true
    dispatch(nftsActions.setIsNFTSLoading(true));

    if (!isEmptyObject(payload)) {
      dispatch(nftsActions.setCollectionDataLoading());
    }

    try {
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

      const lastIndex = page && BigInt(page);
      const res = await jellyCollection.getAllNFTs({
        count: BigInt(count),
        lastIndex,
      });

      const { data, total, lastIndex: responseLastIndex } = res;

      // TODO: map nft list
      const extractedNFTSList = data.map((nft: any) => {
        const metadata = {
          // TODO: update price, lastOffer & traits values
          // TODO: Finalize object format after validating mock and kyasshu data
          id: nft.id,
          name: nft.collectionName,
          // TODO: parse from listing field when available
          price: undefined,
          lastOffer: nft.lastOfferTime,
          lastSale: nft.lastSale,
          // TODO: update nft thumbnail
          preview: nft.thumbnail,
          location: nft?.url,
          traits: nft.traits,
          status: nft?.status,
          owner: nft?.owner,
          // lastActionTaken: findLastAction(nft),
          operator: nft?.operator,
        };
        return metadata;
      });

      const actionPayload = {
        loadedNFTList: extractedNFTSList,
        totalPages: Math.ceil(Number(total) / count),
        total,
        nextPage:
          Math.floor(Number(total) / Number(responseLastIndex)) + 1,
        lastIndex: responseLastIndex,
      };

      // update store with loaded NFTS details
      dispatch(nftsActions.setLoadedNFTS(actionPayload));

      if (!isEmptyObject(payload)) {
        const collectionPayload = {
          itemsCount: total,
          ownersCount: 0,
          price: 0,
          totalVolume: 0,
        };

        dispatch(nftsActions.setCollectionData(collectionPayload));
      }

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
