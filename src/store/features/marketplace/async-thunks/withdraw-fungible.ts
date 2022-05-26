import { Principal } from '@dfinity/principal';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { actorInstanceHandler } from '../../../../integrations/actor';
import { marketplaceSlice } from '../marketplace-slice';
import { notificationActions } from '../../notifications';
import { AppLog } from '../../../../utils/log';

type Fungible = {
  principalId: string;
};

export type WithdrawFungibleProps = DefaultCallbacks & Fungible;

export const withdrawFungible = createAsyncThunk<
  any | undefined,
  WithdrawFungibleProps
>('marketplace/withdrawFungible', async (params, thunkAPI) => {
  // Checks if an actor instance exists already
  // otherwise creates a new instance
  const actorInstance = await actorInstanceHandler({
    thunkAPI,
    serviceName: 'marketplace',
    slice: marketplaceSlice,
  });

  const { onSuccess, onFailure, principalId } = params;

  try {
    const fungibleStandard = 'DIP20';
    const principalAddress = Principal.fromText(principalId);

    const withdrawResponse = await actorInstance.withdrawFungible(
      principalAddress,
      fungibleStandard,
    );

    if (typeof onSuccess === 'function') {
      onSuccess(withdrawResponse);
    }

    return withdrawResponse;
  } catch (err) {
    AppLog.error(err);
    thunkAPI.dispatch(
      notificationActions.setErrorMessage(
        `Oops! Failed to withdraw assets`,
      ),
    );
    if (typeof onFailure === 'function') {
      onFailure(err);
    }
  }
});
