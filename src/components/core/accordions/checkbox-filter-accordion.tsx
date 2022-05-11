import React, { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import {
  useFilterStore,
  useThemeStore,
  useAppDispatch,
  filterActions,
} from '../../../store';
import { Checkbox } from '../checkbox/checkbox';
import {
  AccordionStyle,
  AccordionTrigger,
  AccordionContent,
  Form,
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
  const dispatch = useAppDispatch();
  const { theme } = useThemeStore();
  const { traits } = useFilterStore();
  const isLightTheme = theme === 'lightTheme';
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const filterValueExists = (traitsValue: string) =>
    traits.some(
      (trait) =>
        trait.values.includes(traitsValue) &&
        trait.key === checkboxData.key,
    );
  const traitsCount = traits.find(
    (trait) => trait.name === checkboxData.name,
  )?.values?.length;

  const handleSelectedFilters = (e: any) => {
    const checkFilterValueExists = filterValueExists(e.target.value);

    if (checkFilterValueExists) {
      dispatch(
        filterActions.removeTraitsFilter({
          value: e.target.value,
          key: checkboxData.key,
        }),
      );
      return;
    }

    dispatch(
      filterActions.applytraits({
        key: checkboxData.key,
        name: checkboxData.name,
        values: [e.target.value],
      }),
    );
  };

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
            {checkboxData.key}
            {traitsCount && <span>{`(${traitsCount})`}</span>}
          </p>
          <img
            src={isLightTheme ? arrowdown : arrowdownDark}
            alt="arrow-down"
          />
        </AccordionTrigger>
        <AccordionContent padding="small">
          <Form>
            {checkboxData.values.map((data: any) => (
              <Checkbox
                key={data.value}
                value={data.value}
                percentage={data.rarity}
                occurence={data.occurance}
                handleSelectedFilters={handleSelectedFilters}
                filterValueExists={filterValueExists}
              />
            ))}
          </Form>
        </AccordionContent>
      </Accordion.Item>
    </AccordionStyle>
  );
};
