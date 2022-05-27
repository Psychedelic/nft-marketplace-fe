import { Principal } from '@dfinity/principal';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { notificationActions } from '../../notifications';
import { MakeOffer } from '../marketplace-slice';
import config from '../../../../config/env';
import wicpIdlFactory from '../../../../declarations/wicp.did';
import marketplaceIdlFactory from '../../../../declarations/marketplace.did';
import { AppLog } from '../../../../utils/log';
import { parseAmountToE8S } from '../../../../utils/formatters';
import { errorMessageHandler } from '../../../../utils/error';
import { KyasshuUrl } from '../../../../integrations/kyasshu';

export type MakeOfferProps = DefaultCallbacks & MakeOffer;

export const makeOffer = createAsyncThunk<
  MakeOffer | undefined,
  MakeOfferProps
>('marketplace/makeOffer', async (params, { dispatch, getState }) => {
  const { id, amount, onSuccess, onFailure } = params;

  const {
    marketplace: { sumOfUserAllowance },
  }: any = getState();

  const mkpContractAddress = Principal.fromText(
    config.marketplaceCanisterId,
  );
  const crownsContractAddress = Principal.fromText(
    config.nftCollectionId,
  );
  const userOwnedTokenId = BigInt(id);
  const userOfferInPrice = parseAmountToE8S(amount);

  // default allowance amount
  let allowanceAmount = BigInt(9_223_372_036_854_775_807);

  if (sumOfUserAllowance && amount) {
    const calculatedAllowance = sumOfUserAllowance + Number(amount);

    // updated allowance amount based on offers made by users already
    allowanceAmount = parseAmountToE8S(
      calculatedAllowance.toString(),
    );
  }

  try {
    const WICP_APPROVE_MARKETPLACE = {
      idl: wicpIdlFactory,
      canisterId: config.wICPCanisterId,
      methodName: 'approve',
      args: [mkpContractAddress, allowanceAmount],
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

    const batchTxRes = await window.ic?.plug?.batchTransactions([
      WICP_APPROVE_MARKETPLACE,
      MKP_MAKE_OFFER_WICP,
    ]);

    if (!batchTxRes) {
      throw new Error('Empty response');
    }

    // We call the Cap Sync process
    // but we don't have to wait for the response
    await axios.get(KyasshuUrl.getCAPSync());

    return {
      id,
      amount,
    };
  } catch (err: any) {
    AppLog.error(err);

    const defaultErrorMessage = `Oops! Failed to make offer`;

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
