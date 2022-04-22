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

const PriceBar = styled('div', {
  minHeight: '28px',
  padding: '0 5px',

  '& > div:first-child': {
    padding: 0,
  },
});

export type NftCardProps = {
  owned?: boolean;
  // TODO: Data should have a well defined type def
  data: any;
};

export const NftCard = React.memo(
  ({ owned, data }: NftCardProps) => {
    const { t } = useTranslation();
    const [modalOpen, setModalOpen] = useState(false);
    const showBuyerOptions = !owned;
    // TODO: Move any status code as constant
    const isForSale = data.status === 'forSale';

    console.log('[debug] data.status', data.status);

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
            <PriceBar>
              <Flex>
                <NftText>{data?.name}</NftText>
                {/* TODO: Price should be in the translations intl */}
                <NftText>{isForSale && 'Price' }</NftText>
              </Flex>
              <Flex>
                <NftId>{data?.id}</NftId>
                <Dfinity>
                  {
                    isForSale && (
                      <>
                        <img src={wicpLogo} alt="" />
                        { data?.price }
                      </>
                    )
                  }
                </Dfinity>
              </Flex>
            </PriceBar>
          </CardWrapper>
        </RouterLink>
        <BuyerOptions>
          {
            (showBuyerOptions && (
              <div onClick={() => setModalOpen(true)} role="dialog">
                {
                  isForSale ? (
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
              // TODO: Have put lastOffer verification
              // because when not available the label text
              // is shown without the corresponding value...
              data?.lastOffer && (
                <>
                  {
                    !isForSale
                      ? `${t('translation:nftCard.offerFor')} `
                      : `${t('translation:nftCard.last')} `
                  }
                  <b>{data?.lastOffer}</b>
                </>
              )
            }
          </LastOffer>
        </BuyerOptions>
      </CardContainer>
    );
  },
);
