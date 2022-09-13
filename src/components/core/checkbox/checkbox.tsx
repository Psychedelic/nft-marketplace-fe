import React from 'react';
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
  tokenCount: number;
};

export const Checkbox = ({
  value,
  filterValueExists,
  tokenCount,
  handleSelectedFilters,
}: CheckboxProps) => (
  <>
    {value.split('+')[1] !== '' && (
      <Wrapper
        role="checkbox"
        tabIndex={0}
        onKeyDown={(event: any) => {
          // Keyboard accessibility
          if (
            event.keyCode === 13 &&
            typeof handleSelectedFilters === 'function'
          ) {
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
            readOnly
          />
          <span />
          {value.split('+')[1]}
        </label>
        <RarityValue>{tokenCount}</RarityValue>
      </Wrapper>
    )}
  </>
);
