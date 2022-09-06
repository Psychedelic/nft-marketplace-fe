import { Principal } from '@dfinity/principal';
import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import nftIdlFactory from '../../../../declarations/nft.did';
// import marketplaceV2IdlFactory from '../../../../declarations/marketplace-v2.did';
// import { notificationActions } from '../../notifications';
import {
  marketplaceActions,
  marketplaceSlice,
} from '../marketplace-slice';
import { jellyJsInstanceHandler } from '../../../../integrations/jelly-js';
import { getJellyCollection } from '../../../../utils/jelly';
// import { AppLog } from '../../../../utils/log';

type GetNFTs = {
  collectionId: Principal;
  tokenIds: string[];
};

type GetNFTsProps = DefaultCallbacks & GetNFTs;

export const getNFTs = createAsyncThunk<void, GetNFTsProps>(
  'marketplace/getNFTs',
  async ({ collectionId, tokenIds }, thunkAPI) => {
    // const { dispatch } = thunkAPI;

    // Checks if an actor instance exists already
    // otherwise creates a new instance
    const jellyInstance = await jellyJsInstanceHandler({
      thunkAPI,
      collectionId: collectionId.toString(),
      slice: marketplaceSlice,
    });

    const collection = await getJellyCollection({
      jellyInstance,
      collectionId: collectionId.toString(),
    });

    if (!collection)
      throw Error(`Oops! collection ${collectionId} not found!`);

    // if (!collection?.marketplaceId)
    //   throw Error(
    //     `Oops! marketplace id ${collection?.marketplaceId} not found!`,
    //   );

    // const { marketplaceId } = collection;
  },
);

