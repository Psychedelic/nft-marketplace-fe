import { createAsyncThunk } from '@reduxjs/toolkit';
import { marketplaceSlice } from '../../marketplace/marketplace-slice';
import { jellyJsInstanceHandler } from '../../../../integrations/jelly-js';
import { capSlice } from '../cap-slice';
import { actorInstanceHandler } from '../../../../integrations/actor';
import { AppLog } from '../../../../utils/log';
import { getJellyCollection } from '../../../../utils/jelly';
import { notificationActions } from '../../notifications';

type GetTokenContractRootBucket = {
  collectionId: string;
};

export const getTokenContractRootBucket = createAsyncThunk<
  string | undefined,
  GetTokenContractRootBucket
>(
  'cap/getTokenContractRootBucket',
  async ({ collectionId }, thunkAPI) => {
    // TODO: make this an util, as its currently used
    // in different places, see make-listing, cancel-offer, etc
    // Checks if an actor instance exists already
    // otherwise creates a new instance
    const jellyInstance = await jellyJsInstanceHandler({
      thunkAPI,
      collectionId,
      slice: marketplaceSlice,
    });

    const collection = await getJellyCollection({
      jellyInstance,
      collectionId,
    });

    if (!collection)
      throw Error(`Oops! collection ${collectionId} not found!`);

    if (!collection?.marketplaceId)
      throw Error(
        `Oops! marketplace id ${collection?.marketplaceId} not found!`,
      );

    const { marketplaceId } = collection;

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
          canister: marketplaceId,
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

