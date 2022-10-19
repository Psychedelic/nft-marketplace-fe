import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  KyasshuUrl,
  NSKyasshuUrl,
} from '../../../../integrations/kyasshu';
import { TokenMetadataById } from '../table-slice';
import { AppLog } from '../../../../utils/log';

export type GetTokenMetadataProps =
  NSKyasshuUrl.GetNFTDetailsQueryParams;

export const getTokenMetadata = createAsyncThunk<
  TokenMetadataById | undefined,
  GetTokenMetadataProps
>('table/getTokenMetadata', async ({ id, collectionId }) => {
  try {
    const response = await axios.get(
      KyasshuUrl.getNFTDetails({ id, collectionId }),
    );
    const nftName =
      response?.data?.metadata?.name?.value?.TextContent;

    if (!nftName)
      throw Error('Oops! Failed to retrieve ICNS name from metadata');

    return {
      [id]: nftName,
    };
  } catch (error) {
    AppLog.error(error);
  }
});
