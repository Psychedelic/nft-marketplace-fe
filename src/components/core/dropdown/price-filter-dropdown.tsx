import React, { useState } from 'react';
import {
  useThemeStore,
} from '../../../store';
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
  const { theme } = useThemeStore();
  const isLightTheme = theme === 'lightTheme';

  return (
    <DropdownRoot>
      <DropdownStyle>
        <p>{selectedValue}</p>
        <img
          src={isLightTheme ? arrowdown : arrowdownDark}
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
