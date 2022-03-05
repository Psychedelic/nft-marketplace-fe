import React from 'react';
import { useTranslation } from 'react-i18next';
import {
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

export const NFTMetaData = () => {
  const { t } = useTranslation();
  const { theme } = useThemeStore();

  return (
    <CollectionMetadataWrapper>
      <div>
        <Heading>2713</Heading>
        <Subtext>
          Crowns
          <img src={verified} alt="verified" />
        </Subtext>
      </div>
      <Tooltip text={t('translation:common.comingSoon')}>
        <LinkButton>
          <img
            src={theme === 'lightTheme' ? back : backDark}
            alt={t('translation:buttons.links.back')}
          />
        </LinkButton>
      </Tooltip>
    </CollectionMetadataWrapper>
  );
};
