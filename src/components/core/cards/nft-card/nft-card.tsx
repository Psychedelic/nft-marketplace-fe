/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
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
import wicpLogo from '../../../../assets/wicpIcon.png';
import { BuyNowModal, MakeOfferModal } from '../../../modals';
import { styled } from '../../../../stitches.config';

const BuyerOptions = styled(OuterFlex, {
  minHeight: '28px',
});

export type NftCardProps = {
  owned?: boolean;
  forSaleAndOffer?: boolean;
  forSale?: boolean;
  // TODO: Data should have a well defined type def
  data: any;
};

export const NftCard = React.memo(
  ({ owned, forSale, forSaleAndOffer, data }: NftCardProps) => {
    const { t } = useTranslation();
    const [modalOpen, setModalOpen] = useState(false);
    const showBuyerOptions = !owned;

    console.log('[debug] nft-card.tsx: data:', data);

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
                    <PreviewImage
                      src={data?.preview}
                      alt="nft-card"
                    />
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
              {
                forSale && (
                  <>
                    <NftId>{data?.id}</NftId>
                    <Dfinity>
                      <img src={wicpLogo} alt="" />
                      {data?.price}
                    </Dfinity>
                  </>
                )
              }
            </Flex>
          </CardWrapper>
        </RouterLink>
        <BuyerOptions>
          {
            (showBuyerOptions && (
              <div onClick={() => setModalOpen(true)} role="dialog">
                {
                  data.status === 'forSale' ? (
                    <BuyNowModal
                      onClose={() => setModalOpen(false)}
                      actionText={`${t('translation:nftCard.forSale')}`}
                      actionTextId={Number(data.id)}
                    />
                  ) : (
                    <MakeOfferModal
                      onClose={() => setModalOpen(false)}
                      actionText={`${t('translation:nftCard.forOffer')}`}
                    />
                  )
                }
              </div>
            )) || <span hidden-buyer-options />
          }
          <LastOffer>
            {
              forSaleAndOffer
                ? `${t('translation:nftCard.offerFor')} `
                : `${t('translation:nftCard.last')} `
            }
            <b>{data?.lastOffer}</b>
          </LastOffer>
        </BuyerOptions>
      </CardContainer>
    );
  },
);
