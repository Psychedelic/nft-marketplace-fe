import React from 'react';
import { useTranslation } from 'react-i18next';
import { LinkButton, Tooltip } from '../core';

import {
  CollectionMetadataWrapper,
  Heading,
  Subtext,
} from './styles';
import back from '../../assets/buttons/back.svg';
import verified from '../../assets/verified-small.svg';

export const NFTMetaData = () => {
  const { t } = useTranslation();

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
          <img src={back} alt={t('translation:buttons.links.back')} />
        </LinkButton>
      </Tooltip>
    </CollectionMetadataWrapper>
  );
};
