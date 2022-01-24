import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import {
  Flex,
  DropdownContent,
  DropdownMenuItem,
  DropdownGroup,
} from './styles';
import moreoptions from '../../../assets/moreoptions.svg';
import copy from '../../../assets/copy.svg';

export const CardOptionsDropdown = ({ content }) => (
  <DropdownMenu.Root>
    <DropdownMenu.Trigger asChild>
      <img src={moreoptions} alt="more-options" />
    </DropdownMenu.Trigger>

    <DropdownContent>
      <DropdownGroup>
        <DropdownMenuItem>
          <Flex>
            <p>{content}</p>
            <img src={copy} alt="copy-link" />
          </Flex>
        </DropdownMenuItem>
      </DropdownGroup>
    </DropdownContent>
  </DropdownMenu.Root>
);
