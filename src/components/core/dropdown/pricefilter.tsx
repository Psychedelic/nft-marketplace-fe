import React, { useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import {
  DropdownStyle,
  DropdownContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownRadioGroup,
} from './styles';
import arrowdown from '../../../assets/arrowdown.svg';

export type PriceFilterProps = {
  trigger: string;
  content: Array<string>;
  handleValueChange?: () => void;
}

export const PriceFilter: React.FC<PriceFilterProps> = ({
  trigger,
  content,
  handleValueChange,
}) => {
  const [selectedValue, setSelectedValue] = useState(`${trigger}`);

  return (
    <DropdownMenu.Root>
      <DropdownStyle>
        <p>{selectedValue}</p>
        <img src={arrowdown} alt="arrow-down" />
      </DropdownStyle>

      <DropdownContent>
        <DropdownRadioGroup onValueChange={(e) => setSelectedValue(e)}>
          {content.map((item) => (
            <div key={item}>
              <DropdownMenuItem value={item} textValue={item}>
                {item}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </div>
          ))}
        </DropdownRadioGroup>
      </DropdownContent>
    </DropdownMenu.Root>
  );
};
