import { Principal } from '@dfinity/principal';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { actorInstanceHandler } from '../../../../integrations/actor';
import { marketplaceSlice } from '../marketplace-slice';
import config from '../../../../config/env';
import { notificationActions } from '../../errors';
import { AppLog } from '../../../../utils/log';
import { parseE8SAmountToWICP } from '../../../../utils/formatters';

export type GetFloorPriceProps = DefaultCallbacks;

export const getFloorPrice = createAsyncThunk<
  any | undefined,
  GetFloorPriceProps
>('marketplace/getFloor', async (params, thunkAPI) => {
  // Checks if an actor instance exists already
  // otherwise creates a new instance
  const actorInstance = await actorInstanceHandler({
    thunkAPI,
    serviceName: 'marketplace',
    slice: marketplaceSlice,
  });

  const { onSuccess, onFailure } = params;

  try {
    let floorPriceinWICP;
    const nonFungibleContractAddress = Principal.fromText(
      config.crownsCanisterId,
    );

    const floorResponse = await actorInstance.getFloor(
      nonFungibleContractAddress,
    );
    if ('Ok' in floorResponse) {
      const floorPrice = floorResponse.Ok.toString();
      floorPriceinWICP = Number(parseE8SAmountToWICP(floorPrice));
    }

    if (typeof onSuccess === 'function') {
      onSuccess(floorPriceinWICP);
    }

    return floorPriceinWICP;
  } catch (err) {
    AppLog.error(err);
    thunkAPI.dispatch(
      notificationActions.setErrorMessage(
        `Oops! Failed to get floor price`,
      ),
    );
    if (typeof onFailure === 'function') {
      onFailure(err);
    }
  }
});
