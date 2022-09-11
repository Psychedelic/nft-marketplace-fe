import React, { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import {
  useFilterStore,
  useAppDispatch,
  filterActions,
} from '../../../store';
import { Checkbox } from '../checkbox/checkbox';
import {
  AccordionStyle,
  AccordionTrigger,
  AccordionContent,
  Form,
  ItemCount,
} from './styles';
import { Icon } from '../../icons';

export type CheckboxFilterAccordionProps = {
  id: string;
  checkboxData: any;
};

export const CheckboxFilterAccordion = ({
  id,
  checkboxData,
}: CheckboxFilterAccordionProps) => {
  const dispatch = useAppDispatch();
  const { traits } = useFilterStore();
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const filterValueExists = (
    traitsValue: string,
    checkboxKey: string,
  ) =>
    traits.some((trait) => {
      return (
        trait.values.includes(traitsValue.toString()) &&
        trait.key === checkboxKey
      );
    });
  const traitsCount = traits.find(
    (trait) => trait.name === checkboxData.name,
  )?.values?.length;

  const handleSelectedFilters = (e: any) => {
    const [key, value] = e.target.value.split('+');
    const checkFilterValueExists = filterValueExists(value, key);

    if (checkFilterValueExists) {
      dispatch(
        filterActions.removeTraitsFilter({
          value: value,
          key: key,
        }),
      );
      return;
    }

    dispatch(
      filterActions.applytraits({
        key: key,
        name: checkboxData.name,
        values: [value],
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
            {traitsCount && (
              <ItemCount>{`(${traitsCount})`}</ItemCount>
            )}
          </p>

          <Icon
            icon="chevron-down"
            rotate={!isAccordionOpen}
            size="sm"
          />
        </AccordionTrigger>
        <AccordionContent padding="small">
          <Form>
            {checkboxData.values.map((data: any) => (
              <Checkbox
                key={`${checkboxData.key}+${data.name}`}
                value={`${checkboxData.key}+${data.name}`}
                percentage={data.rarity}
                occurence={data.occurance}
                tokenCount={Number(data.tokenCount)}
                handleSelectedFilters={handleSelectedFilters}
                filterValueExists={filterValueExists(
                  data.name,
                  checkboxData.key,
                )}
              />
            ))}
          </Form>
        </AccordionContent>
      </Accordion.Item>
    </AccordionStyle>
  );
};
