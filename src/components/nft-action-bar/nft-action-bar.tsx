import React from 'react';
import { useTranslation } from 'react-i18next';
import { ActionButton } from '../core';

import { NftActionBarWrapper } from './styles';
import back from '../../assets/back.svg';

const NftActionBar = () => {
  const { t } = useTranslation();

  return (
    <NftActionBarWrapper>
      <p>
        <img src={back} alt="back to results" />
        {t('translation:buttons.action.backToResults')}
      </p>
      <div>
        <ActionButton
          outline="light"
          text={`${t('translation:buttons.action.cancelListing')}`}
          type="outline"
        />
        &nbsp;
        <ActionButton
          background="filled"
          text={`${t('translation:buttons.action.changePrice')}`}
          type="primary"
        />
      </div>
    </NftActionBarWrapper>
  );
};

export default NftActionBar;
