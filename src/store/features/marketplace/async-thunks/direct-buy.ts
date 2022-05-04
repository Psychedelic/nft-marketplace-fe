import { Principal } from '@dfinity/principal';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { notificationActions } from '../../errors';
import { DirectBuy } from '../marketplace-slice';
import config from '../../../../config/env';
import wicpIdlFactory from '../../../../declarations/wicp.did';
import marketplaceIdlFactory from '../../../../declarations/marketplace.did';

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
    const wicpAmount = BigInt(price);
    const WICP_APPROVE = {
      idl: wicpIdlFactory,
      canisterId: config.wICPCanisterId,
      methodName: 'approve',
      args: [marketplaceCanisterId, wicpAmount],
      onFail: (res: any) => {
        console.warn('Oops! Failed to deposit WICP', res);

        if (typeof onFailure === 'function') onFailure();
      },
    };

    const MKP_DIRECT_BUY = {
      idl: marketplaceIdlFactory,
      canisterId: config.marketplaceCanisterId,
      methodName: 'directBuy',
      args: [nonFungibleContractAddress, tokenId],
      onFail: (res: any) => {
        console.warn('Oops! Failed to direct buy', res);

        if (typeof onFailure === 'function') onFailure();
      },
      onSuccess,
    };

    const batchTxRes = await (
      window as any
    )?.ic?.plug?.batchTransactions([
      WICP_APPROVE,
      // MKP_DEPOSIT_WICP,
      MKP_DIRECT_BUY,
    ]);

    if (!batchTxRes) {
      if (typeof onFailure === 'function') onFailure();

      return;
    }

    return {
      tokenId,
      price,
    };
  } catch (err) {
    dispatch(
      notificationActions.setErrorMessage((err as Error).message),
    );
    if (typeof onFailure !== 'function') return;
    onFailure();
  }
});
