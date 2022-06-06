import { createAsyncThunk } from '@reduxjs/toolkit';
import { Principal } from '@dfinity/principal';
import axios from 'axios';
import { notificationActions } from '../../notifications';
import { AcceptOffer } from '../marketplace-slice';
import config from '../../../../config/env';
import marketplaceIdlFactory from '../../../../declarations/marketplace.did';
import crownsIdlFactory from '../../../../declarations/nft.did';
import { AppLog } from '../../../../utils/log';
import { parseAmountToE8S } from '../../../../utils/formatters';
import { KyasshuUrl } from '../../../../integrations/kyasshu';
import { errorMessageHandler } from '../../../../utils/error';

export type AcceptOfferProps = DefaultCallbacks & AcceptOffer;

export const acceptOffer = createAsyncThunk<
  AcceptOffer | undefined,
  AcceptOfferProps
>('marketplace/acceptOffer', async (params, { dispatch }) => {
  const { id, buyerPrincipalId, offerPrice, onSuccess, onFailure } =
    params;

  try {
    const marketplaceCanisterId = Principal.fromText(
      config.marketplaceCanisterId,
    );
    const nonFungibleContractAddress = Principal.fromText(
      config.nftCollectionId,
    );
    const userOwnedTokenId = BigInt(id);
    const buyerAddress = Principal.fromText(buyerPrincipalId);

    const offerInPrice = parseAmountToE8S(offerPrice);

    const CROWNS_APPROVE_MARKETPLACE = {
      idl: crownsIdlFactory,
      canisterId: config.nftCollectionId,
      methodName: 'approve',
      args: [marketplaceCanisterId, userOwnedTokenId],
      onSuccess: (res: any) => {
        // check if error
        if ('Err' in res)
          throw new Error(errorMessageHandler(res.Err));
      },
      onFail: (res: any) => {
        throw res;
      },
    };

    const MKP_ACCEPT_OFFER = {
      idl: marketplaceIdlFactory,
      canisterId: config.marketplaceCanisterId,
      methodName: 'acceptOffer',
      args: [
        nonFungibleContractAddress,
        userOwnedTokenId,
        buyerAddress,
      ],
      onSuccess: (res: any) => {
        if ('Err' in res)
          throw new Error(errorMessageHandler(res.Err));

        if (typeof onSuccess !== 'function') return;

        onSuccess();
      },
      onFail: (res: any) => {
        throw res;
      },
    };

    const batchTxRes = await (
      window as any
    )?.ic?.plug?.batchTransactions([
      CROWNS_APPROVE_MARKETPLACE,
      MKP_ACCEPT_OFFER,
    ]);

    if (!batchTxRes) {
      throw new Error('Empty response');
    }

    // We call the Cap Sync process
    await axios.get(KyasshuUrl.getCAPSync());

    return {
      id,
      buyerPrincipalId,
      offerPrice,
    };
  } catch (err: any) {
    AppLog.error(err);

    const defaultErrorMessage = `Oops! Failed to accept offer`;

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
