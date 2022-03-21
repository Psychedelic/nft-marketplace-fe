import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { theme } = useThemeStore();
  const { traits } = useFilterStore();
  const isLightTheme = theme === 'lightTheme';
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const filterValueExists = (traitsValue: string) => traits.some((trait) => trait.values.includes(traitsValue));
  const traitsCount = traits.find((trait) => trait.name === checkboxData.name)?.values?.length;
  const traitsName = traits.find((trait) => trait.name === checkboxData.name);

  const handleSelectedFilters = (e: any) => {
    const checkFilterValueExists = filterValueExists(e.target.value);

    if (!checkFilterValueExists) {
      dispatch(
        filterActions.applytraits({
          key: checkboxData.key,
          name: checkboxData.name,
          values: e.target.value,
        }),
      );
    } else {
      dispatch(filterActions.removeTraitsFilter(e.target.value));
    }
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
            &nbsp;
            <span>{traitsCount && traitsCount > 0 ? `(${traitsCount})` : ''}</span>
          </p>
          <img
            src={isLightTheme ? arrowdown : arrowdownDark}
            alt="arrow-down"
          />
        </AccordionTrigger>
        <AccordionContent padding="small">
          <form>
            {checkboxData.values.map((data) => (
              <Checkbox
                traitsName={traitsName}
                key={data}
                value={data}
                percentage={data.percentage}
                handleSelectedFilters={handleSelectedFilters}
                filterValueExists={filterValueExists}
              />
            ))}
          </form>
        </AccordionContent>
      </Accordion.Item>
    </AccordionStyle>
  );
};
