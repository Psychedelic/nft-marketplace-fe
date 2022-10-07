import { createAsyncThunk } from '@reduxjs/toolkit';
import { jellyJsInstanceHandler } from '../../../../integrations/jelly-js';
import { nftsActions } from '../nfts-slice';
import { marketplaceSlice } from '../../marketplace/marketplace-slice';
import { getJellyCollection } from '../../../../utils/jelly';
import { AppLog } from '../../../../utils/log';
import { getPrincipal } from '../../../../integrations/plug';

export const getMyNFTs = createAsyncThunk<any | undefined, any>(
  'marketplace/getMyNFTs',
  async (
    { collectionId, shouldFetchUserTokenIdsAlone },
    thunkAPI,
  ) => {
    // Checks if an actor instance exists already
    // otherwise creates a new instance
    const jellyInstance = await jellyJsInstanceHandler({
      thunkAPI,
      slice: marketplaceSlice,
    });

    const { dispatch } = thunkAPI;

    if (!shouldFetchUserTokenIdsAlone) {
      // set loading NFTS state to true
      dispatch(nftsActions.setIsNFTSLoading(true));
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

      const res = await jellyCollection.getUserNFTs({
        owner: await getPrincipal(),
      });
      if (!res.ok) {
        throw Error(`Oops! Failed to get my NFTs`);
      }
      const { data = [] } = res;

      // TODO: map nft list
      const extractedNFTSList = data.map((nft: any) => {
        const metadata = {
          id: nft.id,
          name: nft.collectionName,
          price: nft?.price,
          lastOffer: nft?.lastOffer,
          lastSale: nft?.lastSale,
          preview: nft?.thumbnail,
          location: nft?.location,
          traits: nft?.traits,
          status: nft?.lastActionTaken,
          owner: nft?.owner,
          operator: nft?.operator,
          rendered: true,
        };
        return metadata;
      });

      const actionPayload = {
        loadedNFTList: extractedNFTSList,
        totalPages: 1,
        total: data.length,
        nextPage: undefined,
        lastIndex: undefined,
      };

      if (!shouldFetchUserTokenIdsAlone) {
        // update store with loaded NFTS details
        dispatch(nftsActions.setLoadedNFTS(actionPayload));
      }

      const myNFTIds = extractedNFTSList.map((nft: any) => nft.id);

      // update store with loaded my NFT Ids
      dispatch(nftsActions.setMyNFTIds(myNFTIds));

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
