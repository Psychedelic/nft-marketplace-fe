/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CardOptionsDropdown } from '../../dropdown';
import {
  CardContainer,
  CardWrapper,
  NFTCardOptions,
  Flex,
  OwnedCardText,
  NftDataHeader,
  LastOffer,
  NftDataText,
  PreviewDetails,
  VideoPlayer,
  PreviewImage,
  VideoLoader,
  MediaWrapper,
} from './styles';
import wicpLogo from '../../../../assets/wicpIcon.png';
import {
  BuyNowModal,
  MakeOfferModal,
  ConnectToPlugModal,
  SellModal,
} from '../../../modals';
import { usePlugStore } from '../../../../store';
import { parseE8SAmountToWICP } from '../../../../utils/formatters';

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
              price={
                (price && parseE8SAmountToWICP(BigInt(price))) || ''
              }
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
  const containerRef = useRef<HTMLDivElement>(null);

  // TODO: Move any status code as constant
  const isForSale = data.status === 'forSale';

  const setModalStatus = (status: boolean) => {
    setModalOpen(status);
  };

  return (
    <CardContainer type={modalOpen} ref={containerRef}>
      <CardWrapper>
        <RouterLink to={`/nft/${data.id}`}>
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
              // Next line is a validation for null value
              hoverTarget={containerRef.current || undefined}
            />
          </MediaWrapper>
          <Flex>
            <NftDataHeader>{data?.name}</NftDataHeader>
            <NftDataHeader>
              {isForSale ? `${t('translation:nftCard.price')}` : ''}
            </NftDataHeader>
          </Flex>
          <Flex>
            <NftDataText>{data?.id}</NftDataText>
            <NftDataText>
              {isForSale && (
                <>
                  <img src={wicpLogo} alt="" />
                  {parseE8SAmountToWICP(data?.price)}
                </>
              )}
            </NftDataText>
          </Flex>
        </RouterLink>
        <NFTCardOptions onClick={(e) => e.stopPropagation()}>
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
                  <b>{parseE8SAmountToWICP(data?.lastOffer)}</b>
                </>
              )
            }
          </LastOffer>
        </NFTCardOptions>
      </CardWrapper>
    </CardContainer>
  );
});
