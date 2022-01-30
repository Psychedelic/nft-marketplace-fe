import React from 'react';
import { useTranslation } from 'react-i18next';
import { LinkButton } from '../buttons';

import { CollectionMetadataWrapper } from './styles';
import back from '../../../assets/buttons/back.svg';
import verified from '../../../assets/verified.svg';

export const CollectionMetadata = () => {
  const { t } = useTranslation();

  return (
    <CollectionMetadataWrapper>
      <div>
        <h3>2713</h3>
        <p>
          Crowns
          <img src={verified} alt="verified" />
        </p>
      </div>
      <LinkButton outline="light" text="bold">
        <img src={back} alt={t('translation:buttons.links.back')} />
      </LinkButton>
    </CollectionMetadataWrapper>
  );
};
