import React, { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { Checkbox } from '../checkbox/checkbox';
import { AccordionStyle, AccordionTrigger, AccordionContent } from './styles';
import arrowdown from '../../../assets/arrowdown.svg';

export const CheckboxFilterAccordion = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Array<string>>([]);

  const checkboxDummyData = [
    {
      value: 'Red',
      percentage: '1291 (12.9%)',
    },
    {
      value: 'Purple',
      percentage: '1291 (12.9%)',
    },
    {
      value: 'Yellow',
      percentage: '1291 (12.9%)',
    },
    {
      value: 'Orange',
      percentage: '1291 (12.9%)',
    },
    {
      value: 'Green',
      percentage: '1291 (12.9%)',
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
            Big Gem&nbsp;
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
