import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Accordion from '@radix-ui/react-accordion';
import { Checkbox } from '../checkbox/checkbox';
import { AccordionStyle, AccordionTrigger, AccordionContent } from './styles';
import arrowdown from '../../../assets/arrowdown.svg';

export const CheckboxFilterAccordion = () => {
  const { t } = useTranslation();
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Array<string>>([]);

  const checkboxDummyData = [
    {
      value: `${t('translation:checkbox.bigGem.red')}`,
      percentage: `${t('translation:checkbox.bigGem.percentage')}`,
    },
    {
      value: `${t('translation:checkbox.bigGem.purple')}`,
      percentage: `${t('translation:checkbox.bigGem.percentage')}`,
    },
    {
      value: `${t('translation:checkbox.bigGem.yellow')}`,
      percentage: `${t('translation:checkbox.bigGem.percentage')}`,
    },
    {
      value: `${t('translation:checkbox.bigGem.orange')}`,
      percentage: `${t('translation:checkbox.bigGem.percentage')}`,
    },
    {
      value: `${t('translation:checkbox.bigGem.green')}`,
      percentage: `${t('translation:checkbox.bigGem.percentage')}`,
    },
  ];

  return (
    <AccordionStyle
      type="single"
      defaultValue="item-1"
      collapsible
      backgroundColor={isAccordionOpen ? 'notopen' : 'open'}
      width="small"
    >
      <Accordion.Item value="item-1">
        <AccordionTrigger
          padding="small"
          backgroundColor="none"
          borderTop="none"
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
        >
          <p>
            {`${t('translation:checkbox.bigGem.bigGem')}`}
            &nbsp;
            <span>
              {selectedFilters.length > 0 ? `(${selectedFilters.length})` : ''}
            </span>
          </p>
          <img src={arrowdown} alt="arrow-down" />
        </AccordionTrigger>
        <AccordionContent padding="small">
          <form>
            {checkboxDummyData.map((data) => (
              <Checkbox
                value={data.value}
                percentage={data.percentage}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
              />
            ))}
          </form>
        </AccordionContent>
      </Accordion.Item>
    </AccordionStyle>
  );
};
