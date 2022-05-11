import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  KyasshuUrl,
  NSKyasshuUrl,
} from '../../../../integrations/kyasshu';
import { FilterConstants } from '../../../../constants';
import { filterActions, FilterTraitsList } from '..';
import { notificationActions } from '../../errors';
import { AppLog } from '../../../../utils/log';
import { NFTMetadata } from '../../../../declarations/legacy';

export type GetFilterTraitsProps =
  | NSKyasshuUrl.GetFilterTraitsQueryParams
  | undefined;

export type TraitsValuesProps = {
  value: string;
  occurance: number;
  rarity: number;
};

export type ExtractTraitDataProps = {
  dispatch: any;
  details: NFTMetadata;
  loadedFiltersList: FilterTraitsList[];
};

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

    const responseData = response.data.traits.map(
      (res: [string, TraitsValuesProps[]]) => {
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
      },
    );

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

export const extractTraitData = ({
  dispatch,
  details,
  loadedFiltersList,
}: ExtractTraitDataProps) => {
  try {
    const extractedTraitData: any = loadedFiltersList[0];
    let nftDetails = { ...details };

    if (nftDetails?.traits) {
      const traitNames = Object.keys(nftDetails.traits);
      traitNames?.forEach((traitName: string) => {
        const nftName = nftDetails.traits[`${traitName}`]?.name;
        const extractedTraitDataValue: TraitsValuesProps =
          extractedTraitData
            ?.filter(
              (traitData: FilterTraitsList) =>
                traitData.name === traitName,
            )
            .map((traitData: FilterTraitsList) => {
              return traitData.values;
            })[0]
            .filter((traitDataValues: TraitsValuesProps) => {
              return traitDataValues?.value === nftName;
            })[0];
        nftDetails = {
          ...nftDetails,
          traits: {
            ...nftDetails.traits,
            [`${traitName}`]: {
              name: nftName,
              occurance: extractedTraitDataValue?.occurance,
              rarity: extractedTraitDataValue?.rarity,
            },
          },
        };
      });
    }

    return nftDetails;
  } catch (error) {
    console.log(error);
    dispatch(
      notificationActions.setErrorMessage(
        'Oops! Failed to get trait data',
      ),
    );
  }
};
