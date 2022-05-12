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
>('table/getTokenMetadata', async ({ id }) => {
  try {
    const response = await axios.get(
      KyasshuUrl.getNFTDetails({ id }),
    );
    const thumbnail = response?.data?.metadata?.thumbnail?.value?.TextContent;

    if (!thumbnail) throw Error('Oops! Failed to retrieve thumbnail from metadata');

    return {
      [id]: thumbnail,
    };
  } catch (error) {
    AppLog.error(error);
  }
});
