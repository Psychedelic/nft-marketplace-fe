import { createAsyncThunk } from '@reduxjs/toolkit';
import { Principal } from '@dfinity/principal';
import { notificationActions } from '../../errors';
import { AcceptOffer } from '../marketplace-slice';
import config from '../../../../config/env';
import marketplaceIdlFactory from '../../../../declarations/marketplace.did';
import crownsIdlFactory from '../../../../declarations/nft.did';
import { AppLog } from '../../../../utils/log';
import { parseAmountToE8S } from '../../../../utils/formatters';

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
      config.crownsCanisterId,
    );
    const userOwnedTokenId = BigInt(id);
    const buyerAddress = Principal.fromText(buyerPrincipalId);

    const amountInE8S = parseAmountToE8S(offerPrice);
    const offerInPrice = BigInt(amountInE8S);

    const CROWNS_APPROVE_MARKETPLACE = {
      idl: crownsIdlFactory,
      canisterId: config.crownsCanisterId,
      methodName: 'approve',
      args: [marketplaceCanisterId, userOwnedTokenId],
      onFail: (res: any) => {
        throw res;
      },
    };

    const MKP_MAKE_LISTING = {
      idl: marketplaceIdlFactory,
      canisterId: config.marketplaceCanisterId,
      methodName: 'makeListing',
      args: [
        nonFungibleContractAddress,
        userOwnedTokenId,
        offerInPrice,
      ],
      onSuccess,
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
      onSuccess,
      onFail: (res: any) => {
        throw res;
      },
    };

    const batchTxRes = await (
      window as any
    )?.ic?.plug?.batchTransactions([
      CROWNS_APPROVE_MARKETPLACE,
      MKP_MAKE_LISTING,
      MKP_ACCEPT_OFFER,
    ]);

    if (!batchTxRes) {
      throw new Error('Empty response');
    }

    return {
      id,
      buyerPrincipalId,
      offerPrice,
    };
  } catch (err) {
    AppLog.error(err);
    dispatch(
      notificationActions.setErrorMessage(
        `Oops! Failed to make listing`,
      ),
    );
    if (typeof onFailure === 'function') {
      onFailure(err);
    }
  }
});
