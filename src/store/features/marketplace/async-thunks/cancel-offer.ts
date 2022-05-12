import { createAsyncThunk } from '@reduxjs/toolkit';
import { Principal } from '@dfinity/principal';
import axios from 'axios';
import { notificationActions } from '../../notifications';
import { CancelOffer } from '../marketplace-slice';
import config from '../../../../config/env';
import marketplaceIdlFactory from '../../../../declarations/marketplace.did';
import { AppLog } from '../../../../utils/log';
import { KyasshuUrl } from '../../../../integrations/kyasshu';

export type CancelOfferProps = DefaultCallbacks & CancelOffer;

export const cancelOffer = createAsyncThunk<
  CancelOffer | undefined,
  CancelOfferProps
>('marketplace/cancelOffer', async (params, { dispatch }) => {
  const { id, onSuccess, onFailure } = params;

  try {
    const nonFungibleContractAddress = Principal.fromText(
      config.crownsCanisterId,
    );
    const userOwnedTokenId = BigInt(id);

    const MKP_CANCEL_OFFER = {
      idl: marketplaceIdlFactory,
      canisterId: config.marketplaceCanisterId,
      methodName: 'cancelOffer',
      args: [nonFungibleContractAddress, userOwnedTokenId],
      onSuccess,
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

    // We call the Cap Sync process
    // but we don't have to wait for the response
    await axios.get(KyasshuUrl.getCAPSync());

    return {
      id,
    };
  } catch (err) {
    AppLog.error(err);
    dispatch(
      notificationActions.setErrorMessage(
        'Oops! Failed to cancel offer',
      ),
    );
    if (typeof onFailure === 'function') {
      onFailure(err);
    }
  }
});

