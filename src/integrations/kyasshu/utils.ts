/* eslint-disable  @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { filterActions, nftsActions, errorActions, useFilterStore } from '../../store';
import config from '../../config/env';
import { FILTER_CONSTANTS, OPERATION_CONSTANTS } from '../../constants';
import { tableActions } from '../../store/features/tables';

export type FetchNFTProps = {
  payload?: object;
  dispatch: any;
  sort: string;
  order: string;
  page: number;
  count: string;
};

export type FetchFilterTraitsProps = {
  dispatch: any;
};

export type FetchNFTDetailsProps = {
  dispatch: any;
  id: string;
};

export type CheckNFTOwnerParams = {
  isConnected: boolean;
  owner?: string;
  principalId?: string;
};

export type FetchCAPActivityProps = {
  dispatch: any;
};

export const fetchNFTS = async ({
  payload,
  dispatch,
  sort,
  order,
  page,
  count,
}: FetchNFTProps) => {
  // set loading NFTS state to true
  if (page === 0) {
    dispatch(nftsActions.setIsNFTSLoading(true));
  }

  try {
    // eslint-disable-next-line object-curly-newline

    const response = await axios.post(
      // eslint-disable-next-line max-len
      `${config.kyasshuMarketplaceAPI}/marketplace/${config.collectionId}/nfts/${sort}/${order}/${page}?count=${count}`,
      payload,
    );

    if (response.status !== 200) {
      throw Error(response.statusText);
    }

    const { data, pages, items } = response.data;

    // TODO: Define nft field types
    const extractedNFTSList = data.map((nft: any) => {
      const metadata = {
        // TODO: update price, lastOffer & traits values
        // TODO: Finalize object format after validating mock and kyasshu data
        id: nft.index,
        name: 'Cap Crowns',
        price: nft.lastSalePrice,
        lastOffer: nft.lastSalePrice,
        // TODO: update nft thumbnail
        preview: nft.url.replace(
          /\/(\w+)\.\w+/g,
          '/thumbnails/$1.png',
        ),
        location: nft?.url,
        traits: {
          base: nft?.metadata?.base?.value?.TextContent,
          biggem: nft?.metadata?.biggem?.value?.TextContent,
          rim: nft?.metadata?.rim?.value?.TextContent,
          smallgem: nft?.metadata?.smallgem?.value?.TextContent,
        },
        status: nft?.status,
        owner: nft?.owner,
      };
      return metadata;
    });

    const actionPayload = {
      loadedNFTList: extractedNFTSList,
      totalPages: pages ? parseInt(pages, 10) : 0,
      total: items ? parseInt(items, 10) : 0,
      nextPage: page + 1,
    };

    // update store with loaded NFTS details
    dispatch(nftsActions.setLoadedNFTS(actionPayload));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error);

    // set NFTS failed to load
    dispatch(errorActions.setErrorMessage(error.message));
  }
};

export const fetchNFTDetails = async ({
  dispatch,
  id,
}: FetchNFTDetailsProps) => {
  try {
    // eslint-disable-next-line object-curly-newline
    const payload = {};

    const response = await axios.get(
      `${config.kyasshuMarketplaceAPI}/marketplace/${config.collectionId}/nft/${id}`,
    );

    if (response.status !== 200) {
      throw Error(response.statusText);
    }

    const responseData = response.data;

    const nftDetails = {
      // TODO: update price, lastOffer & traits values
      // TODO: Finalize object format after validating mock and kyasshu data
      id: responseData.index,
      name: 'Cap Crowns',
      price: responseData?.lastSalePrice,
      lastOffer: responseData?.lastOfferPrice,
      // TODO: update nft thumbnail
      preview: '',
      location: responseData?.url,
      rendered: true,
      traits: {
        base: responseData?.metadata?.base?.value?.TextContent,
        biggem: responseData?.metadata?.biggem?.value?.TextContent,
        rim: responseData?.metadata?.rim?.value?.TextContent,
        smallgem:
          responseData?.metadata?.smallgem?.value?.TextContent,
      },
      owner: responseData?.owner,
    };

    // TODO: If user connected to plug
    // Should verify the owner of current token id
    // e.g. if opted to verify on-chain the method is "ownerOf"
    // Should verify whether token is listed or not only if owner
    nftDetails.isListed = false;

    // update store with loaded NFT details
    dispatch(nftsActions.setLoadedNFTDetails(nftDetails));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error);
    dispatch(errorActions.setErrorMessage(error.message));
  }
};

export const fetchFilterTraits = async ({ dispatch } : FetchFilterTraitsProps) => {
  try {
    const response = await axios.get(`${config.kyasshuMarketplaceAPI}/marketplace/${config.collectionId}/traits`);

    if (response.status !== 200) {
      throw Error(response.statusText);
    }

    const responseData = response.data.map((res) => {
      let key;
      switch (res.name) {
        case 'smallgem':
          key = FILTER_CONSTANTS.smallGem;
          break;
        case 'biggem':
          key = FILTER_CONSTANTS.bigGem;
          break;
        case 'base':
          key = FILTER_CONSTANTS.base;
          break;
        case 'rim':
          key = FILTER_CONSTANTS.rim;
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
  } catch (error) {
    console.log(error);
  }
};

export const useTraitsPayload = () => {
  const { traits } = useFilterStore();

  return traits.filter(
    (trait) => trait?.values?.length,
  );
};

export const usePriceValues = () => {
  const { t } = useTranslation();
  const { defaultFilters } = useFilterStore();

  return defaultFilters.find(
    ({ filterCategory }) => filterCategory === `${t('translation:filters.priceRange')}`,
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

export const parseTime = (dateParam: string) => {
  if (!dateParam) {
    return null;
  }

  const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
  const today = new Date();
  const seconds = Math.round((today - date) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);
  const weeks = Math.round(days / 7);
  const months = Math.round(weeks / 4);
  const years = Math.round(months / 12);

  if (seconds < 5) {
    return 'now';
    // eslint-disable-next-line no-else-return
  } else if (months > 11) {
    return `${years} ${years === 1 ? 'year' : 'years'} ago`;
  } else if (weeks > 4) {
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  } else if (days > 6) {
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  } else if (hours > 23) {
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  } else if (minutes > 60) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (seconds < 60) {
    return `${seconds} seconds ago`;
  }

  return '';
};

export const getOperation = (operationType: string) => {
  let operationValue;
  switch (operationType) {
    case 'makeSaleOffer':
      operationValue = OPERATION_CONSTANTS.list;
      break;
    case 'acceptBuyOffer':
      operationValue = OPERATION_CONSTANTS.sale;
      break;
    case 'makeBuyOffer':
      operationValue = OPERATION_CONSTANTS.offer;
      break;
    default:
  }
  return operationValue;
};

export const fetchCAPActivity = async ({ dispatch }: FetchCAPActivityProps) => {
  try {
    const response = await axios.get(`${config.kyasshuMarketplaceAPI}/cap/txns/q3fc5-haaaa-aaaaa-aaahq-cai`);
    const { Items } = response.data;

    const result = Items.map((item) => {
      const capData = {
        operation: getOperation(item.event.operation),
        time: parseTime(item.event.time),
      };
      const { details } = item.event;
      details.forEach((detail) => {
        const [key, value] = detail;
        capData[key] = value.U64 ?? value;
      });
      return capData;
    });

    console.log('result', result);
    dispatch(tableActions.setCapActivityTable(result));
  } catch (error) {
    console.log(error);
  }
};
