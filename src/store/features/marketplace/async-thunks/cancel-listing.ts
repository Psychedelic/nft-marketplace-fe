import { Principal } from '@dfinity/principal';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { notificationActions } from '../../notifications';
import { CancelListing } from '../marketplace-slice';
import config from '../../../../config/env';
import marketplaceIdlFactory from '../../../../declarations/marketplace.did';
import { AppLog } from '../../../../utils/log';
import { KyasshuUrl } from '../../../../integrations/kyasshu';
import { errorMessageHandler } from '../../../../utils/error';

export type CancelListingProps = DefaultCallbacks & CancelListing;

export const cancelListing = createAsyncThunk<
  CancelListing | undefined,
  CancelListingProps
>('marketplace/cancelListing', async (params, { dispatch }) => {
  const { id, onSuccess, onFailure } = params;

  const nonFungibleContractAddress = Principal.fromText(
    config.nftCollectionId,
  );
  const userOwnedTokenId = BigInt(id);

  try {
    const MKP_CANCEL_LISTING = {
      idl: marketplaceIdlFactory,
      canisterId: config.marketplaceCanisterId,
      methodName: 'cancelListing',
      args: [nonFungibleContractAddress, userOwnedTokenId],
      onFail: (res: any) => {
        throw res;
      },
      onSuccess: async (res: any) => {
        if ('Err' in res)
          throw new Error(errorMessageHandler(res.Err));

        if (typeof onSuccess !== 'function') return;

        // We call the Cap Sync process
        await axios.get(KyasshuUrl.getCAPJellySync());

        onSuccess();
      },
    };

    const batchTxRes = await window.ic?.plug?.batchTransactions([
      MKP_CANCEL_LISTING,
    ]);

    if (!batchTxRes) {
      throw new Error('Empty response');
    }

    return {
      id,
    };
  } catch (err: any) {
    AppLog.error(err);

    const defaultErrorMessage = `Oops! Failed to cancel listing`;

    dispatch(
      notificationActions.setErrorMessage(
        err?.message || defaultErrorMessage,
      ),
    );
    if (typeof onFailure === 'function') {
      onFailure(err);
    }
  }
});
