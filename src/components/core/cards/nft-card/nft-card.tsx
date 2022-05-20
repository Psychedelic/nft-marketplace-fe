/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef } from 'react';
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
  PreviewCardVideo,
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
  disableVideo?: boolean;
  previewCardAmount?: string | number;
};

type ConnectedProps = {
  owned?: boolean;
  isForSale?: boolean;
  tokenId: string;
  price?: bigint;
};

type DisconnectedProps = {
  isForSale?: boolean;
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
}: ConnectedProps) => {
  const { t } = useTranslation();
  const showBuyerOptions = !owned;
  const showSellOptions = owned;

  return (
    <>
      {showSellOptions && (
        <div role="dialog">
          <SellModal
            actionText={`${t('translation:nftCard.sell')}`}
            nftTokenId={tokenId}
            isTriggerVisible={!isForSale}
          />

          <ChangePriceModal
            actionText={`${t('translation:nftCard.changePrice')}`}
            nftTokenId={tokenId}
            nftPrice={price}
            isTriggerVisible={isForSale}
          />
        </div>
      )}
      {(showBuyerOptions && (
        <div role="dialog">
          <BuyNowModal
            actionText={`${t('translation:nftCard.forSale')}`}
            actionTextId={Number(tokenId)}
            price={
              (price && parseE8SAmountToWICP(BigInt(price))) || ''
            }
            isTriggerVisible={isForSale}
          />
          <MakeOfferModal
            actionText={`${t('translation:nftCard.forOffer')}`}
            nftTokenId={tokenId}
            isTriggerVisible={!isForSale}
          />
        </div>
      )) || <span />}
    </>
  );
};

const OnDisconnected = ({ isForSale }: DisconnectedProps) => {
  const { t } = useTranslation();
  return (
    <div role="dialog">
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
  ({
    owned,
    data,
    previewCard = false,
    previewCardAmount,
    disableVideo,
  }: NftCardProps) => {
    const { t } = useTranslation();
    const { isConnected } = usePlugStore();
    const containerRef = useRef<HTMLDivElement>(null);

    // TODO: Move any status code as constant
    const isForSale = data.status === 'forSale';

    return (
      <CardContainer
        disableAnimation={previewCard}
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
              {/* eslint-disable-next-line no-nested-ternary */}
              {disableVideo ? (
                <PreviewDetails>
                  <PreviewImage src={data?.preview} alt="nft-card" />
                </PreviewDetails>
              ) : previewCard ? (
                <PreviewCardVideo
                  src={data.location}
                  poster={data?.preview}
                  autoPlay
                  loop
                />
              ) : (
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
              )}
            </MediaWrapper>
            <Flex>
              <NftDataHeader>{data?.name}</NftDataHeader>
              <NftDataHeader>
                {isForSale || previewCard
                  ? `${t('translation:nftCard.price')}`
                  : ''}
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
                {previewCard && (
                  <>
                    <img src={wicpLogo} alt="" />
                    <NumberTooltip>
                      {previewCardAmount || ''}
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
                  price={data?.price}
                />
              )) || <OnDisconnected isForSale={isForSale} />}
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
