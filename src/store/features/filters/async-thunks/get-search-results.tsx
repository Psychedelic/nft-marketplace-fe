import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  KyasshuUrl,
  NSKyasshuUrl,
} from '../../../../integrations/kyasshu';
import { filterActions } from '..';
import { notificationActions } from '../../notifications';
import { AppLog } from '../../../../utils/log';
import { getICPPrice } from '../../../../integrations/marketplace/price.utils';
import {
  parseAmountToE8S,
  parseE8SAmountToWICP,
} from '../../../../utils/formatters';
import { SearchResultDataState } from '../filter-slice';

export type GetSearchResultsProps =
  NSKyasshuUrl.GetSearchQueryParams & {
    search: string;
    abortController: AbortController;
  };

export const getSearchResults = createAsyncThunk<
  SearchResultDataState[] | undefined,
  GetSearchResultsProps
>(
  'filters/getSearchResults',
  async (
    { search, sort, order, page, count, abortController },
    { dispatch },
  ) => {
    const payload = {
      search: search.length > 0 ? search : undefined,
    };

    try {
      let priceInUSD: number;
      const response = await axios.post(
        KyasshuUrl.getSearchResults({ sort, order, page, count }),
        payload,
        {
          signal: abortController.signal,
        },
      );

      const { data } = response.data;

      const icpPriceResponse = await getICPPrice();
      if (icpPriceResponse && icpPriceResponse.usd) {
        priceInUSD = icpPriceResponse.usd;
      }

      const searchResult = data.map((nft: any) => {
        const searchResultData = {
          id: nft.index,
          name: 'Cap Crowns',
          price:
            priceInUSD *
            Number(parseE8SAmountToWICP(nft.currentPrice)),
          wicpPrice: parseE8SAmountToWICP(nft.currentPrice),
          preview: nft.url.replace(
            /\/(\w+)\.\w+/g,
            '/thumbnails/$1.png',
          ),
        };

        return searchResultData;
      });

      return searchResult;
    } catch (error) {
      if ((error as any)?.message === 'canceled') return;

      AppLog.error(error);

      dispatch(
        notificationActions.setErrorMessage(
          'Oops! Unable to search for NFT',
        ),
      );
    }
  },
);

