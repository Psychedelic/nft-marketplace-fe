import { Principal } from '@dfinity/principal';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { notificationActions } from '../../errors';
import { MakeOffer } from '../marketplace-slice';
import config from '../../../../config/env';
import wicpIdlFactory from '../../../../declarations/wicp.did';
import marketplaceIdlFactory from '../../../../declarations/marketplace.did';
import { parseAmountToE8S } from '../../../../utils/formatters';

export type MakeOfferProps = DefaultCallbacks & MakeOffer;

export const makeOffer = createAsyncThunk<
  MakeOffer | undefined,
  MakeOfferProps
>('marketplace/makeOffer', async (params, { dispatch }) => {
  const { id, amount, onSuccess, onFailure } = params;

  const mkpContractAddress = Principal.fromText(
    config.marketplaceCanisterId,
  );
  const crownsContractAddress = Principal.fromText(
    config.crownsCanisterId,
  );
  const userOwnedTokenId = BigInt(id);
  const amountInE8S = parseAmountToE8S(amount);
  const userOfferInPrice = BigInt(amountInE8S);

  try {
    const WICP_APPROVE_MARKETPLACE = {
      idl: wicpIdlFactory,
      canisterId: config.wICPCanisterId,
      methodName: 'approve',
      args: [mkpContractAddress, userOfferInPrice],
      onFail: (res: any) => {
        console.warn(
          `Oops! Failed to approve Marketplace (${config.wICPCanisterId})`,
          res,
        );

        if (typeof onFailure === 'function') onFailure();
      },
    };

    const MKP_MAKE_OFFER_WICP = {
      idl: marketplaceIdlFactory,
      canisterId: config.marketplaceCanisterId,
      methodName: 'makeOffer',
      args: [
        crownsContractAddress,
        userOwnedTokenId,
        userOfferInPrice,
      ],
      onSuccess,
      onFail: (res: any) => {
        console.warn(
          `Oops! Failed to make offer (${config.marketplaceCanisterId})`,
          res,
        );

        if (typeof onFailure === 'function') onFailure();
      },
    };

    const batchTxRes = await (
      window as any
    )?.ic?.plug?.batchTransactions([
      WICP_APPROVE_MARKETPLACE,
      MKP_MAKE_OFFER_WICP,
    ]);

    if (!batchTxRes) {
      if (typeof onFailure === 'function') onFailure();

      return;
    }

    return {
      id,
      amount,
    };
  } catch (err) {
    dispatch(
      notificationActions.setErrorMessage((err as Error).message),
    );
    if (typeof onFailure !== 'function') return;
    onFailure();
  }
});
