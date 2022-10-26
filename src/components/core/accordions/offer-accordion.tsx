import React, { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as Accordion from '@radix-ui/react-accordion';
import {
  usePlugStore,
  RootState,
  useAppDispatch,
  marketplaceActions,
} from '../../../store';
import {
  AccordionStyle,
  AccordionTrigger,
  AccordionContent,
  AccordionHead,
  PlugButtonWrapper,
  UndefinedPrice,
  ButtonListWrapper,
  ButtonDetailsWrapper,
  PriceWrapper,
  CurrentPriceWrapper,
  LogoWrapper,
  OfferLabel,
  OfferPrice,
  MarketPrice,
  ItemCount,
} from './styles';
import { NFTOffersTable } from '../../tables';
import { Plug } from '../../plug';
import { getCurrentMarketPrice } from '../../../integrations/marketplace/price.utils';

import {
  BuyNowModal,
  MakeOfferModal,
  CancelOfferModal,
} from '../../modals';
import { isNFTOwner } from '../../../integrations/kyasshu/utils';
import { PlugStatusCodes } from '../../../constants/plug';
import { Icon } from '../../icons';
import wicpIcon from '../../../assets/wicp.svg';
import { OffersTableItem } from '../../../declarations/legacy';
import {
  parseE8SAmountToWICP,
  formatPriceValue,
} from '../../../utils/formatters';
import {
  isTokenId,
  isOperatorMarketplace,
} from '../../..//utils/nfts';

export type OfferAccordionProps = {
  lastSalePrice?: string;
  isListed?: boolean;
  owner?: string;
  showNFTActionButtons: boolean;
  operator?: string;
  isMobileScreen?: boolean;
};

type ConnectedProps = {
  isListed?: boolean;
  isOwner?: boolean;
  price?: string;
  showNFTActionButtons: boolean;
  operator?: string;
  isMobileScreen?: boolean;
};

type DisconnectedProps = {
  connectionStatus: string;
};

type OfferAccordionHeaderProps = {
  isListed?: boolean;
  lastSalePrice?: string;
  owner?: string;
  showNFTActionButtons: boolean;
  operator?: string;
  isMobileScreen: boolean | undefined;
};

// TODO: move OnConnected component to seperate file
// to avoid more no of lines of code in a single file
export const OnConnected = ({
  isListed,
  isOwner,
  price,
  showNFTActionButtons,
  operator,
}: ConnectedProps) => {
  const { id, collectionId } = useParams();
  const dispatch = useAppDispatch();
  const [loadingOffers, setLoadingOffers] = useState<boolean>(true);
  const { principalId: plugPrincipalId } = usePlugStore();

  const recentlyMadeOffers = useSelector(
    (state: RootState) => state.marketplace.recentlyMadeOffers,
  );

  const recentlyCancelledOffers = useSelector(
    (state: RootState) => state.marketplace.recentlyCancelledOffers,
  );

  const nftOffers = useSelector(
    (state: RootState) => state.marketplace.nftOffers,
  );

  const userMadeOffer: OffersTableItem = useMemo(
    () =>
      nftOffers.find(
        (offer: OffersTableItem) =>
          offer?.fromDetails?.address === plugPrincipalId &&
          offer?.item?.tokenId.toString() === id,
      ),
    [id, nftOffers, plugPrincipalId],
  );

  const collectionDetails = useSelector(
    (state: RootState) => state.marketplace.currentCollectionDetails,
  );

  useEffect(() => {
    // TODO: handle the error gracefully when there is no id
    if (!id || !collectionId || !plugPrincipalId) return;

    dispatch(
      marketplaceActions.getNFTOffers({
        id,
        collectionId,

        onSuccess: () => {
          setLoadingOffers(false);
        },

        onFailure: () => {
          // TODO: handle failure messages
        },
      }),
    );
  }, [
    id,
    dispatch,
    plugPrincipalId,
    recentlyMadeOffers,
    recentlyCancelledOffers,
  ]);

  const showNonOwnerButtons = !isOwner && showNFTActionButtons;

  return (
    <ButtonListWrapper>
      <ButtonDetailsWrapper
        isTriggerVisible={showNonOwnerButtons && isListed}
      >
        <BuyNowModal
          price={price?.toString()}
          isTriggerVisible={showNonOwnerButtons && isListed}
          isNFTOperatedByMKP={isOperatorMarketplace({
            operator,
            marketplaceId: collectionDetails?.marketplaceId,
          })}
        />
      </ButtonDetailsWrapper>
      <ButtonDetailsWrapper
        isTriggerVisible={Boolean(
          showNonOwnerButtons && !loadingOffers && !userMadeOffer,
        )}
      >
        <MakeOfferModal
          isNFTListed={isListed}
          isTriggerVisible={Boolean(
            showNonOwnerButtons && !loadingOffers && !userMadeOffer,
          )}
        />
      </ButtonDetailsWrapper>
      <ButtonDetailsWrapper
        isTriggerVisible={Boolean(
          showNonOwnerButtons && !loadingOffers && userMadeOffer,
        )}
      >
        <MakeOfferModal
          isOfferEditing
          isNFTListed={isListed}
          offerPrice={userMadeOffer?.price}
          isTriggerVisible={Boolean(
            showNonOwnerButtons && !loadingOffers && userMadeOffer,
          )}
        />
      </ButtonDetailsWrapper>
      {showNonOwnerButtons && !loadingOffers && userMadeOffer && (
        <ButtonDetailsWrapper
          isTriggerVisible={Boolean(
            showNonOwnerButtons && !loadingOffers && userMadeOffer,
          )}
        >
          <CancelOfferModal
            item={userMadeOffer?.item}
            largeTriggerButton
          />
        </ButtonDetailsWrapper>
      )}
    </ButtonListWrapper>
  );
};

export const OnDisconnected = ({
  connectionStatus,
}: DisconnectedProps) =>
  connectionStatus !== PlugStatusCodes.Verifying ? (
    <PlugButtonWrapper>
      <Plug />
    </PlugButtonWrapper>
  ) : null;

export const OfferAccordionHeader = ({
  isListed,
  lastSalePrice,
  owner,
  showNFTActionButtons,
  operator,
  isMobileScreen,
}: OfferAccordionHeaderProps) => {
  const { t } = useTranslation();
  const { id, collectionId } = useParams();
  const dispatch = useAppDispatch();
  const [loadingOffers, setLoadingOffers] = useState<boolean>(true);

  const {
    isConnected,
    principalId: plugPrincipal,
    connectionStatus,
  } = usePlugStore();

  const [marketPrice, setMarketPrice] = useState<
    string | undefined
  >();

  const nftOffers = useSelector(
    (state: RootState) => state.marketplace.nftOffers,
  );

  const topOffer: OffersTableItem = useMemo(
    () => nftOffers && nftOffers[0],
    [nftOffers],
  );

  useEffect(() => {
    // TODO: handle the error gracefully when there is no id
    if (!id || !collectionId) return;

    dispatch(
      marketplaceActions.getNFTOffers({
        id,
        collectionId,

        onSuccess: () => {
          setLoadingOffers(false);
        },

        onFailure: () => {
          // TODO: handle failure messages
        },
      }),
    );
  }, [id, dispatch, plugPrincipal]);

  useEffect(() => {
    if (!lastSalePrice || !isListed) return;

    (async () => {
      // TODO: On loading and awaiting for coin gecko response
      // should display a small loader in the place of price

      const formattedPrice = await getCurrentMarketPrice({
        currentMakeListingPrice: Number(lastSalePrice),
      });

      setMarketPrice(formattedPrice);
    })();
  }, [lastSalePrice, isListed]);

  const isListedWithPrice = isListed && lastSalePrice;

  const myNFTIds = useSelector(
    (state: RootState) => state.nfts.myNFTIds,
  );

  const isOwner = isNFTOwner({
    isConnected,
    myNFTIds,
    currentNFTId: id,
  });

  return (
    <>
      {isListed ? (
        <PriceWrapper>
          <CurrentPriceWrapper>
            {!isMobileScreen && (
              <LogoWrapper
                size={isMobileScreen ? 'small' : 'large'}
                style={{
                  backgroundImage: `url(${wicpIcon})`,
                }}
              />
            )}
            <div>
              <OfferLabel>
                {t(
                  'translation:accordions.offer.header.currentPrice',
                )}
              </OfferLabel>
              <OfferPrice>
                {isMobileScreen && (
                  <LogoWrapper
                    size={isMobileScreen ? 'small' : 'large'}
                    style={{
                      backgroundImage: `url(${wicpIcon})`,
                    }}
                  />
                )}
                {(isListedWithPrice && `${lastSalePrice} WICP`) || (
                  <UndefinedPrice>--</UndefinedPrice>
                )}
              </OfferPrice>
            </div>
          </CurrentPriceWrapper>
          <MarketPrice>
            {isListedWithPrice && marketPrice}
          </MarketPrice>
        </PriceWrapper>
      ) : (
        <PriceWrapper>
          <CurrentPriceWrapper>
            {!isMobileScreen && (
              <LogoWrapper
                size={isMobileScreen ? 'small' : 'large'}
                style={{
                  backgroundImage: `url(${wicpIcon})`,
                }}
              />
            )}
            <div>
              <OfferLabel>
                {t('translation:accordions.offer.header.topOffer')}
              </OfferLabel>
              {(!loadingOffers && (
                <OfferPrice>
                  {isMobileScreen && (
                    <LogoWrapper
                      size={isMobileScreen ? 'small' : 'large'}
                      style={{
                        backgroundImage: `url(${wicpIcon})`,
                      }}
                    />
                  )}
                  {(topOffer?.price &&
                    `${parseE8SAmountToWICP(topOffer.price)} WICP`) ||
                    t(
                      'translation:accordions.offer.emptyStates.noOffer',
                    )}
                </OfferPrice>
              )) || <UndefinedPrice>--</UndefinedPrice>}
            </div>
          </CurrentPriceWrapper>
          <MarketPrice>
            {(topOffer?.computedCurrencyPrice &&
              `US$${formatPriceValue(
                topOffer.computedCurrencyPrice.toString(),
              )}`) || <UndefinedPrice>--</UndefinedPrice>}
          </MarketPrice>
        </PriceWrapper>
      )}
      {(isConnected && (
        <OnConnected
          isListed={isListed}
          isOwner={isOwner}
          price={lastSalePrice}
          showNFTActionButtons={showNFTActionButtons}
          operator={operator}
          isMobileScreen={isMobileScreen}
        />
      )) || <OnDisconnected connectionStatus={connectionStatus} />}
    </>
  );
};

export const OfferAccordion = ({
  lastSalePrice,
  isListed,
  owner,
  showNFTActionButtons,
  operator,
  isMobileScreen,
}: OfferAccordionProps) => {
  const { t } = useTranslation();
  // TODO: On loading and awaiting for token offers response
  // should display a small loader in the place of price
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);

  const { isConnected, principalId: plugPrincipal } = usePlugStore();

  const nftOffers = useSelector(
    (state: RootState) => state.marketplace.nftOffers,
  );

  const { id } = useParams();

  const myNFTIds = useSelector(
    (state: RootState) => state.nfts.myNFTIds,
  );

  const isOwner = isNFTOwner({
    isConnected,
    myNFTIds,
    currentNFTId: id,
  });

  return (
    <AccordionStyle
      type="single"
      collapsible
      width={isMobileScreen ? 'small' : 'medium'}
    >
      {!isMobileScreen && (
        <AccordionHead flexDirection="column">
          <OfferAccordionHeader
            isListed={isListed}
            lastSalePrice={lastSalePrice}
            owner={owner}
            showNFTActionButtons={showNFTActionButtons}
            operator={operator}
            isMobileScreen={isMobileScreen}
          />
        </AccordionHead>
      )}
      {isConnected && showNFTActionButtons && (
        <Accordion.Item value="item-1">
          <AccordionTrigger
            padding={isMobileScreen ? 'small' : 'medium'}
            backgroundColor={isAccordionOpen ? 'notopen' : 'open'}
            borderTop={isMobileScreen ? 'full' : 'borderSet'}
            onClick={() => setIsAccordionOpen(!isAccordionOpen)}
          >
            <div>
              <Icon icon="offer" paddingRight />
              <p>
                {`${t('translation:accordions.offer.header.offer')}`}
                <ItemCount>{`(${nftOffers.length})`}</ItemCount>
              </p>
            </div>
            <Icon icon="chevron-up" rotate={isAccordionOpen} />
          </AccordionTrigger>
          <AccordionContent
            padding="none"
            backgroundColor={isAccordionOpen ? 'notopen' : 'open'}
          >
            <NFTOffersTable isConnectedOwner={isOwner} />
          </AccordionContent>
        </Accordion.Item>
      )}
    </AccordionStyle>
  );
};
