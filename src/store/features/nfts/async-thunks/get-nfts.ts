import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { nftsActions } from '../nfts-slice';
import {
  KyasshuUrl,
  NSKyasshuUrl,
} from '../../../../integrations/kyasshu';
import { notificationActions } from '../../notifications';
import { AppLog } from '../../../../utils/log';
import { findLastAction } from '../../../../utils/nfts';
import { isEmptyObject } from '../../../../utils/common';

export type GetNFTsProps = NSKyasshuUrl.GetNFTsQueryParams & {
  payload?: any;
};

let cancelToken: any;

export const getNFTs = createAsyncThunk<void, GetNFTsProps>(
  'nfts/getNFTs',
  async ({ payload, sort, order, page, count }, { dispatch }) => {
    //Check if there are any previous pending requests
    if (typeof cancelToken != typeof undefined) {
      cancelToken.cancel('Operation canceled due to new request.');
    }

    //Save the cancel token for the current request
    cancelToken = axios.CancelToken.source();

    // set loading NFTS state to true
    if (page === 0) {
      dispatch(nftsActions.setIsNFTSLoading(true));
    }

    if (!isEmptyObject(payload)) {
      dispatch(nftsActions.setCollectionDataLoading());
    }

    try {
      const response = await axios.post(
        KyasshuUrl.getNFTs({ sort, order, page, count }),
        payload,
        { cancelToken: cancelToken.token }, //Pass the cancel token to the current request
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
            base: {
              name: nft?.metadata?.base?.value?.TextContent,
              occurance: null,
              rarity: null,
            },
            biggem: {
              name: nft?.metadata?.biggem?.value?.TextContent,
              occurance: null,
              rarity: null,
            },
            rim: {
              name: nft?.metadata?.rim?.value?.TextContent,
              occurance: null,
              rarity: null,
            },
            smallgem: {
              name: nft?.metadata?.smallgem?.value?.TextContent,
              occurance: null,
              rarity: null,
            },
          },
          status: nft?.status,
          owner: nft?.owner,
          lastActionTaken: findLastAction(nft),
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

      if (!isEmptyObject(payload)) {
        const collectionPayload = {
          itemsCount: items ? parseInt(items, 10) : 0,
          ownersCount: 0,
          price: 0,
          totalVolume: 0,
        };

        dispatch(nftsActions.setCollectionData(collectionPayload));
      }
    } catch (error) {
      AppLog.error(error);

      // set NFTS failed to load
      dispatch(
        notificationActions.setErrorMessage(
          'Oops! Unable to fetch NFTs',
        ),
      );
    }
  },
);
