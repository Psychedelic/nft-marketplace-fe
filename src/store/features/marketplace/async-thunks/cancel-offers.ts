import { createAsyncThunk } from '@reduxjs/toolkit';
import { Principal } from '@dfinity/principal';
import { notificationActions } from '../../errors';
import { CancelOffer } from '../marketplace-slice';
import config from '../../../../config/env';
import marketplaceIdlFactory from '../../../../declarations/marketplace.did';

export type CancelOfferProps = DefaultCallbacks & CancelOffer;

export const cancelOffer = createAsyncThunk<
  CancelOffer | undefined,
  CancelOfferProps
>('marketplace/cancelOffer', async (params, { dispatch }) => {
  const { id, onSuccess, onFailure } =
    params;

  try {
    const nonFungibleContractAddress = Principal.fromText(
      config.crownsCanisterId,
    );
    const userOwnedTokenId = BigInt(id);

    const MKP_CANCEL_OFFER = {
      idl: marketplaceIdlFactory,
      canisterId: config.marketplaceCanisterId,
      methodName: 'cancelOffer',
      args: [
        nonFungibleContractAddress,
        userOwnedTokenId,
      ],
      onSuccess,
      onFail: (res: any) => {
        console.warn('Oops! Failed to cancel offer', res);

        if (typeof onFailure === 'function') onFailure();
      },
    };

    const batchTxRes = await (
      window as any
    )?.ic?.plug?.batchTransactions([
      MKP_CANCEL_OFFER,
    ]);

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
