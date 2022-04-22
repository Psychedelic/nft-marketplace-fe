import React from 'react';
import copyToClipboard from 'copy-to-clipboard';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useTranslation } from 'react-i18next';
import {
  notificationActions,
  useAppDispatch,
  useThemeStore,
} from '../../../store';
import {
  Flex,
  DropdownContent,
  DropdownMenuItem,
  DropdownGroup,
} from './styles';
import moreoptions from '../../../assets/moreoptions.svg';
import copy from '../../../assets/copy.svg';
import copyDark from '../../../assets/copy-dark.svg';
import { NFTMetadata } from '../../../declarations/nft';

export type CardOptionsDropdownProps = {
  data: NFTMetadata,
}

export const CardOptionsDropdown = ({ data }: CardOptionsDropdownProps) => {
  const { t } = useTranslation();
  const { theme } = useThemeStore();
  const dispatch = useAppDispatch();
  const isLightTheme = theme === 'lightTheme';

  const handleCopy = (e) => {
    e.preventDefault();
    copyToClipboard(`${window.location.href}nft/${data.id}`);
    dispatch(notificationActions.setSuccessMessage(`${t('translation:successMessages.copyToClipboard')}`));
  };

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

      <DropdownContent
        width="small"
        background={theme === 'darkTheme' ? 'dark' : 'light'}
        onClick={(e) => handleCopy(e)}
      >
        <DropdownGroup>
          <DropdownMenuItem>
            <Flex>
              <p>
                {`${t('translation:dropdown.moreOptions.copyLink')}`}
              </p>
              <img
                src={isLightTheme ? copy : copyDark}
                alt="copy-link"
              />
            </Flex>
          </DropdownMenuItem>
        </DropdownGroup>
      </DropdownContent>
    </DropdownMenu.Root>
  );
};
