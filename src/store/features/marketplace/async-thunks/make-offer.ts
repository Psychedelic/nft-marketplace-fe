import { Principal } from '@dfinity/principal';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { notificationActions } from '../../errors';
import { MakeOffer } from '../marketplace-slice';
import config from '../../../../config/env';
import wicpIdlFactory from '../../../../declarations/wicp.did';
import marketplaceIdlFactory from '../../../../declarations/marketplace.did';
import { AppLog } from '../../../../utils/log';
import { parseAmountToE8S } from '../../../../utils/formatters';
import { errorMessageHandler } from '../../../../utils/error';
import {
  KyasshuUrl,
} from '../../../../integrations/kyasshu';

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
  const allowanceAmount = BigInt(9_223_372_036_854_775_807);

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
        if ('Err' in res) throw new Error(
          errorMessageHandler(res.Err)
        );

        if (typeof onSuccess !== 'function') return;

        onSuccess()
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
    axios.get(
      KyasshuUrl.getCAPSync(),
    );

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
