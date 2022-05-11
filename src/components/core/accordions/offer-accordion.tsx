import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Accordion from '@radix-ui/react-accordion';
import { usePlugStore } from '../../../store';
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
  AccordionImage,
} from './styles';
import { NFTOffersTable } from '../../tables';
import { Plug } from '../../plug';
import { getCurrentMarketPrice } from '../../../integrations/marketplace/price.utils';

import { BuyNowModal, MakeOfferModal } from '../../modals';
import { isNFTOwner } from '../../../integrations/kyasshu/utils';
import { PlugStatusCodes } from '../../../constants/plug';
import { Icon } from '../../icons';
import wicpIcon from '../../../assets/wicp.svg';

export type OfferAccordionProps = {
  lastSalePrice?: string;
  isListed?: boolean;
  owner?: string;
  showNFTActionButtons: boolean;
};

type ConnectedProps = {
  isListed?: boolean;
  isOwner?: boolean;
  price?: string;
  showNFTActionButtons: boolean;
};

type DisconnectedProps = {
  connectionStatus: string;
};

const OnConnected = ({
  isListed,
  isOwner,
  price,
  showNFTActionButtons,
}: ConnectedProps) =>
  !isOwner && showNFTActionButtons ? (
    <ButtonListWrapper>
      {isListed && (
        <ButtonDetailsWrapper>
          <BuyNowModal price={price?.toString()} />
        </ButtonDetailsWrapper>
      )}
      <ButtonDetailsWrapper>
        <MakeOfferModal />
      </ButtonDetailsWrapper>
    </ButtonListWrapper>
  ) : null;

const OnDisconnected = ({ connectionStatus }: DisconnectedProps) =>
  connectionStatus !== PlugStatusCodes.Verifying ? (
    <PlugButtonWrapper>
      <Plug />
    </PlugButtonWrapper>
  ) : null;

export const OfferAccordion = ({
  lastSalePrice,
  isListed,
  owner,
  showNFTActionButtons,
}: OfferAccordionProps) => {
  const { t } = useTranslation();
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const [marketPrice, setMarketPrice] = useState<
    string | undefined
  >();

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
            <AccordionImage
              style={{
                backgroundImage: `url(${wicpIcon})`,
                width: '60px',
                height: '60px',
              }}
            />
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
            price={lastSalePrice}
            showNFTActionButtons={showNFTActionButtons}
          />
        )) || <OnDisconnected connectionStatus={connectionStatus} />}
      </AccordionHead>
      {isConnected && showNFTActionButtons && (
        <Accordion.Item value="item-1">
          <AccordionTrigger
            padding="medium"
            backgroundColor={isAccordionOpen ? 'notopen' : 'open'}
            borderTop="borderSet"
            onClick={() => setIsAccordionOpen(!isAccordionOpen)}
          >
            <div>
              <Icon icon="offer" paddingRight />
              <p>
                {`${t('translation:accordions.offer.header.offer')}`}
              </p>
            </div>
            <Icon icon="chevron-down" rotate={isAccordionOpen} />
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
