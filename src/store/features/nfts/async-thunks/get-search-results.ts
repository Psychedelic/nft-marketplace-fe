import { createAsyncThunk } from '@reduxjs/toolkit';
import { JellyCollection } from '@psychedelic/jelly-js';
import { jellyJsInstanceHandler } from '../../../../integrations/jelly-js';
import { nftsActions } from '../nfts-slice';
import { marketplaceSlice } from '../../marketplace/marketplace-slice';
import { createActor } from '../../../../integrations/actor';
import { getJellyCollection } from '../../../../utils/jelly';
import { AppLog } from '../../../../utils/log';
import { filterActions } from '../../filters';
import { parseE8SAmountToWICP } from '../../../../utils/formatters';

export const getSearchResults = createAsyncThunk<
  any | undefined,
  any
>(
  'marketplace/getSearchResults',
  async ({ count, collectionId, search }, thunkAPI) => {
    // Checks if an actor instance exists already
    // otherwise creates a new instance

    const jellyInstance = await jellyJsInstanceHandler({
      thunkAPI,
      collectionId,
      slice: marketplaceSlice,
    });

    const { dispatch } = thunkAPI;

    // set loading NFTS state to true
    dispatch(filterActions.setLoadingSearch(true));

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
        search,
      });

      const { data } = res;

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

      const extractedNFTSList = data.map((nft: any) => {
        const metadata = {
          id: nft.id,
          name: collectionName,
          price: nft.listing?.price,
          wicpPrice: parseE8SAmountToWICP(nft.listing?.price),
          preview: nft.thumbnail,
          location: nft?.url,
          owner: nft?.owner,
          canister: nft?.canister,
        };
        return metadata;
      });

      dispatch(filterActions.setSearchResults(extractedNFTSList));
      dispatch(filterActions.setLoadingSearch(false));

      if (!data) {
        AppLog.warn(
          'Oops! Failed to get all search results via Jelly-js!',
        );

        return [];
      }

      return data;
    } catch (err) {
      AppLog.error(err);
    }
  },
);