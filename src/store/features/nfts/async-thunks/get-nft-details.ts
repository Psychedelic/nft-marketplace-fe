import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { jellyJsInstanceHandler } from '../../../../integrations/jelly-js';
import { marketplaceSlice } from '../../marketplace/marketplace-slice';
import { getJellyCollection } from '../../../../utils/jelly';
import { nftsActions } from '../nfts-slice';
import { KyasshuUrl } from '../../../../integrations/kyasshu';
import { createActor } from '../../../../integrations/actor';
import { notificationActions } from '../../notifications';
import { settingsActions } from '../../settings';
import { AppLog } from '../../../../utils/log';
import { isUnsupportedPage } from '../../../../utils/error';
import { parseTablePrincipal } from '../../../../utils/parser';

export type GetNFTDetailsProps = {
  id: string;
  collectionId: string;
};

export const getNFTDetails = createAsyncThunk<
  void,
  GetNFTDetailsProps
>('nfts/getNFTDetails', async ({ id, collectionId }, thunkAPI) => {
  const { dispatch } = thunkAPI;

  dispatch(nftsActions.setNFTDetailsLoading());

  const jellyInstance = await jellyJsInstanceHandler({
    thunkAPI,
    slice: marketplaceSlice,
  });

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

    const result = await jellyCollection.getNFTs({
      ids: [id],
    });

    const { ok } = result;

    if (!ok)
      throw Error(`Oops! Unable to fetch NFT details for id ${id}`);

    const nftData: any = result.data?.pop();

    const actor = await createActor({
      serviceName: 'dip721',
      collectionId,
    });

    const owner = await (async () => {
      const res = await actor.dip721_owner_of(BigInt(id));

      try {
        const responsePrincipal = res.Ok.pop();
        // eslint-disable-next-line no-underscore-dangle
        const principal = parseTablePrincipal(
          // eslint-disable-next-line no-underscore-dangle
          responsePrincipal._arr,
        );

        if (!principal) return;

        return principal.toString();
        // eslint-disable-next-line no-empty
      } catch (err) {}
    })();

    let fetchedTraits: any = {};

    // Fetch traits for collections other than ICNS
    if (
      nftData?.collectionName &&
      !nftData.collectionName.toLowerCase().includes('icns')
    ) {
      const response = await axios.get(
        KyasshuUrl.getNFTDetails({ id, collectionId }),
      );

      if (response.status === 200) {
        const responseData = response.data;

        responseData.metadata.properties.forEach((property: any) => {
          fetchedTraits[`${property.name}`] = {
            name: property.value,
            occurance: null,
            rarity: null,
          };
        });
      }
    } else {
      fetchedTraits = nftData?.traits;
    }

    const nftDetails = {
      // TODO: update price, lastOffer & traits values
      // TODO: Finalize object format after validating mock and kyasshu data
      id: nftData.id,
      name: nftData.collectionName,
      price: nftData?.price,
      lastOffer: nftData?.lastOffer,
      lastSale: nftData?.lastSale,
      preview: nftData?.thumbnail,
      location: nftData?.location,
      traits: fetchedTraits || nftData?.traits,
      status: nftData?.lastActionTaken,
      owner,
      lastActionTaken: nftData?.lastActionTaken,
      operator: nftData?.operator,
      listing: nftData?.listing,
      lastListingTime: nftData?.lastListingTime,
      offers: nftData?.offers,
      lastOfferTime: nftData?.lastOfferTime,
      lastSaleTime: nftData?.lastSaleTime,
      rendered: true,
    };

    // update store with loaded NFT details
    dispatch(nftsActions.setLoadedNFTDetails(nftDetails));
  } catch (error: any) {
    AppLog.error(error);

    if (isUnsupportedPage(error?.response)) {
      dispatch(settingsActions.setPageNotFoundStatus(true));

      return;
    }

    dispatch(
      notificationActions.setErrorMessage(
        'Oops! Unable to fetch NFT details',
      ),
    );
  }
});
