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
  ActionDetails,
  NftDataText,
  PreviewDetails,
  VideoPlayer,
  PreviewImage,
  VideoLoader,
  MediaWrapper,
  ActionText,
  PriceInActionSheet,
} from './styles';
import wicpLogo from '../../../../assets/wicp.svg';
import {
  BuyNowModal,
  MakeOfferModal,
  ConnectToPlugModal,
  SellModal,
  ChangePriceModal,
} from '../../../modals';
import { usePlugStore } from '../../../../store';
import { parseE8SAmountToWICP } from '../../../../utils/formatters';
import { NFTActionStatuses } from '../../../../constants/common';
import { NumberTooltip } from '../../../number-tooltip';

export type NftCardProps = {
  owned?: boolean;
  // TODO: Data should have a well defined type def
  data: any;
  previewCard?: boolean;
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

type LastActionTakenDetailsProps = {
  // TODO: update data type whereever it's required
  data: any;
  isForSale?: boolean;
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
          {!isForSale ? (
            <SellModal
              onClose={() => setModalStatus(false)}
              actionText={`${t('translation:nftCard.sell')}`}
              nftTokenId={tokenId}
            />
          ) : (
            <ChangePriceModal
              onClose={() => setModalStatus(false)}
              actionText={`${t('translation:nftCard.editListing')}`}
              nftTokenId={tokenId}
              nftPrice={price}
            />
          )}
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
      )) || <span />}
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

const LastActionTakenDetails = ({
  data,
  isForSale,
}: LastActionTakenDetailsProps) => {
  const { t } = useTranslation();

  if (data?.lastActionTaken === NFTActionStatuses.Sold) {
    return (
      <ActionDetails>
        {data?.lastOffer && (
          <>
            <ActionText>
              {t('translation:nftCard.lastSale')}
            </ActionText>
            <PriceInActionSheet>
              {(data?.lastSale &&
                parseE8SAmountToWICP(
                  BigInt(data.lastSale),
                ).toString()) ||
                ''}
            </PriceInActionSheet>
          </>
        )}
      </ActionDetails>
    );
  }

  return (
    <ActionDetails>
      {data?.lastOffer && (
        <>
          <ActionText>
            {!isForSale
              ? `${t('translation:nftCard.offerFor')} `
              : `${t('translation:nftCard.last')} `}
          </ActionText>
          <PriceInActionSheet>
            {(data?.lastOffer &&
              parseE8SAmountToWICP(
                BigInt(data.lastOffer),
              ).toString()) ||
              ''}
          </PriceInActionSheet>
        </>
      )}
    </ActionDetails>
  );
};

export const NftCard = React.memo(
  ({ owned, data, previewCard }: NftCardProps) => {
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
      <CardContainer
        shouldAnimate={modalOpen || previewCard}
        ref={containerRef}
      >
        <CardWrapper>
          <RouterLink to={`/nft/${data.id}`} className="card-router">
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
                    <PreviewImage
                      src={data?.preview}
                      alt="nft-card"
                    />
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
                    <NumberTooltip>
                      {parseE8SAmountToWICP(data?.price)}
                    </NumberTooltip>
                  </>
                )}
              </NftDataText>
            </Flex>
          </RouterLink>
          {!previewCard && (
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
              <LastActionTakenDetails
                data={data}
                isForSale={isForSale}
              />
            </NFTCardOptions>
          )}
        </CardWrapper>
      </CardContainer>
    );
  },
);
