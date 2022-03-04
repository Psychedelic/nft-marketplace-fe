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
        const promises = [
          ...new Array(JsonBigInt.parse(allNFTS)),
        ].map((_, index) => {
          const tokenId = BigInt(index);
          return actor.getMetadataDip721(tokenId);
        });
        const fetchedNFTS = await Promise.allSettled(promises);

        const extractedNFTList = fetchedNFTS.map((nft) => {
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
            id: traits.location.split('/')[3].split('.')[0],
            traits,
            rendered: (metadataDesc as any)?.purpose?.Rendered,
            preview: (metadataDesc as any)?.purpose?.Preview,
            location: `https://vzb3d-qyaaa-aaaam-qaaqq-cai.raw.ic0.app/${
              traits.location.split('/')[3].split('.')[0]
            }.mp4`,
          };
          return metadata;
        });
        // eslint-disable-next-line no-console
        console.log(extractedNFTList, 'extractedNFTList');
        dispatch(nftsActions.setIsNFTSLoading(false));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(error);
        // set loading NFTS state to false on error
        dispatch(nftsActions.setIsNFTSLoading(false));
      }
    })();
  }, []);
};
