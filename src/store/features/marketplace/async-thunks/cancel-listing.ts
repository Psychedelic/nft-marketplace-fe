import { Principal } from '@dfinity/principal';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { notificationActions } from '../../errors';
import { CancelListing } from '../marketplace-slice';
import config from '../../../../config/env';
import marketplaceIdlFactory from '../../../../declarations/marketplace.did';
import { AppLog } from '../../../../utils/log';

export type CancelListingProps = DefaultCallbacks & CancelListing;

export const cancelListing = createAsyncThunk<
  CancelListing | undefined,
  CancelListingProps
>('marketplace/cancelListing', async (params, { dispatch }) => {
  const { id, onSuccess, onFailure } = params;

  const nonFungibleContractAddress = Principal.fromText(
    config.crownsCanisterId,
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
      onSuccess,
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
  } catch (err) {
    AppLog.error(err);
    dispatch(
      notificationActions.setErrorMessage(
        'Oops! Failed to cancel listing',
      ),
    );
    if (typeof onFailure === 'function') {
      onFailure(err);
    }
  }
});
