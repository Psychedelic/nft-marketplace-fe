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
import {
  BuyNowModal,
  MakeOfferModal,
  ConnectToPlugModal,
  SellModal,
} from '../../../modals';
import { styled } from '../../../../stitches.config';
import { usePlugStore } from '../../../../store';

const NFTCardOptions = styled(OuterFlex, {
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

type ConnectedProps = {
  owned?: boolean;
  isForSale?: boolean;
  tokenId: string;
  price?: bigint;
  setModalStatus: (status: boolean) => void;
};

type DisconnectedProps = {
  isForSale?: boolean;
  setModalStatus: (status: boolean) => void;
};

const OnConnected = ({
  owned,
  isForSale,
  tokenId,
  price,
  setModalStatus,
}: ConnectedProps) => {
  const { t } = useTranslation();
  const showBuyerOptions = !owned;
  const showSellOptions = owned;

  return (
    <>
      {showSellOptions && (
        <div onClick={() => setModalStatus(true)} role="dialog">
          {(!isForSale && (
            <SellModal
              onClose={() => setModalStatus(false)}
              actionText={`${t('translation:nftCard.sell')}`}
              nftTokenId={tokenId}
            />
          )) || <span hidden-seller-options />}
        </div>
      )}
      {(showBuyerOptions && (
        <div onClick={() => setModalStatus(true)} role="dialog">
          {isForSale ? (
            <BuyNowModal
              onClose={() => setModalStatus(false)}
              actionText={`${t('translation:nftCard.forSale')}`}
              actionTextId={Number(tokenId)}
              price={price?.toString()}
            />
          ) : (
            <MakeOfferModal
              onClose={() => setModalStatus(false)}
              actionText={`${t('translation:nftCard.forOffer')}`}
              nftTokenId={tokenId}
            />
          )}
        </div>
      )) || <span hidden-buyer-options />}
    </>
  );
};

const OnDisconnected = ({
  isForSale,
  setModalStatus,
}: DisconnectedProps) => {
  const { t } = useTranslation();
  return (
    <div onClick={() => setModalStatus(true)} role="dialog">
      {isForSale ? (
        <ConnectToPlugModal
          actionText={`${t('translation:nftCard.forSale')}`}
        />
      ) : (
        <ConnectToPlugModal
          actionText={`${t('translation:nftCard.forOffer')}`}
        />
      )}
    </div>
  );
};

export const NftCard = React.memo(({ owned, data }: NftCardProps) => {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const { isConnected } = usePlugStore();
  // TODO: Move any status code as constant
  const isForSale = data.status === 'forSale';

  const setModalStatus = (status: boolean) => {
    setModalOpen(status);
  };

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
                <PreviewDetails>
                  <PreviewImage src={data?.preview} alt="nft-card" />
                </PreviewDetails>
              }
              loadingOverlay={<VideoLoader />}
            />
          </MediaWrapper>
          <PriceBar>
            <Flex>
              <NftText>{data?.name}</NftText>
              {/* TODO: Price should be in the translations intl */}
              <NftText>{isForSale && 'Price'}</NftText>
            </Flex>
            <Flex>
              <NftId>{data?.id}</NftId>
              <Dfinity>
                {isForSale && (
                  <>
                    <img src={wicpLogo} alt="" />
                    {data?.price}
                  </>
                )}
              </Dfinity>
            </Flex>
          </PriceBar>
        </CardWrapper>
      </RouterLink>
      <NFTCardOptions>
        {(isConnected && (
          <OnConnected
            owned={owned}
            isForSale={isForSale}
            tokenId={data.id}
            setModalStatus={setModalStatus}
            price={data?.price}
          />
        )) || (
          <OnDisconnected
            isForSale={isForSale}
            setModalStatus={setModalStatus}
          />
        )}
        <LastOffer>
          {
            // TODO: Have put lastOffer verification
            // because when not available the label text
            // is shown without the corresponding value...
            data?.lastOffer && (
              <>
                {!isForSale
                  ? `${t('translation:nftCard.offerFor')} `
                  : `${t('translation:nftCard.last')} `}
                <b>{data?.lastOffer}</b>
              </>
            )
          }
        </LastOffer>
      </NFTCardOptions>
    </CardContainer>
  );
});
