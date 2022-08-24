import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { nftsActions } from '../nfts-slice';
import {
  KyasshuUrl,
  NSKyasshuUrl,
} from '../../../../integrations/kyasshu';
import { notificationActions } from '../../notifications';
import { settingsActions } from '../../settings';
import { AppLog } from '../../../../utils/log';
import { isUnsupportedPage } from '../../../../utils/error';

export type GetNFTDetailsProps =
  NSKyasshuUrl.GetNFTDetailsQueryParams;

export const getNFTDetails = createAsyncThunk<
  void,
  GetNFTDetailsProps
>(
  'nfts/getNFTDetails',
  async ({ id, collectionId }, { dispatch }) => {
    try {
      const response = await axios.get(
        KyasshuUrl.getNFTDetails({ id, collectionId }),
      );

      if (response.status !== 200) {
        throw Error(response.statusText);
      }

      const responseData = response.data;

      const traits: any = {};

      responseData.metadata.properties.forEach((property: any) => {
        traits[`${property.name}`] = {
          name: property.value,
          occurance: null,
          rarity: null,
        };
      });

      const nftDetails = {
        // TODO: update price, lastOffer & traits values
        // TODO: Finalize object format after validating mock and kyasshu data
        id: responseData.index,
        name: 'Cap Crowns',
        price: responseData?.currentPrice,
        lastOffer: responseData?.lastOfferPrice,
        lastSale: responseData?.lastSalePrice,
        preview:
          responseData?.metadata?.thumbnail?.value?.TextContent,
        location: responseData?.url,
        rendered: true,
        traits: traits,
        owner: responseData?.owner,
        operator: responseData?.operator,
      };

      // TODO: If user connected to plug
      // Should verify the owner of current token id
      // e.g. if opted to verify on-chain the method is "ownerOf"
      // Should verify whether token is listed or not only if owner
      (nftDetails as any).isListed = false;

      // update store with loaded NFT details
      dispatch(nftsActions.setLoadedNFTDetails(nftDetails));
    } catch (error: any) {
      AppLog.error(error);

      if (isUnsupportedPage(error?.response)) {
        dispatch(settingsActions.setPageNotFoundStatus(true));

        return;
      }

      dispatch(
        notificationActions.setErrorMessage(
          'Oops! Unable to fetch NFT details',
        ),
      );
    }
  },
);
