import React from 'react';
import copyToClipboard from 'copy-to-clipboard';
import { useTranslation } from 'react-i18next';
import { notificationActions, useAppDispatch } from '../../store';
import { LinkButton } from '../core';

import {
  CollectionMetadataWrapper,
  Heading,
  Subtext,
} from './styles';
import verified from '../../assets/verified-small.svg';
import { Icon } from '../icons';

export interface NFTMetaDataProps {
  id?: string;
}

export const NFTMetaData = ({ id }: NFTMetaDataProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <CollectionMetadataWrapper>
      <div>
        <Heading>{id}</Heading>
        <Subtext>
          Crowns
          <img src={verified} alt="verified" />
        </Subtext>
      </div>
      <LinkButton
        handleClick={() => {
          copyToClipboard(window.location.href);
          dispatch(
            notificationActions.setSuccessMessage(
              `${t('translation:successMessages.copyToClipboard')}`,
            ),
          );
        }}
      >
        <Icon icon="share" />
        <img alt={t('translation:buttons.links.back')} />
      </LinkButton>
    </CollectionMetadataWrapper>
  );
};
