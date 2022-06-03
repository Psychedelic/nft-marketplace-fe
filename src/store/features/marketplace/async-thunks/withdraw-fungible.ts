import { Principal } from '@dfinity/principal';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { actorInstanceHandler } from '../../../../integrations/actor';
import { marketplaceSlice } from '../marketplace-slice';
import { notificationActions } from '../../notifications';
import { AppLog } from '../../../../utils/log';
import { errorMessageHandler } from '../../../../utils/error';

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
    const fungibleStandard = { DIP20: null };
    const principalAddress = Principal.fromText(principalId);

    const withdrawResponse = await actorInstance.withdrawFungible(
      principalAddress,
      fungibleStandard,
    );

    if ('Err' in withdrawResponse)
      throw new Error(errorMessageHandler(withdrawResponse.Err));

    if (typeof onSuccess !== 'function') return;

    onSuccess();

    return withdrawResponse;
  } catch (err: any) {
    AppLog.error(err);

    const defaultErrorMessage = `Oops! Failed to withdraw assets`;

    thunkAPI.dispatch(
      notificationActions.setErrorMessage(
        err?.message || defaultErrorMessage,
      ),
    );
    if (typeof onFailure === 'function') {
      onFailure(err);
    }
  }
});
