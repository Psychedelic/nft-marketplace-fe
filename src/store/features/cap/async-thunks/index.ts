import { createAsyncThunk } from '@reduxjs/toolkit';
import { Principal } from '@dfinity/principal';
import { capSlice } from '../cap-slice';
import { actorInstanceHandler } from '../../../../integrations/actor';
import { AppLog } from '../../../../utils/log';
import { notificationActions } from '../../errors';
import config from '../../../../config/env';

export const getTokenContractRootBucket = createAsyncThunk<
string | undefined,
any
>(
'cap/getTokenContractRootBucket',
async (params, thunkAPI) => {
  console.log('[debug] cap-slices.ts: getTokenContractRootBucket: index.ts: bp', 1);

  // Checks if an actor instance exists already
  // otherwise creates a new instance
  const actorInstance = await actorInstanceHandler({
    thunkAPI,
    serviceName: 'cap',
    slice: capSlice,
  });

  console.log('[debug] cap-slices.ts: getTokenContractRootBucket: index.ts: bp', 2);

  try {
    console.log('[debug] cap-slices.ts: getTokenContractRootBucket: index.ts: bp', 3);

    const result = await actorInstance.get_token_contract_root_bucket({
      canister: Principal.fromText(config.marketplaceCanisterId),
      witness: false,
    });

    console.log('[debug] cap-slices.ts: getTokenContractRootBucket: index.ts: result:', result);

    // eslint-disable-next-line no-underscore-dangle
    if (!result?.canister || !result?.canister[0]._isPrincipal) {
      throw Error('Oops! Invalid response, canister fieldname not found');
    }

    console.log('[debug] result.canister[0].toString()', result.canister[0].toString());

    return result.canister[0].toString();
  } catch (err) {
    console.log('[debug] cap-slices.ts: getTokenContractRootBucket: index.ts: bp', 4);

    AppLog.error(err);
    thunkAPI.dispatch(
      notificationActions.setErrorMessage(
        'Oops! Failed to retrieve bucket id',
      ),
    );
  }
},
);
