import { createAsyncThunk } from '@reduxjs/toolkit';
import { Principal } from '@dfinity/principal';
import { crownsSlice, OwnerTokenIdentifiers } from '../crowns-slice';
import { actorInstanceHandler } from '../../../../integrations/actor';
import { AppLog } from '../../../../utils/log';
import { notificationActions } from '../../errors';

type OwnerTokenIdentifiersProps = DefaultCallbacks & {
  plugPrincipal: string;
};

export const getOwnerTokenIdentifiers = createAsyncThunk<
  OwnerTokenIdentifiers | undefined,
  OwnerTokenIdentifiersProps
>(
  'crowns/ownerTokenIdentifiers',
  async ({ plugPrincipal, onFailure }, thunkAPI) => {
    // Checks if an actor instance exists already
    // otherwise creates a new instance
    const actorInstance = await actorInstanceHandler({
      thunkAPI,
      serviceName: 'crowns',
      slice: crownsSlice,
    });

    try {
      const result = await actorInstance.ownerTokenIdentifiers(
        Principal.fromText(plugPrincipal),
      );

      if (!('Ok' in result)) {
        throw Error('Invalid response');
      }

      return result.Ok;
    } catch (err) {
      AppLog.error(err);
      thunkAPI.dispatch(
        notificationActions.setErrorMessage(
          'Oops! Failed to retrieve user tokens',
        ),
      );
      if (typeof onFailure === 'function') {
        onFailure(err);
      }
    }
  },
);
