import React, { useState, useEffect } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { Checkbox } from '../checkbox/checkbox';
import { checkboxDummyData } from '../../mock-data/accordion-data';
import {
  AccordionStyle,
  AccordionTrigger,
  AccordionContent,
} from './styles';
import arrowdown from '../../../assets/arrowdown.svg';
import arrowdownDark from '../../../assets/arrowdown-dark.svg';

export type CheckboxFilterAccordionProps = {
  title: string;
  id: string;
};

export const CheckboxFilterAccordion = ({
  title,
  id = 'item-1',
}: CheckboxFilterAccordionProps) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState<
    Array<string>
  >([]);
  const [theme, setTheme] = useState('lightTheme');

  useEffect(() => {
    const getTheme = localStorage.getItem('theme');
    if (getTheme) {
      setTheme(getTheme);
    }
  });

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
            {title}
            &nbsp;
            <span>
              {selectedFilters.length > 0
                ? `(${selectedFilters.length})`
                : ''}
            </span>
          </p>
          <img src={theme === 'lightTheme' ? arrowdown : arrowdownDark} alt="arrow-down" />
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
