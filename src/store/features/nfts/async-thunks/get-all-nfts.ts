import { createAsyncThunk } from '@reduxjs/toolkit';
import { jellyJsInstanceHandler } from '../../../../integrations/jelly-js';
import { nftsActions, LoadedNFTData } from '../nfts-slice';
import { marketplaceSlice } from '../../marketplace/marketplace-slice';
import { NSKyasshuUrl } from '../../../../integrations/kyasshu';
import { createActor } from '../../../../integrations/actor';
import { isEmptyObject } from '../../../../utils/common';
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
      payload,
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

    if (!isEmptyObject(payload)) {
      dispatch(nftsActions.setCollectionDataLoading());
    }

    try {
      const collection = await getJellyCollection({
        jellyInstance,
        collectionId,
      });

      if (!collection)
        throw Error(`Oops! collection ${collectionId} not found!`);

      const jellyCollection = await jellyInstance.getJellyCollection(
        collection,
      );

      const res = await jellyCollection.getAllNFTs({
        count: BigInt(count),
        lastIndex,
        sortKey: getSortValue(sort),
        reverse,
        traits,
      });

      const { data, total, lastIndex: responseLastIndex } = res;

      const collectionName = await (async () => {
        const actor = await createActor({
          serviceName: 'dip721',
          collectionId,
        });

        // eslint-disable-next-line @typescript-eslint/no-shadow
        const res = await actor.dip721_name();

        if (!res && !Array.isArray(res) && !res.length) return;

        return res.pop();
      })();

      // TODO: map nft list
      const extractedNFTSList = data.map((nft: any) => {
        const metadata = {
          // TODO: update price, lastOffer & traits values
          // TODO: Finalize object format after validating mock and kyasshu data
          id: nft.id,
          name: collectionName,
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

      const actionPayload: LoadedNFTData = {
        loadedNFTList: extractedNFTSList,
        total,
      };

      if (responseLastIndex) {
        actionPayload.lastIndex = Number(responseLastIndex) - 1;
        actionPayload.nextPage =
          Math.floor(Number(total) / Number(responseLastIndex)) + 1;
      }

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
