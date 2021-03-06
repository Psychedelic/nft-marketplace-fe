import { Principal } from '@dfinity/principal';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { notificationActions } from '../../notifications';
import { MakeOffer, marketplaceActions } from '../marketplace-slice';
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

  const allowanceAmountInWICP = sumOfUserAllowance
    ? sumOfUserAllowance + Number(amount)
    : Number(amount);

  const allowanceAmount = parseAmountToE8S(
    allowanceAmountInWICP.toString(),
  );

  try {
    const WICP_APPROVE_MARKETPLACE = {
      idl: wicpIdlFactory,
      canisterId: config.wICPCanisterId,
      methodName: 'approve',
      args: [mkpContractAddress, allowanceAmount],
      onSuccess: (res: any) => {
        if ('Err' in res)
          throw new Error(errorMessageHandler(res.Err));
      },
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
    dispatch(
      marketplaceActions.setFailedTransactions(defaultErrorMessage),
    );
  }
});
