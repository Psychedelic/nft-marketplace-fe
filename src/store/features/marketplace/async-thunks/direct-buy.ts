import { Principal } from '@dfinity/principal';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { notificationActions } from '../../notifications';
import { DirectBuy, marketplaceActions } from '../marketplace-slice';
import config from '../../../../config/env';
import wicpIdlFactory from '../../../../declarations/wicp.did';
import marketplaceIdlFactory from '../../../../declarations/marketplace.did';
import { AppLog } from '../../../../utils/log';
import { KyasshuUrl } from '../../../../integrations/kyasshu';
import { errorMessageHandler } from '../../../../utils/error';
import { parseAmountToE8S } from '../../../../utils/formatters';
import type { RootState } from '../../../store';

import { log, getLogDescription } from '../../../../utils/datadog';

type DirectBuyProps = DefaultCallbacks & DirectBuy;

export const directBuy = createAsyncThunk<
  DirectBuy | undefined,
  DirectBuyProps
>('marketplace/directBuy', async (params, { dispatch, getState }) => {
  const { tokenId, price, onSuccess, onFailure } = params;

  const {
    plug: { principalId: plugPrincipal },
  } = getState() as RootState;

  const tokenIdTxt = tokenId.toString();
  const logDescription = getLogDescription({
    operation: 'directBuy',
    parts: [tokenIdTxt, plugPrincipal || 'n/a'],
  });

  const {
    marketplace: { sumOfUserAllowance },
  }: any = getState();

  const marketplaceCanisterId = Principal.fromText(
    config.marketplaceCanisterId,
  );
  const nonFungibleContractAddress = Principal.fromText(
    config.nftCollectionId,
  );

  try {
    const allowanceAmountInWICP = sumOfUserAllowance
      ? sumOfUserAllowance + Number(price)
      : Number(price);

    const allowanceAmount = parseAmountToE8S(
      allowanceAmountInWICP.toString(),
    );

    const WICP_APPROVE = {
      idl: wicpIdlFactory,
      canisterId: config.wICPCanisterId,
      methodName: 'approve',
      args: [marketplaceCanisterId, allowanceAmount],
      onSuccess: (res: any) => {
        // check if error
        if ('Err' in res)
          throw new Error(errorMessageHandler(res.Err));
      },
      onFail: (res: any) => {
        throw res;
      },
    };

    const MKP_DIRECT_BUY = {
      idl: marketplaceIdlFactory,
      canisterId: config.marketplaceCanisterId,
      methodName: 'directBuy',
      args: [nonFungibleContractAddress, tokenId],
      onFail: (res: any) => {
        log({
          type: 'error',
          description: logDescription,
          data: {
            tokenIdTxt,
            plugPrincipal,
            error: res.Err,
          },
        });

        throw res;
      },
      onSuccess: async (res: any) => {
        if ('Err' in res) {
          log({
            type: 'error',
            description: logDescription,
            data: {
              tokenIdTxt,
              plugPrincipal,
              error: res.Err,
            },
          });

          throw new Error(errorMessageHandler(res.Err));
        }

        if (typeof onSuccess !== 'function') return;

        // We call the Cap Sync process
        await axios.get(KyasshuUrl.getCAPSync());

        onSuccess();
      },
    };

    const batchTxRes = await window.ic?.plug?.batchTransactions([
      WICP_APPROVE,
      MKP_DIRECT_BUY,
    ]);

    if (!batchTxRes) {
      const errorMsg = 'Empty response';

      log({
        type: 'error',
        description: logDescription,
        data: {
          tokenIdTxt,
          plugPrincipal,
          error: errorMsg,
        },
      });

      throw new Error(errorMsg);
    }

    return {
      tokenId,
      price,
    };
  } catch (err: any) {
    AppLog.error(err);

    const defaultErrorMessage = `Oops! Failed to direct buy`;

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
