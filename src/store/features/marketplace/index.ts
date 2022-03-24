import { createAsyncThunk } from '@reduxjs/toolkit';
import { ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import marketplaceIdlService from '../../../declarations/marketplace';
import { createActor } from '../../../integrations/actor';
import config from '../../../config/env';
import { errorActions } from '../../';

const initialState = {};

type ListForSaleParams = {
  id: string;
  amount: string;
  onSuccess?: () => void;
  onFailure?: () => void;
};

export const listForSale = createAsyncThunk(
  'marketplace/listForSale',
  async (params: ListForSaleParams, thunkAPI) => {
    try {
      const { id, amount, onSuccess, onFailure } = params;
      const nonFungibleContractAddress = Principal.fromText(
        config.crownsCanisterId,
      );
      const userOwnedTokenId = BigInt(id);
      const userListForPrice = BigInt(amount);

      const actor = (await createActor<marketplaceIdlService>({
        serviceName: 'marketplace',
      })) as ActorSubclass<marketplaceIdlService>;

      const result = await actor.listForSale(
        nonFungibleContractAddress,
        userOwnedTokenId,
        userListForPrice,
      );

      if (!('Ok' in result)) {
        if (typeof onFailure !== 'function') return;

        onFailure();

        console.error(result);

        throw Error('Oops! Failed to list for sale');
      }

      if (typeof onSuccess !== 'function') return;

      console.info(result);

      onSuccess();
    } catch (err) {
      thunkAPI.dispatch(errorActions.setErrorMessage(err.message));
    }
  },
);
