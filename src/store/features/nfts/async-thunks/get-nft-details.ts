import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { nftsActions } from '../nfts-slice';
import {
  KyasshuUrl,
  NSKyasshuUrl,
} from '../../../../integrations/kyasshu';
import { notificationActions } from '../../notifications';
import { AppLog } from '../../../../utils/log';

export type GetNFTDetailsProps =
  NSKyasshuUrl.GetNFTDetailsQueryParams;

export const getNFTDetails = createAsyncThunk<
  void,
  GetNFTDetailsProps
>('nfts/getNFTDetails', async ({ id }, { dispatch }) => {
  try {
    const response = await axios.get(
      KyasshuUrl.getNFTDetails({ id }),
    );

    if (response.status !== 200) {
      throw Error(response.statusText);
    }

    const responseData = response.data;

    const nftDetails = {
      // TODO: update price, lastOffer & traits values
      // TODO: Finalize object format after validating mock and kyasshu data
      id: responseData.index,
      name: 'Cap Crowns',
      price: responseData?.currentPrice,
      lastOffer: responseData?.lastOfferPrice,
      lastSale: responseData?.lastSalePrice,
      preview: responseData?.metadata?.thumbnail?.value?.TextContent,
      location: responseData?.url,
      rendered: true,
      traits: {
        base: {
          name: responseData?.metadata?.base?.value?.TextContent,
          occurance: null,
          rarity: null,
        },
        biggem: {
          name: responseData?.metadata?.biggem?.value?.TextContent,
          occurance: null,
          rarity: null,
        },
        rim: {
          name: responseData?.metadata?.rim?.value?.TextContent,
          occurance: null,
          rarity: null,
        },
        smallgem: {
          name: responseData?.metadata?.smallgem?.value?.TextContent,
          occurance: null,
          rarity: null,
        },
      },
      owner: responseData?.owner,
      operator: responseData?.operator,
    };

    // TODO: If user connected to plug
    // Should verify the owner of current token id
    // e.g. if opted to verify on-chain the method is "ownerOf"
    // Should verify whether token is listed or not only if owner
    (nftDetails as any).isListed = false;

    // update store with loaded NFT details
    dispatch(nftsActions.setLoadedNFTDetails(nftDetails));
  } catch (error) {
    AppLog.error(error);
    dispatch(
      notificationActions.setErrorMessage(
        'Oops! Unable to fetch NFT details',
      ),
    );
  }
});
