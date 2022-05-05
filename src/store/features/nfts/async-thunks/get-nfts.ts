import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { nftsActions } from '../nfts-slice';
import { KyasshuUrl, NSKyasshuUrl } from '../../../../integrations/kyasshu';
import { notificationActions } from '../../errors';

export type GetNFTsProps = NSKyasshuUrl.GetNFTsQueryParams & {
  payload?: any;
};

export const getNFTs = createAsyncThunk<void, GetNFTsProps>(
  'nfts/getNFTs',
  async ({ payload, sort, order, page, count }, { dispatch }) => {
    // set loading NFTS state to true
    if (page === 0) {
      dispatch(nftsActions.setIsNFTSLoading(true));
    }

    try {
      const response = await axios.post(
        KyasshuUrl.getNFTs({ sort, order, page, count }),
        payload,
      );

      if (response.status !== 200) {
        throw Error(response.statusText);
      }

      const { data, pages, items } = response.data;

      // TODO: Define nft field types
      const extractedNFTSList = data.map((nft: any) => {
        const metadata = {
          // TODO: update price, lastOffer & traits values
          // TODO: Finalize object format after validating mock and kyasshu data
          id: nft.index,
          name: 'Cap Crowns',
          price: nft.currentPrice,
          lastOffer: nft.lastOfferPrice,
          lastSale: nft.lastSalePrice,
          // TODO: update nft thumbnail
          preview: nft.url.replace(
            /\/(\w+)\.\w+/g,
            '/thumbnails/$1.png',
          ),
          location: nft?.url,
          traits: {
            base: nft?.metadata?.base?.value?.TextContent,
            biggem: nft?.metadata?.biggem?.value?.TextContent,
            rim: nft?.metadata?.rim?.value?.TextContent,
            smallgem: nft?.metadata?.smallgem?.value?.TextContent,
          },
          status: nft?.status,
          owner: nft?.owner,
        };
        return metadata;
      });

      const actionPayload = {
        loadedNFTList: extractedNFTSList,
        totalPages: pages ? parseInt(pages, 10) : 0,
        total: items ? parseInt(items, 10) : 0,
        nextPage: page + 1,
      };

      // update store with loaded NFTS details
      dispatch(nftsActions.setLoadedNFTS(actionPayload));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(error);

      // set NFTS failed to load
      dispatch(
        notificationActions.setErrorMessage(
          'Oops! Unable to fetch NFTs',
        ),
      );
    }
  },
);
