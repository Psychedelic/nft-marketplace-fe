import { useEffect } from 'react';
import axios from 'axios';

import { useAppDispatch, nftsActions } from '../../store';

// TODO: use filters from redux store
const filters = {
  collection: 'vlhm2-4iaaa-aaaam-qaatq-cai',
  sort: 'lastModified',
  order: 'desc',
  page: '0',
  count: '25',
};

export const useNFTSFetcher = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchNFTS = async () => {
      // set loading NFTS state to true
      dispatch(nftsActions.setIsNFTSLoading(true));

      try {
        const response = await axios.get(
          `http://localhost:3000/dev/marketplace/${filters.collection}/nfts/${filters.sort}/${filters.order}/${filters.page}?count=${filters.count}`,
        );

        if (response.status !== 200) {
          throw Error(response.statusText);
        }

        const extractedNFTSList = response.data.map((nft: any) => {
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

        // update store with loaded NFTS details
        dispatch(nftsActions.setLoadedNFTS(extractedNFTSList));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(error);

        // set NFTS failed to load
        dispatch(nftsActions.setFailedToLoadNFTS(error.message));
      }
    };

    fetchNFTS();
  }, [dispatch, filters]);
};
