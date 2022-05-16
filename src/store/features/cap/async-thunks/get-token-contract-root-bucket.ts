import { createAsyncThunk } from '@reduxjs/toolkit';
import { Principal } from '@dfinity/principal';
import { capSlice } from '../cap-slice';
import { actorInstanceHandler } from '../../../../integrations/actor';
import { AppLog } from '../../../../utils/log';
import { notificationActions } from '../../notifications';

type GetTokenContractRootBucket = {
  marketplaceCanisterId: string;
};

export const getTokenContractRootBucket = createAsyncThunk<
  string | undefined,
  GetTokenContractRootBucket
>(
  'cap/getTokenContractRootBucket',
  async ({ marketplaceCanisterId }, thunkAPI) => {
    thunkAPI.dispatch(capSlice.actions.setLoading(true));

    // Checks if an actor instance exists already
    // otherwise creates a new instance
    const actorInstance = await actorInstanceHandler({
      thunkAPI,
      serviceName: 'cap',
      slice: capSlice,
    });

    try {
      const result =
        await actorInstance.get_token_contract_root_bucket({
          canister: Principal.fromText(marketplaceCanisterId),
          witness: false,
        });

      // eslint-disable-next-line no-underscore-dangle
      if (!result?.canister || !result?.canister[0]._isPrincipal) {
        throw Error(
          'Oops! Invalid response, canister fieldname not found',
        );
      }

      return result.canister[0].toString();
    } catch (err) {
      AppLog.error(err);
      thunkAPI.dispatch(
        notificationActions.setErrorMessage(
          'Oops! Failed to retrieve bucket id',
        ),
      );
    } finally {
      thunkAPI.dispatch(capSlice.actions.setLoading(false));
    }
  },
);

