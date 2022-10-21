import { createAsyncThunk } from '@reduxjs/toolkit';
import { jellyJsInstanceHandler } from '../../../../integrations/jelly-js';
import { createActor } from '../../../../integrations/actor';
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
    const { dispatch } = thunkAPI;

    dispatch(nftsActions.setNFTsTotalCount(0));
    // Checks if an actor instance exists already
    // otherwise creates a new instance
    const jellyInstance = await jellyJsInstanceHandler({
      thunkAPI,
      slice: marketplaceSlice,
    });

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

      const actor = await createActor({
        serviceName: 'dip721',
        collectionId,
      });

      const userNFTIds = await (async () => {
        const res = await actor.dip721_owner_token_identifiers(
          await getPrincipal(),
        );

        try {
          const responseNFTIds = res.Ok;

          if (!responseNFTIds) return [];

          const parsedResponse = responseNFTIds.map(
            (tokenId: BigInt) => tokenId.toString(),
          );

          return parsedResponse;
        } catch (err) {}
      })();

      if (!shouldFetchUserTokenIdsAlone) {
        const getUserNFTs = await jellyCollection.getNFTs({
          ids:
            (userNFTIds &&
              userNFTIds.length &&
              userNFTIds.length > 25 &&
              userNFTIds.slice(0, 25)) ||
            userNFTIds,
        });

        if (!getUserNFTs.ok) {
          throw Error(`Oops! Failed to get my NFTs`);
        }
        const { data = [] } = getUserNFTs;

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
          nextPage: 1,
          lastIndex: undefined,
        };

        // update store with loaded NFTS details
        dispatch(nftsActions.setLoadedNFTS(actionPayload));
        dispatch(nftsActions.setNFTsTotalCount(userNFTIds.length));
      }

      const myNFTIds = userNFTIds || [];

      // update store with loaded my NFT Ids
      dispatch(nftsActions.setMyNFTIds(myNFTIds));

      if (!myNFTIds) {
        AppLog.warn('Oops! Failed to get all NFTs via Jelly-js!');

        return [];
      }

      return myNFTIds;
    } catch (err) {
      AppLog.error(err);

      dispatch(nftsActions.setNFTsTotalCount(0));
      dispatch(nftsActions.setIsNFTSLoading(false));
    }
  },
);
