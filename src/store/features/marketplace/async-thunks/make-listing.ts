import { Principal } from '@dfinity/principal';
import { createAsyncThunk } from '@reduxjs/toolkit';
import config from '../../../../config/env';
import crownsIdlFactory from '../../../../declarations/nft.did';
import marketplaceIdlFactory from '../../../../declarations/marketplace.did';
import { notificationActions } from '../../errors';
import { MakeListing } from '../marketplace-slice';
import { AppLog } from '../../../../utils/log';

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
    const userListForPrice = BigInt(amount);

    try {
      const CROWNS_APPROVE_MARKETPLACE = {
        idl: crownsIdlFactory,
        canisterId: config.crownsCanisterId,
        methodName: 'approve',
        args: [marketplaceCanisterId, userOwnedTokenId],
        onFail: (res: any) => {
          throw res;
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
          throw res;
        },
      };

      const batchTxRes = await window.ic?.plug?.batchTransactions([
        CROWNS_APPROVE_MARKETPLACE,
        MKP_MAKE_LISTING,
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
          'Oops! Failed to make listing',
        ),
      );
      if (typeof onFailure === 'function') {
        onFailure(err);
      }
    }
  },
);
