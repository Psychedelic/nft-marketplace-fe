import { Principal } from '@dfinity/principal';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { actorInstanceHandler } from '../../../../integrations/actor';
import { marketplaceSlice } from '../marketplace-slice';
import config from '../../../../config/env';
import { notificationActions } from '../../errors';
import { AppLog } from '../../../../utils/log';
import { parseE8SAmountToWICP } from '../../../../utils/formatters';

export const getFloorPrice = createAsyncThunk<any>(
  'marketplace/getFloor',
  async (_, thunkAPI) => {
    // Checks if an actor instance exists already
    // otherwise creates a new instance
    const actorInstance = await actorInstanceHandler({
      thunkAPI,
      serviceName: 'marketplace',
      slice: marketplaceSlice,
    });

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
        floorPriceinWICP = parseE8SAmountToWICP(floorPrice);
      }

      console.log(floorPriceinWICP, 'floorPriceinWICP');

      return floorPriceinWICP;
    } catch (err) {
      AppLog.error(err);
      thunkAPI.dispatch(
        notificationActions.setErrorMessage(
          `Oops! Failed to get floor price`,
        ),
      );
    }
  },
);
