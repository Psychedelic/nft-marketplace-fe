import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CardOptionsDropdown } from '../../dropdown';
import {
  CardContainer,
  CardWrapper,
  OuterFlex,
  Flex,
  OwnedCardText,
  NftText,
  LastOffer,
  Dfinity,
  PreviewDetails,
  VideoPlayer,
  PreviewImage,
  VideoLoader,
  ActionText,
} from './styles';
import { NFTMetadata } from '../../../../declarations/nft';
import wicpLogo from '../../../../assets/wicpIcon.png';

export type NftCardProps = {
  owned?: boolean;
  notForSale?: boolean;
  forSaleAndOffer?: boolean;
  forSale?: boolean;
  data: NFTMetadata;
};

export const NftCard = React.memo(
  ({ owned, notForSale, forSaleAndOffer, data }: NftCardProps) => {
    const { t } = useTranslation();

    return (
      <CardContainer>
        <CardWrapper>
          <Flex>
            <OwnedCardText>
              {owned
                ? `${t('translation:nftCard.owned')}`
                : ''}
            </OwnedCardText>
            <CardOptionsDropdown data={data} />
          </Flex>
          <RouterLink to={`/nft/${data.id}`}>
            <VideoPlayer
              videoSrc={data.location}
              pausedOverlay={
                // eslint-disable-next-line react/jsx-wrap-multilines
                <PreviewDetails>
                  <PreviewImage src={data?.preview} alt="nft-card" />
                </PreviewDetails>
              }
              loadingOverlay={<VideoLoader />}
            />
            <Flex>
              <NftText>{data?.name}</NftText>
              <NftText>Price</NftText>
            </Flex>
            <Flex>
              {notForSale ? (
                ''
              ) : (
                <LastOffer>
                  {forSaleAndOffer
                    ? `${t('translation:nftCard.offerFor')} `
                    : `${t('translation:nftCard.last')} `}
                  <b>{data?.lastOffer}</b>
                </LastOffer>
              )}
              {notForSale ? (
                ''
              ) : (
                <Dfinity>
                  <img src={wicpLogo} alt="" />
                  {data?.price}
                </Dfinity>
              )}
            </Flex>
          </RouterLink>
        </CardWrapper>
        <OuterFlex>
          {data.status === 'forSale' ? (
            <ActionText>{`${t('translation:nftCard.forSale')}`}</ActionText>
          ) : (
            <ActionText>{`${t('translation:nftCard.forOffer')}`}</ActionText>
          )}
          {notForSale ? (
            ''
          ) : (
            <LastOffer>
              {forSaleAndOffer
                ? `${t('translation:nftCard.offerFor')} `
                : `${t('translation:nftCard.last')} `}
              <b>{data?.lastOffer}</b>
            </LastOffer>
          )}
        </OuterFlex>
      </CardContainer>
    );
  },
);
