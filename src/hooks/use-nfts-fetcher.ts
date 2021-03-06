/* eslint-disable  @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import JsonBigInt from 'json-bigint';

import { MetadataDesc, NFTMetadata } from '../declarations/legacy';
import { createActor } from '../integrations/actor';
import {
  useAppDispatch,
  nftsActions,
  notificationActions,
  LoadedNFTData,
} from '../store';
import { AppLog } from '../utils/log';

export const useNFTSFetcher = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    (async () => {
      // set loading NFTS state to true
      dispatch(nftsActions.setIsNFTSLoading(true));

      try {
        const actor = await createActor({
          serviceName: 'marketplace',
        });
        const allNFTS = await actor.totalSupply();

        // TODO: update promises with token
        const promises = [
          ...new Array(JsonBigInt.parse(allNFTS)),
        ].map((_, index) => {
          const tokenId = BigInt(index);
          return actor.getMetadata(tokenId);
        });
        const fetchedNFTS = await Promise.allSettled(promises);
        const nftsCount = 999;

        const loadedNFTList = fetchedNFTS.map((nft, index) => {
          const { Ok } = (nft as any).value;
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

          const metadata: NFTMetadata = {
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

        const loadedNFTS = {
          loadedNFTList,
        };

        // update store with loaded NFTS details
        dispatch(
          nftsActions.setLoadedNFTS(loadedNFTS as LoadedNFTData),
        );
      } catch (error) {
        AppLog.error(error);

        // set NFTS failed to load
        dispatch(
          notificationActions.setErrorMessage(
            t('translation:errorMessages.unableToFetchNFTS'),
          ),
        );
      }
    })();
  }, [dispatch]);
};
