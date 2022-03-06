/* eslint-disable  @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useFilterStore } from '../../../store';
import { Wrapper } from './styles';

export type CheckboxProps = {
  value: string; // Red
  percentage: string; // 1291 (12.9%)
  selectedFilters: Array<string>;
  setSelectedFilters: (value: any) => void;
};

export const Checkbox = ({
  value,
  percentage,
  selectedFilters,
  setSelectedFilters,
}: CheckboxProps) => {
  const appliedFilters = useFilterStore();

  const handleSelectedFilters = (e: any) => {
    // sets value
    const selectedFilterValue = e.target.value;

    // checks if value doesn't already exists
    if (!selectedFilters.includes(selectedFilterValue)) {
      // if it doesn't, add value to array
      setSelectedFilters([...selectedFilters, selectedFilterValue]);
    } else {
      // if it does, remove value from the array
      setSelectedFilters(
        selectedFilters.filter(
          (item) => item !== selectedFilterValue,
        ),
      );
    }
  };

  return (
    <Wrapper>
      <label htmlFor={value}>
        <input
          type="checkbox"
          id={value}
          name={value}
          value={value}
          onClick={handleSelectedFilters}
          // checks if value exists in array and sets checked to true
          checked={
            appliedFilters.some(
              (appliedFilter) => appliedFilter.filterName === value,
            ) && true
          }
        />
        {value}
      </label>
      <span>{percentage}</span>
    </Wrapper>
  );
};
