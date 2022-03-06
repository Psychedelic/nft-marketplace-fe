import React, { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import {
  filterActions,
  useAppDispatch,
  useThemeStore,
} from '../../../store';
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
  const { theme } = useThemeStore();
  const dispatch = useAppDispatch();
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState<
    Array<string>
  >([]);

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
            // call apply filter
            // eslint-disable-next-line
            <div onClick={() => { dispatch(filterActions.applyFilter({ filterName: data.value, filterCategory: title }))}}>
              <Checkbox
                key={data.value}
                value={data.value}
                percentage={data.percentage}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
              />
            </div>
            ))}
          </form>
        </AccordionContent>
      </Accordion.Item>
    </AccordionStyle>
  );
};
