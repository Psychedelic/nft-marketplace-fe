/* eslint-disable  @typescript-eslint/no-explicit-any */
import React from 'react';
import { Wrapper } from './styles';

export type CheckboxProps = {
  title: string,
  traitsName: boolean;
  value: string; // Red
  percentage: string; // 1291 (12.9%)
  filterValueExists: (value: string) => boolean;
  handleSelectedFilters: (value: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
};

export const Checkbox = ({
  traitsName,
  value,
  percentage,
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
        onClick={(e) => handleSelectedFilters(e)}
        // checks if value exists in array and sets checked to true
        checked={(filterValueExists(value) && traitsName) && true}
      />
      {value}
    </label>
    <span>{percentage}</span>
  </Wrapper>
);
