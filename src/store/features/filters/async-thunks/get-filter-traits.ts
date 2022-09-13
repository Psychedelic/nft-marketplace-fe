import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  NSKyasshuUrl,
} from '../../../../integrations/kyasshu';
import { FilterConstants } from '../../../../constants';
import { filterActions, FilterTraitsList } from '..';
import { notificationActions } from '../../notifications';
import { settingsActions } from '../../settings';
import { AppLog } from '../../../../utils/log';
import { NFTMetadata } from '../../../../declarations/legacy';
import { isUnsupportedPage } from '../../../../utils/error';
import { jellyJsInstanceHandler } from '../../../../integrations/jelly-js';
import { marketplaceSlice } from '../../marketplace';
import { getJellyCollection } from '../../../../utils/jelly';

export type GetFilterTraitsProps =
  NSKyasshuUrl.GetFilterTraitsQueryParams;

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

export const modifyTraitKey = (key: string) => {
  let result = '';
  Array.from(key).forEach((char, index) => {
    if (index === 0) {
      result += char.toUpperCase();
    } else if (char === char.toUpperCase()) {
      result += ` ${char.toUpperCase()}`;
    } else {
      result += char;
    }
  });

  return result;
};

export const getTraitName = (key: string) => {
  switch (key) {
    case 'smallgem':
      return FilterConstants.smallGem;
    case 'biggem':
      return FilterConstants.bigGem;
    case 'base':
      return FilterConstants.base;
    case 'rim':
      return FilterConstants.rim;
    default:
      return modifyTraitKey(key);
  }
};

export const getFilterTraits = createAsyncThunk<
  void,
  GetFilterTraitsProps
>('filters/getFilterTraits', async ({ collectionId }, thunkAPI) => {
  const jellyInstance = await jellyJsInstanceHandler({
    thunkAPI,
    collectionId,
    slice: marketplaceSlice,
  });

  const { dispatch } = thunkAPI;

  dispatch(filterActions.setIsFilterTraitsLoading(true));

  try {
    const collection = await getJellyCollection({
      jellyInstance,
      collectionId,
    });

    if (!collection)
      throw Error(`Oops! collection ${collectionId} not found!`);

    const jellyCollection = await jellyInstance.getJellyCollection(
      collection,
    );

    const traits = await jellyCollection.getTraits();

    const responseData = traits.map((res: any) => {
      let key = getTraitName(res.trait);

      const data = {
        key: key,
        name: res.trait,
        values: res.values,
      };

      return data;
    });

    dispatch(filterActions.getAllFilters(responseData));
    dispatch(filterActions.setIsFilterTraitsLoading(false));
    dispatch(filterActions.setIsAlreadyFetched(true));
  } catch (error: any) {
    AppLog.error(error);

    if (isUnsupportedPage(error?.response)) {
      dispatch(settingsActions.setPageNotFoundStatus(true));

      return;
    }

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
            .map((traitData: FilterTraitsList) => traitData.values)[0]
            .filter(
              (traitDataValues: TraitsValuesProps) =>
                traitDataValues?.value === nftName,
            )[0];
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
    AppLog.error(error);
    dispatch(
      notificationActions.setErrorMessage(
        'Oops! Failed to get trait data',
      ),
    );
  }
};
