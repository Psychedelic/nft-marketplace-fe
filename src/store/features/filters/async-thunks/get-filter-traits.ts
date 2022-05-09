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

export const getFilterTraits = createAsyncThunk<
  void,
  GetFilterTraitsProps
>('filters/getFilterTraits', async (_, { dispatch }) => {
  try {
    const response = await axios.get(KyasshuUrl.getFilterTraits());
    if (response.status !== 200) {
      throw Error(response.statusText);
    }

    console.log(response.data.traits);

    const responseData = response.data.traits.map((res: any) => {
      console.log(res[1]);
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

    console.log(responseData);

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
