/* eslint-disable  @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { nftsActions } from '../../store';
import config from '../../config/env';

export type FetchNFTProps = {
  dispatch: any;
  sort: string;
  order: string;
  page: number;
  count: string;
};

export type FetchNFTDetailsProps = {
  dispatch: any;
  id: string;
};

export const fetchNFTS = async ({
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
    const payload = {};

    const response = await axios.post(
      // eslint-disable-next-line max-len
      `http://localhost:3000/dev/marketplace/${config.collectionId}/nfts/${sort}/${order}/${page}?count=${count}`,
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
        preview: false,
        location: nft?.url,
        traits: {
          base: nft?.metadata?.base?.value?.TextContent,
          biggem: nft?.metadata?.biggem?.value?.TextContent,
          rim: nft?.metadata?.rim?.value?.TextContent,
          smallgem: nft?.metadata?.smallgem?.value?.TextContent,
        },
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
    dispatch(nftsActions.setFailedToLoadNFTS(error.message));
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
      `http://localhost:3000/dev/marketplace/${config.collectionId}/nft/${id}`,
    );

    if (response.status !== 200) {
      throw Error(response.statusText);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error);
  }
};
