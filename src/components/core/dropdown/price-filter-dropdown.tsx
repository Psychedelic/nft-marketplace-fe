import React, { useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import {
  DropdownStyle,
  DropdownContent,
  DropdownRadioMenuItem,
  DropdownMenuSeparator,
  DropdownRadioGroup,
} from './styles';
import arrowdown from '../../../assets/arrowdown.svg';

export type PriceFilterDropdownProps = {
  trigger: string;
  options: Array<string>;
  handleValueChange?: () => void;
};

export const PriceFilterDropdown = ({
  trigger,
  options,
  handleValueChange,
}: PriceFilterDropdownProps) => {
  const [selectedValue, setSelectedValue] = useState(`${trigger}`);

  return (
    <DropdownMenu.Root>
      <DropdownStyle>
        <p>{selectedValue}</p>
        <img src={arrowdown} alt="arrow-down" />
      </DropdownStyle>

      <DropdownContent>
        <DropdownRadioGroup onValueChange={(e) => setSelectedValue(e)}>
          {options.map((item) => (
            <div key={item}>
              <DropdownRadioMenuItem value={item} textValue={item}>
                {item}
              </DropdownRadioMenuItem>
              <DropdownMenuSeparator />
            </div>
          ))}
        </DropdownRadioGroup>
      </DropdownContent>
    </DropdownMenu.Root>
  );
};
