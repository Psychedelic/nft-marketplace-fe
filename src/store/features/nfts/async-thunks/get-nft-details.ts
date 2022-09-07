import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { nftsActions } from '../nfts-slice';
import {
  KyasshuUrl,
  // NSKyasshuUrl,
} from '../../../../integrations/kyasshu';
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

  try {
    const actor = await createActor({
      // TODO: This should be a generic DIP-721 actor
      serviceName: 'crowns',
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

    const name = await (async () => {
      const res = await actor.dip721_name();

      if (!res && !Array.isArray(res) && !res.length) return;

      return res.pop();
    })();

    // TODO: Replace by get token listing
    // which already exist a thunk for
    // although src/components/nft-details/nft-details.tsx
    // triggers it would be wise to reduce to a single call
    const response = await axios.get(
      KyasshuUrl.getNFTDetails({ id, collectionId }),
    );

    if (response.status !== 200) {
      throw Error(response.statusText);
    }

    const responseData = response.data;

    const traits: any = {};

    responseData.metadata.properties.forEach((property: any) => {
      traits[`${property.name}`] = {
        name: property.value,
        occurance: null,
        rarity: null,
      };
    });

    const nftDetails = {
      // TODO: update price, lastOffer & traits values
      // TODO: Finalize object format after validating mock and kyasshu data
      id,
      name,
      price: responseData?.currentPrice,
      lastOffer: responseData?.lastOfferPrice,
      lastSale: responseData?.lastSalePrice,
      preview: responseData?.metadata?.thumbnail?.value?.TextContent,
      location: responseData?.url,
      rendered: true,
      traits,
      owner,
      operator: responseData?.operator,
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
