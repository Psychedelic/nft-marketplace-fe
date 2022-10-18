import React from 'react';
import copyToClipboard from 'copy-to-clipboard';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useTranslation } from 'react-i18next';
import { notificationActions, useAppDispatch } from '../../../store';
import {
  DropdownContent,
  DropdownMenuItem,
  DropdownGroup,
  DropdownButtonContainer,
  EllipsisIcon,
} from './styles';
import { NFTMetadata } from '../../../declarations/legacy';
import { Icon } from '../../icons';
import { useTheme } from '../../../hooks';

export type CardOptionsDropdownProps = {
  data: NFTMetadata;
};

export const CardOptionsDropdown = ({
  data,
}: CardOptionsDropdownProps) => {
  const { t } = useTranslation();
  const [, themeObject] = useTheme();
  const dispatch = useAppDispatch();

  const handleCopy = (e: any) => {
    e.preventDefault();
    copyToClipboard(`${window.location.href}/nft/${data.id}`);
    dispatch(
      notificationActions.setSuccessMessage(
        `${t('translation:successMessages.copyToClipboard')}`,
      ),
    );
  };

  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger
        className={themeObject}
        asChild
        style={{
          cursor: 'pointer',
        }}
        onClick={(e) => e.preventDefault()}
      >
        <DropdownButtonContainer>
          <EllipsisIcon icon="ellipsis" />
        </DropdownButtonContainer>
      </DropdownMenu.Trigger>

      <DropdownContent
        className={themeObject}
        width="small"
        onClick={(e) => handleCopy(e)}
      >
        <DropdownGroup>
          <DropdownMenuItem className="list-item">
            <p>
              {`${t('translation:dropdown.moreOptions.copyLink')}`}
            </p>
            <Icon icon="copy" />
          </DropdownMenuItem>
        </DropdownGroup>
      </DropdownContent>
    </DropdownMenu.Root>
  );
};
