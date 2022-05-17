import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  KyasshuUrl,
  NSKyasshuUrl,
} from '../../../../integrations/kyasshu';
import { filterActions } from '..';
import { notificationActions } from '../../notifications';
import { AppLog } from '../../../../utils/log';

export type GetSearchResultsProps =
  NSKyasshuUrl.GetSearchQueryParams & {
    search: string;
  };

export const getSearchResults = createAsyncThunk<
  void,
  GetSearchResultsProps
>(
  'filters/getSearchResults',
  async ({ search, sort, order, page, count }, { dispatch }) => {
    const payload = {
      search: search.length > 0 ? search : undefined,
    };

    try {
      const response = await axios.post(
        KyasshuUrl.getSearchResults({ sort, order, page, count }),
        payload,
      );

      const { data } = response.data;

      const searchResult = data.map((nft: any) => {
        const searchResultData = {
          id: nft.index,
          name: 'Cap Crowns',
          price: nft.currentPrice,
          preview: nft.url.replace(
            /\/(\w+)\.\w+/g,
            '/thumbnails/$1.png',
          ),
        };

        return searchResultData;
      });

      if (!data.length) dispatch(filterActions.setSearchResults([]));
      dispatch(filterActions.setSearchResults(searchResult));
    } catch (error) {
      AppLog.error(error);

      dispatch(
        notificationActions.setErrorMessage(
          'Oops! Unable to search for NFT',
        ),
      );
    }
  },
);
