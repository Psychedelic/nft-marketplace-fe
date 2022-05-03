import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { nftsActions } from '../nfts-slice';
import { KyasshuUrl } from '../../../../integrations/kyasshu';
import { notificationActions } from '../../errors';

export type GetNFTDetailsProps = KyasshuUrl.GetNFTDetailsQueryParams;

export const getNFTDetails = createAsyncThunk<
  void,
  GetNFTDetailsProps
>('nfts/nfts', async ({ id }, { dispatch }) => {
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
    // eslint-disable-next-line no-console
    console.warn(error);
    dispatch(
      notificationActions.setErrorMessage((error as Error).message),
    );
  }
});
