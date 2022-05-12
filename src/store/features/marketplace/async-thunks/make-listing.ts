import { Principal } from '@dfinity/principal';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../../../config/env';
import crownsIdlFactory from '../../../../declarations/nft.did';
import marketplaceIdlFactory from '../../../../declarations/marketplace.did';
import { notificationActions } from '../../notifications';
import { MakeListing } from '../marketplace-slice';
import { AppLog } from '../../../../utils/log';
import { parseAmountToE8S } from '../../../../utils/formatters';
import { KyasshuUrl } from '../../../../integrations/kyasshu';

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
    const userListForPrice = parseAmountToE8S(amount);

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

      // We call the Cap Sync process
      // but we don't have to wait for the response
      await axios.get(KyasshuUrl.getCAPSync());

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
