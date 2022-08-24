import { Principal } from '@dfinity/principal';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { actorInstanceHandler } from '../../../../integrations/actor';
import { marketplaceSlice } from '../marketplace-slice';
import { AppLog } from '../../../../utils/log';

export const getTokenListing = createAsyncThunk<any | undefined, any>(
  'marketplace/getTokenListing',
  async (params: any, thunkAPI) => {
    // Checks if an actor instance exists already
    // otherwise creates a new instance
    const actorInstance = await actorInstanceHandler({
      thunkAPI,
      serviceName: 'marketplace',
      slice: marketplaceSlice,
    });

    const {
      id: tokenId,
      collectionId,
      onFailure,
      onSuccess,
    } = params;

    try {
      const nonFungibleContractAddress =
        Principal.fromText(collectionId);
      const result = await actorInstance.getTokenListing(
        nonFungibleContractAddress,
        BigInt(tokenId),
      );

      if (typeof onSuccess !== 'function') return;

      if (!('Ok' in result)) {
        AppLog.warn(
          `Oops! Failed to get token listing for id ${tokenId}`,
        );

        onSuccess();

        return {
          [tokenId]: {},
        };
      }

      onSuccess();

      return {
        [tokenId]: result.Ok,
      };
    } catch (err) {
      AppLog.error(err);
      if (typeof onFailure === 'function') {
        onFailure(err);
      }
    }
  },
);
