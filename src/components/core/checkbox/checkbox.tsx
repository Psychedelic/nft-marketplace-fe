import React from 'react';
import { roundOffDecimalValue } from '../../../utils/nfts';
import { Wrapper, RarityValue } from './styles';

export type CheckboxProps = {
  title?: string;
  value: string; // Red
  filterValueExists: boolean;
  percentage: string; // 1291 (12.9%)
  occurence: string;
  handleSelectedFilters: (
    value: React.MouseEvent<HTMLInputElement, MouseEvent>,
  ) => void;
};

export const Checkbox = ({
  value,
  percentage,
  occurence,
  filterValueExists,
  handleSelectedFilters,
}: CheckboxProps) => (
  <Wrapper
    role="checkbox"
    tabIndex={0}
    onKeyDown={(event: any) => {
      if (event.keyCode === 13 && handleSelectedFilters) {
        event.target.value = value;
        handleSelectedFilters(event);
      }
    }}
  >
    <label htmlFor={value}>
      <input
        type="checkbox"
        id={value}
        name={value}
        value={value}
        onClick={handleSelectedFilters}
        // checks if value exists in array and sets checked to true
        checked={filterValueExists}
      />
      <span />
      {value.split('-')[1]}
    </label>
    <RarityValue>{`${occurence} (${roundOffDecimalValue(
      Number(percentage),
      1,
    )}%)`}</RarityValue>
  </Wrapper>
);
