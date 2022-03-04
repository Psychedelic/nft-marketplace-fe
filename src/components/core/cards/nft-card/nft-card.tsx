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
  Image,
  Video,
} from './styles';

export type NftCardProps = {
  owned?: boolean;
  notForSale?: boolean;
  forSaleAndOffer?: boolean;
  forSale?: boolean;
  data?;
  displayVideo: boolean;
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
    <RouterLink to="/nft/2713">
      <CardWrapper>
        <Flex>
          <OwnedCardText>
            {owned ? `${t('translation:nftCard.owned')}` : ''}
          </OwnedCardText>
          <CardOptionsDropdown />
        </Flex>
        {displayVideo ? (
          <Video
            loop
            autoPlay
            muted
            preload="metadata"
            controls={false}
            poster="/assets/random-crown.png"
          >
            <source
              src="https://vqcq7-gqaaa-aaaam-qaara-cai.raw.ic0.app/9791.mp4"
              type="video/mp4"
            />
          </Video>
        ) : (
           <Image>
            <img src={data?.nftImage} alt="nft-card" />
           </Image>
        )}
        <Flex>
          <NftName>{data?.nftName}</NftName>
          {notForSale ? (
            ''
          ) : (
            <Dfinity>
              {data?.dfinityValue}
              <img src={data?.dfintiyIcon} alt="" />
            </Dfinity>
          )}
        </Flex>

        <Flex>
          <NftId>{data?.nftId}</NftId>
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
