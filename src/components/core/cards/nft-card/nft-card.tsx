import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CardOptionsDropdown } from '../../dropdown';
import {
  CardWrapper,
  Flex,
  OwnedCardText,
  NftName,
  NftId,
  LastOffer,
  Dfinity,
  PreviewDetails,
} from './styles';

import { NFTMetadata } from '../../../../declarations/nft';
import wicpLogo from '../../../../assets/wicpIcon.png';

export type NftCardProps = {
  owned?: boolean;
  notForSale?: boolean;
  forSaleAndOffer?: boolean;
  forSale?: boolean;
  data: NFTMetadata;
  displayVideo?: boolean;
};

export const NftCard = ({
  owned,
  notForSale,
  forSaleAndOffer,
  data,
  displayVideo,
}: NftCardProps) => {
  const { t } = useTranslation();

  return (
    <RouterLink to={`/nft/${data.id}`}>
      <CardWrapper>
        <Flex>
          <OwnedCardText>
            {owned ? `${t('translation:nftCard.owned')}` : ''}
          </OwnedCardText>
          <CardOptionsDropdown />
        </Flex>
        <PreviewDetails>
          {data.preview && !displayVideo ? (
            <img src={data?.preview} alt="nft-card" />
          ) : (
            <video
              data-icon-video
              loop
              autoPlay
              muted
              style={{
                width: '100%',
                minHeight: '125px',
                borderRadius: '14px',
              }}
            >
              <source src={data.location} type="video/mp4" />
            </video>
          )}
        </PreviewDetails>
        <Flex>
          <NftName>{data?.name}</NftName>
          {notForSale ? (
            ''
          ) : (
            <Dfinity>
              {data?.price}
              <img src={wicpLogo} alt="" />
            </Dfinity>
          )}
        </Flex>

        <Flex>
          <NftId>{data?.id}</NftId>
          {notForSale ? (
            ''
          ) : (
            <LastOffer>
              {forSaleAndOffer ? 'Offer for ' : 'Last '}
              <b>{data?.lastOffer}</b>
            </LastOffer>
          )}
        </Flex>
      </CardWrapper>
    </RouterLink>
  );
};
