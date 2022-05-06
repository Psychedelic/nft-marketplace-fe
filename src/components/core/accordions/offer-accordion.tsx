import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Accordion from '@radix-ui/react-accordion';
import { useThemeStore, usePlugStore } from '../../../store';
import {
  AccordionStyle,
  AccordionTrigger,
  AccordionContent,
  AccordionHead,
  AccordionHeadContent,
  FlexRight,
  PlugButtonWrapper,
  UndefinedPrice,
  ButtonListWrapper,
  ButtonDetailsWrapper,
  Loading,
} from './styles';
import offer from '../../../assets/accordions/offer.svg';
import offerDark from '../../../assets/accordions/offer-dark.svg';
import dfinity from '../../../assets/accordions/dfinity.svg';
import arrowdown from '../../../assets/accordions/arrow-down.svg';
import arrowdownDark from '../../../assets/accordions/arrow-down-dark.svg';
import arrowup from '../../../assets/accordions/arrow-up.svg';
import arrowupDark from '../../../assets/accordions/arrow-up-dark.svg';
import { NFTOffersTable } from '../../tables';
import { Plug } from '../../plug';
import { getCurrentMarketPrice } from '../../../integrations/marketplace/price.utils';

import {
  BuyNowModal,
  MakeOfferModal,
} from '../../modals';
import { isNFTOwner } from '../../../integrations/kyasshu/utils';
import { PlugStatusCodes } from '../../../constants/plug';

export type OfferAccordionProps = {
  lastSalePrice?: string;
  isListed?: boolean;
  isUser?: boolean;
  setIsUser?: (value: boolean) => void;
  isOffers?: boolean;
  owner?: string;
};

type ConnectedProps = {
  isListed?: boolean;
  isOwner?: boolean;
  isUser?: boolean;
  setIsUser?: (value: boolean) => void;
  isOffers?: boolean;
  price?: string;
};

type DisconnectedProps = {
  connectionStatus: string;
};

const OnConnected = ({
  isListed,
  isOwner,
  price,
  setIsUser,
  isUser,
  isOffers,
}: ConnectedProps) => {
  const { t } = useTranslation();

  return (
    !isOwner ? (
      <ButtonListWrapper>
        {isListed && (
          <ButtonDetailsWrapper>
            <BuyNowModal price={price?.toString()} />
          </ButtonDetailsWrapper>
        )}
        <ButtonDetailsWrapper>
          {isOffers ? (
            <Loading>Loading...</Loading>
          ) : isUser ? (
            <MakeOfferModal text={`${t('translation:buttons.action.editOffer')}`} />
          ) : (
            <MakeOfferModal setIsUser={setIsUser} />
          )}
        </ButtonDetailsWrapper>
      </ButtonListWrapper>
    ) : null
  );
}

const OnDisconnected = ({ connectionStatus }: DisconnectedProps) =>
  connectionStatus !== PlugStatusCodes.Verifying ? (
    <PlugButtonWrapper>
      <Plug />
    </PlugButtonWrapper>
  ) : null;

export const OfferAccordion = ({
  lastSalePrice,
  isListed,
  isUser,
  setIsUser,
  isOffers,
  owner,
}: OfferAccordionProps) => {
  const { t } = useTranslation();
  // TODO: update offers count
  const totalOffers = 1;
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const [marketPrice, setMarketPrice] = useState<
    string | undefined
  >();
  const { theme } = useThemeStore();
  const isLightTheme = theme === 'lightTheme';

  const arrowdownTheme = isLightTheme ? arrowdown : arrowdownDark;
  const arrowupTheme = isLightTheme ? arrowup : arrowupDark;

  const {
    isConnected,
    principalId: plugPrincipal,
    connectionStatus,
  } = usePlugStore();

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

  const isOwner = isNFTOwner({
    isConnected,
    owner,
    principalId: plugPrincipal,
  });

  return (
    <AccordionStyle type="single" collapsible width="medium">
      <AccordionHead flexDirection="column">
        <AccordionHeadContent flexProperties="offer">
          <FlexRight>
            <img src={dfinity} alt={dfinity} />
            <div>
              <span>
                {t(
                  'translation:accordions.offer.header.currentPrice',
                )}
              </span>
              <h4>
                {(isListedWithPrice && `${lastSalePrice} WICP`) || (
                  <UndefinedPrice>--</UndefinedPrice>
                )}
              </h4>
            </div>
          </FlexRight>
          <h3>{isListedWithPrice && marketPrice}</h3>
        </AccordionHeadContent>
        {(isConnected && (
          <OnConnected
            isListed={isListed}
            isOwner={isOwner}
            isUser={isUser}
            setIsUser={setIsUser}
            isOffers={isOffers}
            price={lastSalePrice}
          />
        )) || <OnDisconnected connectionStatus={connectionStatus} />}
      </AccordionHead>
      {isConnected && (
        <Accordion.Item value="item-1">
          <AccordionTrigger
            padding="medium"
            backgroundColor={isAccordionOpen ? 'notopen' : 'open'}
            borderTop="borderSet"
            onClick={() => setIsAccordionOpen(!isAccordionOpen)}
          >
            <div>
              <img
                src={isLightTheme ? offer : offerDark}
                alt="offer-collection"
              />
              <p>
                {`${t('translation:accordions.offer.header.offer')}`}
              </p>
            </div>
            <img
              src={!isAccordionOpen ? arrowupTheme : arrowdownTheme}
              alt="arrow-down"
            />
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
