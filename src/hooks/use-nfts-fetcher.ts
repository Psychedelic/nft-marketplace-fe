/* eslint-disable  @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import JsonBigInt from 'json-bigint';

import { MetadataDesc } from '../declarations/nft';
import { createActor } from '../integrations/actor';
import { useAppDispatch, nftsActions } from '../store';

export const useNFTSFetcher = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      // set loading NFTS state to true
      dispatch(nftsActions.setIsNFTSLoading(true));

      try {
        const actor = await createActor();
        const allNFTS = await actor.totalSupplyDip721();

        // TODO: update promises with token
        const promises = [
          ...new Array(JsonBigInt.parse(allNFTS)),
        ].map((_, index) => {
          const tokenId = BigInt(index);
          return actor.getMetadataDip721(tokenId);
        });
        const fetchedNFTS = await Promise.allSettled(promises);
        const nftsCount = 999;

        const extractedNFTSList = fetchedNFTS.map((nft, index) => {
          const { Ok } = nft.value;
          const metadataDesc = (Ok as MetadataDesc)?.pop();
          const traits = metadataDesc?.key_val_data.reduce(
            (acc: any, curr) => {
              acc = {
                ...acc,
                [curr.key]: (curr as any).val?.TextContent,
              };

              return acc;
            },
            // eslint-disable-next-line
            {},
          );

          const metadata = {
            // TODO: update preview video URL, id, name, price
            id: `0${nftsCount - index}`,
            name: 'Cap Crowns',
            price: '5$',
            lastOffer: '5$',
            traits,
            rendered: (metadataDesc as any)?.purpose?.Rendered,
            preview: (metadataDesc as any)?.purpose?.Preview,
            location: `https://vzb3d-qyaaa-aaaam-qaaqq-cai.raw.ic0.app/0${
              nftsCount - index
            }.mp4`,
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
    })();
  }, [dispatch]);
};
