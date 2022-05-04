import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { KyasshuUrl, NSKyasshuUrl } from '../../../../integrations/kyasshu';
import { tableActions } from '../table-slice';

export type GetTokenMetadataProps =
NSKyasshuUrl.GetNFTDetailsQueryParams;

export const getTokenMetadata = createAsyncThunk<
  void,
  GetTokenMetadataProps
>('table/getTokenMetadata', async ({ id }, { dispatch }) => {
  try {
    const response = await axios.get(
      KyasshuUrl.getNFTDetails({ id }),
    );
    dispatch(
      tableActions.setTableMetadata(
        response?.data?.metadata?.thumbnail?.value?.TextContent,
      ),
    );
  } catch (error) {
    console.log(error);
  }
});