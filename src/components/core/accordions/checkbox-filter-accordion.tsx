import React, { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { useFilterStore, useThemeStore } from '../../../store';
import { Checkbox } from '../checkbox/checkbox';
import {
  AccordionStyle,
  AccordionTrigger,
  AccordionContent,
} from './styles';
import arrowdown from '../../../assets/arrowdown.svg';
import arrowdownDark from '../../../assets/arrowdown-dark.svg';

export type CheckboxFilterAccordionProps = {
  id: string;
  checkboxData: any;
};

export const CheckboxFilterAccordion = ({
  id = 'item-1',
  checkboxData,
}: CheckboxFilterAccordionProps) => {
  const { theme } = useThemeStore();
  const { traitsFilters } = useFilterStore();
  const isLightTheme = theme === 'lightTheme';
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);

  /* Check if id matches, we need a conditional */
  const traitsFiltersCount = traitsFilters.filter((selectedTrait) => selectedTrait.traitsTitle === checkboxData.title).length;

  return (
    <AccordionStyle
      type="single"
      collapsible
      backgroundColor={isAccordionOpen ? 'notopen' : 'open'}
      width="small"
      className="checkbox-accordian"
    >
      <Accordion.Item value={id}>
        <AccordionTrigger
          padding="small"
          backgroundColor="none"
          borderTop="none"
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
        >
          <p>
            {checkboxData.title}
            &nbsp;
            <span>
              {traitsFiltersCount > 0 && traitsFiltersCount}
            </span>
          </p>
          <img
            src={isLightTheme ? arrowdown : arrowdownDark}
            alt="arrow-down"
          />
        </AccordionTrigger>
        <AccordionContent padding="small">
          <form>
            {checkboxData.values.map((data) => (
              // call apply filter
              // eslint-disable-next-line
              <Checkbox
                title={checkboxData.title}
                key={data.name}
                value={data.name}
                percentage={data.percentage}
              />
            ))}
          </form>
        </AccordionContent>
      </Accordion.Item>
    </AccordionStyle>
  );
};
