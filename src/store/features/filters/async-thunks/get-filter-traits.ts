import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  KyasshuUrl,
  NSKyasshuUrl,
} from '../../../../integrations/kyasshu';
import { FilterConstants } from '../../../../constants';
import { filterActions } from '..';
import { notificationActions } from '../../errors';
import { AppLog } from '../../../../utils/log';

export type GetFilterTraitsProps =
  | NSKyasshuUrl.GetFilterTraitsQueryParams
  | undefined;

export type TraitsValuesProps = {
  value: string,
  occurance: number,
  rarity: number
}

export const getFilterTraits = createAsyncThunk<
  void,
  GetFilterTraitsProps
>('filters/getFilterTraits', async (_, { dispatch }) => {
  dispatch(filterActions.setIsFilterTraitsLoading(true));

  try {
    const response = await axios.get(KyasshuUrl.getFilterTraits());
    if (response.status !== 200) {
      throw Error(response.statusText);
    }

    const responseData = response.data.traits.map((res: [string, TraitsValuesProps[]]) => {
      let key;
      switch (res[0]) {
        case 'smallgem':
          key = FilterConstants.smallGem;
          break;
        case 'biggem':
          key = FilterConstants.bigGem;
          break;
        case 'base':
          key = FilterConstants.base;
          break;
        case 'rim':
          key = FilterConstants.rim;
          break;
        default:
      }

      const data = {
        key,
        name: res[0],
        values: [...res[1]],
      };

      return data;
    });

    dispatch(filterActions.getAllFilters(responseData));
    dispatch(filterActions.setIsFilterTraitsLoading(false));
  } catch (error) {
    AppLog.error(error);
    dispatch(
      notificationActions.setErrorMessage(
        'Oops! Unable to fetch traits',
      ),
    );
  }
});
