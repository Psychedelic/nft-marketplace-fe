import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Accordion from '@radix-ui/react-accordion';
import {
  useThemeStore,
} from '../../../store';
import {
  AccordionStyle,
  AccordionTrigger,
  AccordionContent,
  AccordionHead,
  AccordionHeadContent,
  FlexRight,
} from './styles';
import offer from '../../../assets/accordions/offer.svg';
import offerDark from '../../../assets/accordions/offer-dark.svg';
import dfinity from '../../../assets/accordions/dfinity.svg';
import arrowdown from '../../../assets/accordions/arrow-down.svg';
import arrowdownDark from '../../../assets/accordions/arrow-down-dark.svg';
import arrowup from '../../../assets/accordions/arrow-up.svg';
import arrowupDark from '../../../assets/accordions/arrow-up-dark.svg';
import { OffersTable } from '../../tables';

export const OfferAccordion = () => {
  const { t } = useTranslation();
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const { theme } = useThemeStore();
  const isLightTheme = theme === 'lightTheme';

  const arrowdownTheme = isLightTheme ? arrowdown : arrowdownDark;
  const arrowupTheme = isLightTheme ? arrowup : arrowupDark;

  return (
    <AccordionStyle type="single" collapsible width="medium">
      <AccordionHead>
        <AccordionHeadContent flexProperties="offer">
          <FlexRight>
            <img src={dfinity} alt={dfinity} />
            <div>
              <span>
                {t(
                  'translation:accordions.offer.header.currentPrice',
                )}
              </span>
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
            <img src={isLightTheme ? offer : offerDark} alt="offer-collection" />
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
          <OffersTable />
        </AccordionContent>
      </Accordion.Item>
    </AccordionStyle>
  );
};
