import { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import {
  AccordionStyle,
  AccordionTrigger,
  AccordionContent,
  CollectionAccordionTitle,
} from './styles';
import { Icon } from '../../icons';
import { useTranslation } from 'react-i18next';

export const CollectionAccordion = () => {
  const { t } = useTranslation();
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);

  return (
    <AccordionStyle
      type="single"
      collapsible
      backgroundColor={isAccordionOpen ? 'notopen' : 'open'}
      width="small"
      className="checkbox-accordian"
      marginless="bottom"
    >
      <Accordion.Item value="">
        <AccordionTrigger
          padding="large"
          backgroundColor="none"
          borderTop="none"
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
        >
          <CollectionAccordionTitle>
            {t('translation:onboarding.nftCollection')}
          </CollectionAccordionTitle>
          <Icon
            icon="chevron-down"
            rotate={!isAccordionOpen}
            size="sm"
          />
        </AccordionTrigger>
        <AccordionContent padding="small"></AccordionContent>
      </Accordion.Item>
    </AccordionStyle>
  );
};
