import { Principal } from '@dfinity/principal';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { notificationActions } from '../../errors';
import { CancelListing } from '../marketplace-slice';
import config from '../../../../config/env';
import marketplaceIdlFactory from '../../../../declarations/marketplace.did';

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
        console.warn('Oops! Failed to withdraw NFT', res);

        if (typeof onFailure === 'function') onFailure();
      },
      onSuccess,
    };

    const batchTxRes = await (
      window as any
    )?.ic?.plug?.batchTransactions([MKP_CANCEL_LISTING]);

    if (!batchTxRes) {
      if (typeof onFailure === 'function') onFailure();

      return;
    }

    return {
      id,
    };
  } catch (err) {
    dispatch(
      notificationActions.setErrorMessage((err as Error).message),
    );
    if (typeof onFailure !== 'function') return;
    onFailure();
  }
});
