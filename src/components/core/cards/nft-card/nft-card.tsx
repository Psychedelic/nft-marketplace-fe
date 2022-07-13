/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
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
import { Media } from './media';
import { isOperatorMarketplace } from '../../../../utils/nfts';
import useMediaQuery from '../../../../hooks/use-media-query';

export type NftCardProps = {
  owned?: boolean;
  // TODO: Data should have a well defined type def
  data: any;
  previewCard?: boolean;
  previewCardAmount?: string | number;
};

type ConnectedProps = {
  owned?: boolean;
  isForSale?: boolean;
  tokenId: string;
  price?: bigint;
  operator?: string;
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
            isNFTOperatedByMKP={isOperatorMarketplace({ operator })}
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
        {data?.lastSale && (
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
  }: NftCardProps) => {
    const { t } = useTranslation();
    const { isConnected } = usePlugStore();
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);
    const isMobileScreen = useMediaQuery('(max-width: 850px)');

    // TODO: Move any status code as constant
    const isForSale = data.status === 'forSale';

    return (
      <CardContainer
        ref={containerRef}
        role="link"
        tabIndex={0}
        onKeyDown={(event: any) => {
          // Keyboard accessibility
          if (event.keyCode === 13) navigate(`/nft/${data.id}`);
        }}
      >
        <CardWrapper>
          <RouterLink
            to={`/nft/${data.id}`}
            className="card-router"
            previewCard={previewCard}
            tabIndex={-1}
          >
            {!isMobileScreen && (
              <Flex>
                <OwnedCardText>
                  {owned ? `${t('translation:nftCard.owned')}` : ''}
                </OwnedCardText>
                {!previewCard && <CardOptionsDropdown data={data} />}
              </Flex>
            )}
            <Media
              containerRef={containerRef}
              location={data?.location}
              preview={data?.preview}
              previewCard={previewCard}
            />
            <Flex>
              <NftDataHeader>{data?.name}</NftDataHeader>
              <NftDataHeader>
                {isForSale || previewCard
                  ? `${t('translation:nftCard.price')}`
                  : ''}
              </NftDataHeader>
            </Flex>
            <Flex>
              <NftDataText>#{data?.id}</NftDataText>
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
