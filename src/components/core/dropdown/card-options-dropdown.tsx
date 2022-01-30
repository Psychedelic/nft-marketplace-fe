import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useTranslation } from 'react-i18next';

import {
  Flex,
  DropdownContent,
  DropdownMenuItem,
  DropdownGroup,
} from './styles';
import moreoptions from '../../../assets/moreoptions.svg';
import copy from '../../../assets/copy.svg';

export const CardOptionsDropdown = () => {
  const { t } = useTranslation();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        asChild
        style={{
          cursor: 'pointer',
        }}
      >
        <img src={moreoptions} alt="more-options" />
      </DropdownMenu.Trigger>

      <DropdownContent width="small">
        <DropdownGroup>
          <DropdownMenuItem>
            <Flex>
              <p>
                {`${t('translation:dropdown.moreOptions.copyLink')}`}
              </p>
              <img src={copy} alt="copy-link" />
            </Flex>
          </DropdownMenuItem>
        </DropdownGroup>
      </DropdownContent>
    </DropdownMenu.Root>
  );
};
