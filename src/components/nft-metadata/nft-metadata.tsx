import React from 'react';
import copyToClipboard from 'copy-to-clipboard';
import { useTranslation } from 'react-i18next';
import {
  notificationActions,
  useAppDispatch,
  useThemeStore,
} from '../../store';
import { LinkButton, Tooltip } from '../core';

import {
  CollectionMetadataWrapper,
  Heading,
  Subtext,
} from './styles';
import back from '../../assets/buttons/back.svg';
import backDark from '../../assets/buttons/back-dark.svg';
import verified from '../../assets/verified-small.svg';

export interface NFTMetaDataProps {
  id?: string;
}

export const NFTMetaData = ({ id }: NFTMetaDataProps) => {
  const { t } = useTranslation();
  const { theme } = useThemeStore();
  const dispatch = useAppDispatch();
  const isLightTheme = theme === 'lightTheme';

  return (
    <CollectionMetadataWrapper>
      <div>
        <Heading>{id}</Heading>
        <Subtext>
          Crowns
          <img src={verified} alt="verified" />
        </Subtext>
      </div>
      <LinkButton handleClick={() => {
        copyToClipboard(window.location.href);
        dispatch(notificationActions.setSuccessMessage(`${t('translation:successMessages.copyToClipboard')}`));
      }}
      >
        <img
          src={isLightTheme ? back : backDark}
          alt={t('translation:buttons.links.back')}
        />
      </LinkButton>
    </CollectionMetadataWrapper>
  );
};
