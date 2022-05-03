import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Principal } from '@dfinity/principal';
import { useTranslation } from 'react-i18next';
import {
  filterActions,
  notificationActions,
  useFilterStore,
} from '../../store';
import config from '../../config/env';
import { FilterConstants, OperationConstants } from '../../constants';
import { tableActions } from '../../store/features/tables';
import { dateRelative } from '../functions/date';
import shortAddress from '../functions/short-address';
import { getICAccountLink } from '../../utils/account-id';
import { CapActivityParams } from '../../store/features/tables/table-slice';

export type FetchFilterTraitsProps = {
  dispatch: any;
};

export type CheckNFTOwnerParams = {
  isConnected: boolean;
  owner?: string;
  principalId?: string;
};

export type FetchCAPActivityProps = {
  dispatch: any;
  pageCount: number;
};

export type TokenMetadataProps = {
  dispatch: any;
  tokenId: any;
};

export const fetchFilterTraits = async ({
  dispatch,
}: FetchFilterTraitsProps) => {
  try {
    const response = await axios.get(
      `${config.kyasshuMarketplaceAPI}/marketplace/${config.collectionId}/traits`,
    );
    if (response.status !== 200) {
      throw Error(response.statusText);
    }

    const responseData = response.data.map((res: any) => {
      let key;
      switch (res.name) {
        case 'smallgem':
          key = FilterConstants.smallGem;
          break;
        case 'biggem':
          key = FilterConstants.bigGem;
          break;
        case 'base':
          key = FilterConstants.base;
          break;
        case 'rim':
          key = FilterConstants.rim;
          break;
        default:
      }

      const data = {
        key,
        name: res.name,
        values: [...res.values],
      };

      return data;
    });

    dispatch(filterActions.getAllFilters(responseData));
    dispatch(filterActions.setIsFilterTraitsLoading(false));
  } catch (error) {
    console.log(error);
  }
};

export const useTraitsPayload = () => {
  const { traits } = useFilterStore();

  return traits.filter((trait) => trait?.values?.length);
};

export const usePriceValues = () => {
  const { t } = useTranslation();
  const { defaultFilters } = useFilterStore();

  return defaultFilters.find(
    ({ filterCategory }) =>
      filterCategory === `${t('translation:filters.priceRange')}`,
  )?.filterName;
};

export const isNFTOwner = (params: CheckNFTOwnerParams) => {
  const { isConnected, owner, principalId } = params;

  if (!isConnected) return false;

  if (!owner) return false;

  if (!principalId) return false;

  if (owner !== principalId) return false;

  return true;
};

export const getOperation = (operationType: string) => {
  let operationValue;
  switch (operationType) {
    case 'makeSaleOffer':
      operationValue = OperationConstants.list;
      break;
    case 'acceptBuyOffer':
      operationValue = OperationConstants.sale;
      break;
    case 'makeOffer':
      operationValue = OperationConstants.offer;
      break;
    default:
  }
  return operationValue;
};

export const getTokenMetadata = async ({
  tokenId,
  dispatch,
}: TokenMetadataProps) => {
  try {
    const response = await axios.get(
      `${config.kyasshuMarketplaceAPI}/marketplace/${config.collectionId}/nft/${tokenId}`,
    );
    dispatch(
      tableActions.setTableMetadata(
        response?.data?.metadata?.thumbnail?.value?.TextContent,
      ),
    );
  } catch (error) {
    console.log(error);
  }
};

export const fetchCAPActivity = createAsyncThunk(
  'table/fetchCAPActivity',
  async (params: CapActivityParams, thunkAPI) => {
    const { pageCount } = params;
    if (pageCount === 0) {
      thunkAPI.dispatch(tableActions.setIsTableDataLoading(true));
    }

    try {
      const response = await axios.get(
        `${config.kyasshuMarketplaceAPI}/cap/txns/q3fc5-haaaa-aaaaa-aaahq-cai/?page=${pageCount}`,
      );
      const { Items, Count } = response.data;
      let pageNo;

      const result = Items.map((item: any) => {
        pageNo = item.page;
        const parsedArr = Uint8Array.from(
          // eslint-disable-next-line no-underscore-dangle
          Object.values(item.event.caller._arr),
        );
        const callerPrincipalId = Principal.fromUint8Array(parsedArr);
        const callerPrincipalIdString = shortAddress(
          callerPrincipalId.toText(),
        );

        const capData = {
          operation: getOperation(item.event.operation),
          time: dateRelative(item.event.time),
          caller: callerPrincipalIdString,
          callerDfinityExplorerUrl: getICAccountLink(
            callerPrincipalId.toText(),
          ),
        };

        const { details } = item.event;
        details.forEach((detail: any) => {
          const [key, value] = detail;
          (capData as any)[key] = value.U64 ?? value;
        });

        return capData;
      });

      const loadedCapActivityTableData = result.map(
        (tableData: any) => {
          const data = {
            item: {
              name: `CAP Crowns #${tableData.token_id}`,
              token_id: tableData.token_id,
            },
            type: tableData.operation,
            price: `$${tableData.list_price ?? tableData.price}`,
            from: tableData.caller,
            to: '-',
            time: tableData.time,
            offerFrom: 'Prasanth',
            callerDfinityExplorerUrl:
              tableData.callerDfinityExplorerUrl,
          };

          return data;
        },
      );

      const actionPayload = {
        loadedCapActivityTableData,
        totalPages: pageNo ? parseInt(pageNo, 10) : 0,
        total: Count ? parseInt(Count, 10) : 0,
        nextPage: Count === 64 ? pageCount + 1 : pageCount,
      };

      thunkAPI.dispatch(
        tableActions.setCapActivityTable(actionPayload),
      );
    } catch (error) {
      thunkAPI.dispatch(
        notificationActions.setErrorMessage((error as Error).message),
      );
    }
  },
);
