import { createAsyncThunk } from '@reduxjs/toolkit';
import { Principal } from '@dfinity/principal';
import axios from 'axios';
import { notificationActions } from '../../notifications';
import { CancelOffer } from '../marketplace-slice';
import config from '../../../../config/env';
import marketplaceIdlFactory from '../../../../declarations/marketplace.did';
import { AppLog } from '../../../../utils/log';
import { KyasshuUrl } from '../../../../integrations/kyasshu';
import { errorMessageHandler } from '../../../../utils/error';

// TODO: update cancel-offer integration using jelly-js

export type CancelOfferProps = DefaultCallbacks & CancelOffer;

export const cancelOffer = createAsyncThunk<
  CancelOffer | undefined,
  CancelOfferProps
>('marketplace/cancelOffer', async (params, { dispatch }) => {
  const { id, onSuccess, onFailure } = params;

  try {
    const nonFungibleContractAddress = Principal.fromText(
      config.nftCollectionId,
    );
    const userOwnedTokenId = BigInt(id);

    const MKP_CANCEL_OFFER = {
      idl: marketplaceIdlFactory,
      canisterId: config.marketplaceCanisterId,
      methodName: 'cancelOffer',
      args: [nonFungibleContractAddress, userOwnedTokenId],
      onSuccess: async (res: any) => {
        if ('Err' in res)
          throw new Error(errorMessageHandler(res.Err));

        if (typeof onSuccess !== 'function') return;

        // We call the Cap Sync process
        await axios.get(KyasshuUrl.getCAPJellySync());

        onSuccess();
      },
      onFail: (res: any) => {
        throw res;
      },
    };

    const batchTxRes = await window.ic?.plug?.batchTransactions([
      MKP_CANCEL_OFFER,
    ]);

    if (!batchTxRes) {
      throw new Error('Empty response');
    }

    return {
      id,
    };
  } catch (err: any) {
    AppLog.error(err);

    const defaultErrorMessage = `Oops! Failed to cancel offer`;

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
