import React from 'react';
import { useTranslation } from 'react-i18next';
import { LinkButton } from '../core/buttons';

import {
  CollectionMetadataWrapper,
  Heading,
  Subtext,
} from './styles';
import back from '../../assets/buttons/back.svg';
import verified from '../../assets/verified-small.svg';

export const NFTOverview = () => {
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
      <LinkButton outline="light" text="bold">
        <img src={back} alt={t('translation:buttons.links.back')} />
      </LinkButton>
    </CollectionMetadataWrapper>
  );
};
