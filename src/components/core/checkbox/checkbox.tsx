import React, { useState } from 'react';
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
  const handleSelectedFilters = (e: any) => {
    const selectedFilterValue = e.target.value;
    if (!selectedFilters.includes(selectedFilterValue)) {
      setSelectedFilters([...selectedFilters, selectedFilterValue]);
    } else {
      setSelectedFilters(
        selectedFilters.filter((item) => item !== selectedFilterValue),
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
          checked={selectedFilters.includes(value) && true}
        />
        {value}
      </label>
      <span>{percentage}</span>
    </Wrapper>
  );
};
