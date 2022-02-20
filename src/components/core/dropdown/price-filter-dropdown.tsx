import React, { useState, useEffect } from 'react';

import {
  DropdownRoot,
  DropdownStyle,
  DropdownContent,
  DropdownRadioMenuItem,
  DropdownMenuSeparator,
  DropdownRadioGroup,
} from './styles';
import arrowdown from '../../../assets/arrowdown.svg';
import arrowdownDark from '../../../assets/arrowdown-dark.svg';

export type PriceFilterDropdownProps = {
  defaultValue: string; // Price: High To Low
  options: Array<string>; // ["Low To High", "High To Low"]
};

export const PriceFilterDropdown = ({
  defaultValue,
  options,
}: PriceFilterDropdownProps) => {
  const [selectedValue, setSelectedValue] = useState(
    `${defaultValue}`,
  );
  const [theme, setTheme] = useState('lightTheme');

  useEffect(() => {
    const getTheme = localStorage.getItem('theme');
    setTheme(getTheme);
  });

  return (
    <DropdownRoot>
      <DropdownStyle>
        <p>{selectedValue}</p>
        <img
          src={theme === 'lightTheme' ? arrowdown : arrowdownDark}
          alt="arrow-down"
        />
      </DropdownStyle>

      <DropdownContent
        background={theme === 'darkTheme' ? 'dark' : 'light'}
      >
        <DropdownRadioGroup
          onValueChange={(e) => setSelectedValue(e)}
        >
          {options.map((item) => (
            <>
              <DropdownRadioMenuItem value={item} textValue={item}>
                {item}
              </DropdownRadioMenuItem>
              <DropdownMenuSeparator
                background={theme === 'darkTheme' ? 'dark' : 'light'}
              />
            </>
          ))}
        </DropdownRadioGroup>
      </DropdownContent>
    </DropdownRoot>
  );
};
