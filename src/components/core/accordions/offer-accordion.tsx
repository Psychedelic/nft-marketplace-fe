import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Accordion from '@radix-ui/react-accordion';
import {
  AccordionStyle,
  AccordionTrigger,
  AccordionContent,
  AccordionHead,
  AccordionHeadContent,
  FlexRight,
} from './styles';
import offer from '../../../assets/accordions/offer.svg';
import dfinity from '../../../assets/accordions/dfinity.svg';
import arrowdown from '../../../assets/accordions/arrow-down.svg';
import arrowup from '../../../assets/accordions/arrow-up.svg';
import { OffersTable } from '../../tables';

export const OfferAccordion = () => {
  const { t } = useTranslation();
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  return (
    <AccordionStyle
      type="single"
      defaultValue="item-1"
      collapsible
      width="medium"
    >
      <AccordionHead>
        <AccordionHeadContent flexProperties="offer">
          <FlexRight>
            <img src={dfinity} alt={dfinity} />
            <div>
              <span>{`${t('translation:accordions.offer.header.currentPrice')}`}</span>
              <h4>21.12 WICP</h4>
            </div>
          </FlexRight>
          <h3>$1,283.12</h3>
        </AccordionHeadContent>
      </AccordionHead>
      <Accordion.Item value="item-1">
        <AccordionTrigger
          padding="medium"
          backgroundColor={isAccordionOpen ? 'notopen' : 'open'}
          borderTop="borderSet"
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
        >
          <div>
            <img src={offer} alt="offer-collection" />
            <p>
              {`${t('translation:accordions.offer.header.offer')}`}
            </p>
          </div>
          <img
            src={!isAccordionOpen ? arrowup : arrowdown}
            alt="arrow-down"
          />
        </AccordionTrigger>
        <AccordionContent
          padding="none"
          backgroundColor={isAccordionOpen ? 'notopen' : 'open'}
        >
          <OffersTable />
        </AccordionContent>
      </Accordion.Item>
    </AccordionStyle>
  );
};
