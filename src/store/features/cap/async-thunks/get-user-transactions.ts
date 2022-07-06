import { createAsyncThunk } from '@reduxjs/toolkit';
import { Principal } from '@dfinity/principal';
import { actorInstanceHandler } from '../../../../integrations/actor';
import { AppLog } from '../../../../utils/log';
import { notificationActions } from '../../notifications';
import { capRootActions, capRootSlice } from '../cap-root-slice';
import { GetTransactionsResponseBorrowed } from '../../../../declarations/cap-root';

type GetUserTransactions = {
  bucketId: Principal;
  page: number;
  plugPrincipal: string;
};

export const getUserTransactions = createAsyncThunk<
  GetTransactionsResponseBorrowed | undefined,
  GetUserTransactions
>(
  'capRoot/getUserTransactions',
  async ({ page, bucketId, plugPrincipal }, thunkAPI) => {
    thunkAPI.dispatch(capRootActions.setLoading(true));

    // Checks if an actor instance exists already
    // otherwise creates a new instance
    const actorInstance = await actorInstanceHandler({
      thunkAPI,
      serviceName: 'capRoot',
      slice: capRootSlice,
      data: {
        bucketId,
      },
    });

    try {
      const userAddress = Principal.fromText(plugPrincipal);
      const response = (await actorInstance.get_user_transactions({
        user: userAddress,
        page,
        witness: false,
      })) as GetTransactionsResponseBorrowed;

      return response;
    } catch (err) {
      AppLog.error(err);
      thunkAPI.dispatch(
        notificationActions.setErrorMessage(
          'Oops! Unable to fetch user activity table data',
        ),
      );
    } finally {
      thunkAPI.dispatch(capRootActions.setLoading(false));
    }
  },
);

