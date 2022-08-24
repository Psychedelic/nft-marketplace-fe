import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { nftsActions } from '../nfts-slice';
import {
  KyasshuUrl,
  NSKyasshuUrl,
} from '../../../../integrations/kyasshu';
import { notificationActions } from '../../notifications';
import { settingsActions } from '../../settings';
import { AppLog } from '../../../../utils/log';
import { findLastAction } from '../../../../utils/nfts';
import { isEmptyObject } from '../../../../utils/common';
import { ResponseStatus } from '../../../../constants/response-status';
import { SortOptions } from '../../../../constants/sort-options';
import { isUnsupportedPage } from '../../../../utils/error';

export type GetNFTsProps = NSKyasshuUrl.GetNFTsQueryParams & {
  payload?: any;
  abortController?: AbortController;
};

export const getNFTs = createAsyncThunk<void, GetNFTsProps>(
  'nfts/getNFTs',
  async (
    {
      payload,
      sort,
      order,
      page,
      count,
      abortController,
      collectionId,
    },
    { dispatch },
  ) => {
    // set loading NFTS state to true
    dispatch(nftsActions.setIsNFTSLoading(true));

    if (!isEmptyObject(payload)) {
      dispatch(nftsActions.setCollectionDataLoading());
    }

    let axiosParams = {};

    if (abortController) {
      axiosParams = {
        signal: abortController.signal,
      };
    }

    let sortingDetails = {
      sortBy: sort,
      orderBy: order,
    };

    if (
      sort === SortOptions.PriceLowToHigh ||
      sort === SortOptions.PriceHighToLow
    ) {
      sortingDetails.sortBy = SortOptions.CurrentPrice;
    }

    if (sort === SortOptions.PriceLowToHigh) {
      sortingDetails.orderBy = 'a';
    }

    try {
      const response = await axios.post(
        KyasshuUrl.getNFTs({
          sort: sortingDetails.sortBy,
          order: sortingDetails.orderBy,
          page,
          count,
          collectionId,
        }),
        payload,
        axiosParams,
      );

      if (response.status !== 200) {
        throw Error(response.statusText);
      }

      const { data, pages, items } = response.data;

      const traits: any = {};

      data.map((item: any) => {
        item.metadata.properties.forEach((property: any) => {
          traits[`${property.name}`] = {
            name: property.value,
            occurance: null,
            rarity: null,
          };
        });
      });

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
          traits: traits,
          status: nft?.status,
          owner: nft?.owner,
          lastActionTaken: findLastAction(nft),
          operator: nft?.operator,
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
    } catch (error: any) {
      if (error?.message === ResponseStatus.Canceled) return;

      AppLog.error(error);

      if (isUnsupportedPage(error?.response)) {
        dispatch(settingsActions.setPageNotFoundStatus(true));

        return;
      }

      // set NFTS failed to load
      dispatch(
        notificationActions.setErrorMessage(
          'Oops! Unable to fetch NFTs',
        ),
      );
    }
  },
);
