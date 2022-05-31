import React from 'react';
import { roundOffDecimalValue } from '../../../utils/nfts';
import { Wrapper } from './styles';

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
  <Wrapper>
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
    <span>{`${occurence} (${roundOffDecimalValue(Number(percentage), 1)}%)`}</span>
  </Wrapper>
);
