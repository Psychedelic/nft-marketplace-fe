import { createAsyncThunk } from '@reduxjs/toolkit';
import { JellyCollection } from '@psychedelic/jelly-js';
import { jellyJsInstanceHandler } from '../../../../integrations/jelly-js';
import { marketplaceSlice } from '../../marketplace/marketplace-slice';
import { getJellyCollection } from '../../../../utils/jelly';
import { AppLog } from '../../../../utils/log';
import { filterActions } from '../../filters';
import { parseE8SAmountToWICP } from '../../../../utils/formatters';
import { formatICNSName } from '../../../../utils/icns';
import config from '../../../../config/env';
import { getICPPrice } from '../../../../integrations/marketplace/price.utils';

export const getSearchResults = createAsyncThunk<
  any | undefined,
  any
>(
  'marketplace/getSearchResults',
  async ({ count, collectionId, search, traits }, thunkAPI) => {
    // Checks if an actor instance exists already
    // otherwise creates a new instance

    const jellyInstance = await jellyJsInstanceHandler({
      thunkAPI,
      slice: marketplaceSlice,
    });

    const { dispatch } = thunkAPI;

    // set loading NFTS state to true
    dispatch(filterActions.setLoadingSearch(true));

    try {
      let currencyMarketPrice: number;
      const collection = await getJellyCollection({
        jellyInstance,
        collectionId: collectionId || config.icnsCollectionId,
      });

      if (!collection)
        throw Error(`Oops! collection ${collectionId} not found!`);

      const jellyCollection: JellyCollection =
        await jellyInstance.getJellyCollection(collection);

      const res = await jellyCollection.getAllNFTs({
        count: BigInt(count),
        search,
        traits,
      });

      const { data } = res;

      // Fetch ICP Price
      const icpPriceResponse = await getICPPrice();
      if (icpPriceResponse && icpPriceResponse.usd) {
        currencyMarketPrice = icpPriceResponse.usd;
      }

      const extractedNFTSList = data.map((nft: any) => {
        const metadata = {
          id: nft.id,
          name: nft.collectionName,
          price:
            nft.listing?.price &&
            (
              currencyMarketPrice *
              Number(parseE8SAmountToWICP(nft.listing?.price))
            ).toString(),
          wicpPrice: parseE8SAmountToWICP(nft.listing?.price),
          preview: nft.thumbnail,
          location: nft?.url,
          owner: nft?.owner,
          canister: nft?.canister,
          traitName: nft?.traits.name,
          traitThumbnailName: formatICNSName(nft?.traits.name),
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
