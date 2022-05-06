import { Principal } from '@dfinity/principal';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { notificationActions } from '../../errors';
import { MakeOffer } from '../marketplace-slice';
import config from '../../../../config/env';
import wicpIdlFactory from '../../../../declarations/wicp.did';
import marketplaceIdlFactory from '../../../../declarations/marketplace.did';
import { AppLog } from '../../../../utils/log';
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
  const userOfferInPrice = parseAmountToE8S(amount);

  try {
    const WICP_APPROVE_MARKETPLACE = {
      idl: wicpIdlFactory,
      canisterId: config.wICPCanisterId,
      methodName: 'approve',
      args: [mkpContractAddress, userOfferInPrice],
      onFail: (res: any) => {
        throw res;
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
        throw res;
      },
    };

    const batchTxRes = await window.ic?.plug?.batchTransactions([
      WICP_APPROVE_MARKETPLACE,
      MKP_MAKE_OFFER_WICP,
    ]);

    if (!batchTxRes) {
      throw new Error('Empty response');
    }

    return {
      id,
      amount,
    };
  } catch (err) {
    AppLog.error(err);
    dispatch(
      notificationActions.setErrorMessage(
        `Oops! Failed to make offer`,
      ),
    );
    if (typeof onFailure === 'function') {
      onFailure(err);
    }
  }
});
