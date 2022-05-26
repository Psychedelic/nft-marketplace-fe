import { Principal } from '@dfinity/principal';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { actorInstanceHandler } from '../../../../integrations/actor';
import { marketplaceSlice } from '../marketplace-slice';
import { AppLog } from '../../../../utils/log';
import { parseBalanceResponse } from '../../../../utils/parser';
import { settingsActions } from '../../settings';

export type GetAssetsToWithdrawProps = {
  userPrincipalId: string;
};

export const getAssetsToWithdraw = createAsyncThunk<
  any | undefined,
  GetAssetsToWithdrawProps
>('marketplace/balanceOf', async (params, thunkAPI) => {
  // Checks if an actor instance exists already
  // otherwise creates a new instance
  const actorInstance = await actorInstanceHandler({
    thunkAPI,
    serviceName: 'marketplace',
    slice: marketplaceSlice,
  });

  const { userPrincipalId } = params;

  try {
    const userPrincipalAddress = Principal.fromText(userPrincipalId);

    const balanceResponse = await actorInstance.balanceOf(
      userPrincipalAddress,
    );

    const assetsToWithdraw =
      !Array.isArray(balanceResponse) || !balanceResponse.length
        ? []
        : parseBalanceResponse(balanceResponse);

    thunkAPI.dispatch(settingsActions.setAlerts(assetsToWithdraw));

    return assetsToWithdraw;
  } catch (err) {
    AppLog.error(err);
  }
});
