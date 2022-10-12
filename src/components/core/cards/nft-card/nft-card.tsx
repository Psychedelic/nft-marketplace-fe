/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
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
  ActionText,
  PriceInActionSheet,
  RouterLink,
  MediaWrapper,
  PreviewDetails,
  NameCardBg,
  NameCardContainer,
  NameCardCollection,
  NameCardTitle,
} from './styles';
import wicpLogo from '../../../../assets/wicp.svg';
import {
  BuyNowModal,
  MakeOfferModal,
  ConnectToPlugModal,
  SellModal,
  ChangePriceModal,
} from '../../../modals';
import {
  usePlugStore,
  CurrentCollectionDetails,
} from '../../../../store';
import { parseE8SAmountToWICP } from '../../../../utils/formatters';
import { NFTActionStatuses } from '../../../../constants/common';
import { NumberTooltip } from '../../../number-tooltip';
import { Media } from './media';
import { isOperatorMarketplace } from '../../../../utils/nfts';
import { generateImgFromText } from '../../../../utils/image-generator';
// TODO: replace ICNS logo dynamically
import icnsLogo from '../../../../assets/ICNS-logo.svg';

export type NftCardProps = {
  owned?: boolean;
  // TODO: Data should have a well defined type def
  data: any;
  previewCard?: boolean;
  previewCardAmount?: string | number;
  collectionDetails?: CurrentCollectionDetails;
};

type ConnectedProps = {
  owned?: boolean;
  isForSale?: boolean;
  tokenId: string;
  price?: bigint;
  operator?: string;
  marketplaceId?: string;
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
  operator,
  marketplaceId,
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
            actionText={`${t('translation:nftCard.listed')}`}
            actionTextId={Number(tokenId)}
            price={
              (price && parseE8SAmountToWICP(BigInt(price))) || ''
            }
            isTriggerVisible={isForSale}
            isNFTOperatedByMKP={isOperatorMarketplace({
              operator,
              marketplaceId,
            })}
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
          actionText={`${t('translation:nftCard.listed')}`}
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
        {data?.lastSale && (
          <>
            <ActionText>
              {t('translation:nftCard.lastSale')}
            </ActionText>
            <PriceInActionSheet>
              {(data?.lastSale?.price &&
                parseE8SAmountToWICP(
                  BigInt(data.lastSale.price),
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
    collectionDetails,
  }: NftCardProps) => {
    const { t } = useTranslation();
    const { isConnected } = usePlugStore();
    const navigate = useNavigate();
    const { collectionId } = useParams();
    const containerRef = useRef<HTMLDivElement>(null);

    const isForSale = data.status === NFTActionStatuses.ForSale;

    // For NFT which do not have a thumbnail
    // we generate a generated version
    const hasThumbnailMedia = data?.location;
    const hasTraitName = data?.traits?.name;

    return (
      <CardContainer
        ref={containerRef}
        role="link"
        tabIndex={0}
        onKeyDown={(event: any) => {
          // Keyboard accessibility
          if (event.keyCode === 13)
            navigate(`/${collectionId}/nft/${data.id}`);
        }}
      >
        <CardWrapper>
          <RouterLink
            to={`/${collectionId}/nft/${data.id}`}
            className="card-router"
            previewCard={previewCard}
            tabIndex={-1}
          >
            <Flex>
              <OwnedCardText>
                {owned ? `${t('translation:nftCard.owned')}` : ''}
              </OwnedCardText>
              {!previewCard && <CardOptionsDropdown data={data} />}
            </Flex>
            {hasThumbnailMedia ? (
              <Media
                containerRef={containerRef}
                location={data?.location}
                preview={data?.preview}
                previewCard={previewCard}
              />
            ) : (
              // TODO: Replace with correct changes either in <Media> component
              // which should support Video or Static image, not just video
              // at the moment styled using gradient colors
              <MediaWrapper>
                <PreviewDetails>
                  <NameCardBg>
                    <NameCardContainer>
                      <NameCardCollection
                        src={icnsLogo}
                        alt="collection-logo"
                      />
                      <NameCardTitle>
                        {data?.traits?.name}
                      </NameCardTitle>
                    </NameCardContainer>
                  </NameCardBg>
                </PreviewDetails>
              </MediaWrapper>
            )}
            <Flex>
              <NftDataHeader>{data?.name}</NftDataHeader>
              <NftDataHeader>
                {isForSale || previewCard
                  ? `${t('translation:nftCard.price')}`
                  : ''}
              </NftDataHeader>
            </Flex>
            <Flex>
              <NftDataText icnsCard={hasTraitName ? true : false}>
                {hasTraitName ?? `#${data?.id}`}
              </NftDataText>
              <NftDataText>
                {isForSale && !previewCard && (
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
                  operator={data?.operator}
                  marketplaceId={collectionDetails?.marketplaceId}
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
