import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const [theme, setTheme] = useState('lightTheme');

  useEffect(() => {
    const getTheme = localStorage.getItem('theme');
    if (getTheme) {
      setTheme(getTheme);
    }
  });

  return (
    <CollectionMetadataWrapper>
      <div>
        <Heading>{id}</Heading>
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
