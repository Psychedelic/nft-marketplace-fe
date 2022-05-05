import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { nftsActions } from '../nfts-slice';
import {
  KyasshuUrl,
  NSKyasshuUrl,
} from '../../../../integrations/kyasshu';
import { notificationActions } from '../../errors';
import { AppLog } from '../../../../utils/log';
import { parseE8SAmountToWICP } from '../../../../utils/formatters';

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
      price:
        responseData?.currentPrice &&
        parseE8SAmountToWICP(
          BigInt(responseData.currentPrice),
        ).toString(),
      lastOffer:
        responseData?.lastOfferPrice &&
        parseE8SAmountToWICP(
          BigInt(responseData.lastOfferPrice),
        ).toString(),
      lastSale:
        responseData?.lastSalePrice &&
        parseE8SAmountToWICP(
          BigInt(responseData.lastSalePrice),
        ).toString(),
      preview: responseData?.metadata?.thumbnail?.value?.TextContent,
      location: responseData?.url,
      rendered: true,
      traits: {
        base: responseData?.metadata?.base?.value?.TextContent,
        biggem: responseData?.metadata?.biggem?.value?.TextContent,
        rim: responseData?.metadata?.rim?.value?.TextContent,
        smallgem:
          responseData?.metadata?.smallgem?.value?.TextContent,
      },
      owner: responseData?.owner,
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
