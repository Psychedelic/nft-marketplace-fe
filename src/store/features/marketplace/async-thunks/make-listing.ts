import { Principal } from '@dfinity/principal';
import { createAsyncThunk } from '@reduxjs/toolkit';
import config from '../../../../config/env';
import crownsIdlFactory from '../../../../declarations/nft.did';
import marketplaceIdlFactory from '../../../../declarations/marketplace.did';
import { notificationActions } from '../../errors';
import { MakeListing } from '../marketplace-slice';
import { parseAmountToE8S } from '../../../../utils/formatters';

type MakeListingProps = DefaultCallbacks & MakeListing;

export const makeListing = createAsyncThunk<
  MakeListing | undefined,
  MakeListingProps
>(
  'marketplace/makeListing',
  async ({ id, amount, onSuccess, onFailure }, { dispatch }) => {
    const marketplaceCanisterId = Principal.fromText(
      config.marketplaceCanisterId,
    );
    const nonFungibleContractAddress = Principal.fromText(
      config.crownsCanisterId,
    );

    const userOwnedTokenId = BigInt(id);
    const amountInE8S = parseAmountToE8S(amount);
    const userListForPrice = BigInt(amountInE8S);

    try {
      const CROWNS_APPROVE_MARKETPLACE = {
        idl: crownsIdlFactory,
        canisterId: config.crownsCanisterId,
        methodName: 'approve',
        args: [marketplaceCanisterId, userOwnedTokenId],
        onFail: (res: any) => {
          console.warn(
            `Oops! Failed to approve Marketplace (${config.crownsCanisterId})`,
            res,
          );

          if (typeof onFailure === 'function') onFailure();
        },
      };

      const MKP_MAKE_LISTING = {
        idl: marketplaceIdlFactory,
        canisterId: config.marketplaceCanisterId,
        methodName: 'makeListing',
        args: [
          nonFungibleContractAddress,
          userOwnedTokenId,
          userListForPrice,
        ],
        onSuccess,
        onFail: (res: any) => {
          console.warn('Oops! Failed to make listing', res);

          if (typeof onFailure === 'function') onFailure();
        },
      };

      const batchTxRes = await (
        window as any
      )?.ic?.plug?.batchTransactions([
        CROWNS_APPROVE_MARKETPLACE,
        MKP_MAKE_LISTING,
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
  },
);
