import { Principal } from '@dfinity/principal';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { notificationActions } from '../../notifications';
import { DirectBuy } from '../marketplace-slice';
import config from '../../../../config/env';
import wicpIdlFactory from '../../../../declarations/wicp.did';
import marketplaceIdlFactory from '../../../../declarations/marketplace.did';
import { AppLog } from '../../../../utils/log';
import { KyasshuUrl } from '../../../../integrations/kyasshu';
import { errorMessageHandler } from '../../../../utils/error';

type DirectBuyProps = DefaultCallbacks & DirectBuy;

export const directBuy = createAsyncThunk<
  DirectBuy | undefined,
  DirectBuyProps
>('marketplace/directBuy', async (params, { dispatch }) => {
  const { tokenId, price, onSuccess, onFailure } = params;

  const marketplaceCanisterId = Principal.fromText(
    config.marketplaceCanisterId,
  );
  const nonFungibleContractAddress = Principal.fromText(
    config.nftCollectionId,
  );

  try {
    const allowanceAmount = BigInt(9_223_372_036_854_775_807);
    const WICP_APPROVE = {
      idl: wicpIdlFactory,
      canisterId: config.wICPCanisterId,
      methodName: 'approve',
      args: [marketplaceCanisterId, allowanceAmount],
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
        throw res;
      },
      onSuccess: (res: any) => {
        if ('Err' in res)
          throw new Error(errorMessageHandler(res.Err));

        if (typeof onSuccess !== 'function') return;

        onSuccess();
      },
    };

    const batchTxRes = await window.ic?.plug?.batchTransactions([
      WICP_APPROVE,
      // MKP_DEPOSIT_WICP,
      MKP_DIRECT_BUY,
    ]);

    if (!batchTxRes) {
      throw new Error('Empty response');
    }

    // We call the Cap Sync process
    // but we don't have to wait for the response
    await axios.get(KyasshuUrl.getCAPSync());

    return {
      tokenId,
      price,
    };
  } catch (err) {
    AppLog.error(err);
    dispatch(
      notificationActions.setErrorMessage(
        'Oops! Failed to direct buy',
      ),
    );
    if (typeof onFailure === 'function') {
      onFailure(err);
    }
  }
});
