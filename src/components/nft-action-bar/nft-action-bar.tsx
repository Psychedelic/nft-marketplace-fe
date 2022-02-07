import React from 'react';
import { useTranslation } from 'react-i18next';
import { ActionButton } from '../core';

import {
  NftActionBarWrapper,
  ActionText,
  ButtonWrapper,
} from './styles';
import back from '../../assets/back.svg';

export const NftActionBar = () => {
  const { t } = useTranslation();

  return (
    <NftActionBarWrapper>
      <ActionText>
        <img src={back} alt="back to results" />
        {t('translation:buttons.action.backToResults')}
      </ActionText>
      <ButtonWrapper>
        <ActionButton
          outline="light"
          text={`${t('translation:buttons.action.cancelListing')}`}
          type="outline"
        />
        <ActionButton
          background="filled"
          text={`${t('translation:buttons.action.changePrice')}`}
          type="primary"
        />
      </ButtonWrapper>
    </NftActionBarWrapper>
  );
};
