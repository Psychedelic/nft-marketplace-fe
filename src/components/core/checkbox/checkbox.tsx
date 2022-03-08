/* eslint-disable  @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import {
  useFilterStore,
  filterActions,
  useAppDispatch,
} from '../../../store';
import { Wrapper } from './styles';

export type CheckboxProps = {
  title: string;
  value: string; // Red
  percentage: string; // 1291 (12.9%)
  selectedFilters: Array<string>;
  setSelectedFilters: (value: any) => void;
};

export const Checkbox = ({
  title,
  value,
  percentage,
}: CheckboxProps) => {
  const dispatch = useAppDispatch();
  const appliedFilters = useFilterStore();
  const filterNameExists = (filterName: string) => appliedFilters.some((appliedFilter) => appliedFilter.filterName === filterName);

  const handleSelectedFilters = (e: any) => {
    // sets value
    const selectedFilterValue = e.target.value;
    const checkFilterNameExists = filterNameExists(selectedFilterValue);

    // checks if value doesn't already exists
    if (!checkFilterNameExists) {
      // if it doesn't, add value to array
      dispatch(
        filterActions.applyFilter({
          filterName: selectedFilterValue,
          filterCategory: title,
        }),
      );
    } else {
      // if it does, remove value from the array
      dispatch(filterActions.removeFilter(selectedFilterValue));
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
          checked={filterNameExists(value) && true}
        />
        {value}
      </label>
      <span>{percentage}</span>
    </Wrapper>
  );
};
