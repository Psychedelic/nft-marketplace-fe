import React, { useState } from 'react';
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
  NftId,
  MediaWrapper,
} from './styles';
import { NFTMetadata } from '../../../../declarations/nft';
import wicpLogo from '../../../../assets/wicpIcon.png';
import { BuyNowModal, MakeOfferModal } from '../../../modals';

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
    const [modalOpen, setModalOpen] = useState(false);

    return (
      <CardContainer type={modalOpen}>
        <RouterLink to={`/nft/${data.id}`}>
          <CardWrapper>
            <Flex>
              <OwnedCardText>
                {owned ? `${t('translation:nftCard.owned')}` : ''}
              </OwnedCardText>
              <CardOptionsDropdown data={data} />
            </Flex>
            <MediaWrapper>
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
            </MediaWrapper>
            <Flex>
              <NftText>{data?.name}</NftText>
              <NftText>Price</NftText>
            </Flex>
            <Flex>
              {notForSale ? (
                ''
              ) : (
                <NftId>
                  {data?.id}
                </NftId>
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
          </CardWrapper>
        </RouterLink>
        <OuterFlex>
          {/* eslint-disable-next-line */}
          <div onClick={() => setModalOpen(true)}>
            {data.status === 'forSale' ? <BuyNowModal onClose={() => setModalOpen(false)} /> : <MakeOfferModal onClose={() => setModalOpen(false)} />}
          </div>
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
