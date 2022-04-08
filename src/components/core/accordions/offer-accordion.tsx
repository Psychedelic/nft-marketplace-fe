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
  OffersCount,
  ButtonListWrapper,
  ButtonDetailsWrapper,
} from './styles';
import offer from '../../../assets/accordions/offer.svg';
import offerDark from '../../../assets/accordions/offer-dark.svg';
import dfinity from '../../../assets/accordions/dfinity.svg';
import arrowdown from '../../../assets/accordions/arrow-down.svg';
import arrowdownDark from '../../../assets/accordions/arrow-down-dark.svg';
import arrowup from '../../../assets/accordions/arrow-up.svg';
import arrowupDark from '../../../assets/accordions/arrow-up-dark.svg';
import { OffersTable } from '../../tables';
import { Plug } from '../../plug';
import { getCurrentMarketPrice } from '../../../integrations/marketplace/price.utils';

import { BuyNowModal, MakeOfferModal } from '../../modals';
import { isNFTOwner } from '../../../integrations/kyasshu/utils';

export type OfferAccordionProps = {
  lastSalePrice?: string;
  isListed?: boolean;
  owner?: string;
};

export type ConnectedProps = {
  isListed?: boolean;
  isOwner?: boolean;
};

export type DisConnectedProps = {
  isListed?: boolean;
};

const OnConnected = ({ isListed, isOwner }: ConnectedProps) => (
  <>
    {isListed && !isOwner && (
      <ButtonListWrapper>
        <ButtonDetailsWrapper>
          <BuyNowModal />
        </ButtonDetailsWrapper>
        <ButtonDetailsWrapper>
          <MakeOfferModal />
        </ButtonDetailsWrapper>
      </ButtonListWrapper>
    )}
  </>
);

const OnDisconnected = ({ isListed }: DisConnectedProps) => (
  <>
    {isListed && (
      <PlugButtonWrapper>
        <Plug />
      </PlugButtonWrapper>
    )}
  </>
);

export const OfferAccordion = ({
  lastSalePrice,
  isListed,
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

  const { isConnected, principalId: plugPrincipal } = usePlugStore();

  useEffect(() => {
    if (!lastSalePrice || !isListed) return;

    (async () => {
      // TODO: On loading and awaiting for coin gecko response
      // should display a small loader in the place of price

      const formattedPrice = await getCurrentMarketPrice({
        currentListForSalePrice: Number(lastSalePrice),
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
          <OnConnected isListed={isListed} isOwner={isOwner} />
        )) || <OnDisconnected isListed={isListed} />}
      </AccordionHead>
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
              <OffersCount>
                {`(${(isListed && totalOffers) || 0})`}
              </OffersCount>
            </p>
          </div>
          {isListed && (
            <img
              src={!isAccordionOpen ? arrowupTheme : arrowdownTheme}
              alt="arrow-down"
            />
          )}
        </AccordionTrigger>
        <AccordionContent
          padding="none"
          backgroundColor={isAccordionOpen ? 'notopen' : 'open'}
        >
          {isListed && (
            <OffersTable
              isConnectedOwner={isOwner}
              lastSalePrice={lastSalePrice}
            />
          )}
        </AccordionContent>
      </Accordion.Item>
    </AccordionStyle>
  );
};
