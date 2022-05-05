import { Principal } from '@dfinity/principal';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { notificationActions } from '../../errors';
import { DirectBuy } from '../marketplace-slice';
import config from '../../../../config/env';
import wicpIdlFactory from '../../../../declarations/wicp.did';
import marketplaceIdlFactory from '../../../../declarations/marketplace.did';
import { AppLog } from '../../../../utils/log';
import { parseAmountToE8S } from '../../../../utils/formatters';

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
    config.crownsCanisterId,
  );

  try {
    const amountInE8S = parseAmountToE8S(price);
    const wicpAmount = BigInt(amountInE8S);
    const WICP_APPROVE = {
      idl: wicpIdlFactory,
      canisterId: config.wICPCanisterId,
      methodName: 'approve',
      args: [marketplaceCanisterId, wicpAmount],
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
      onSuccess,
    };

    const batchTxRes = await window.ic?.plug?.batchTransactions([
      WICP_APPROVE,
      // MKP_DEPOSIT_WICP,
      MKP_DIRECT_BUY,
    ]);

    if (!batchTxRes) {
      throw new Error('Empty response');
    }

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
