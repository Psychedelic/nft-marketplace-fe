import React from 'react';
import { useTranslation } from 'react-i18next';
import { ActionButton } from '..';

import { NftActionBarWrapper } from './styles';
import back from '../../../assets/back.svg';

const NftActionBar = () => {
  const { t } = useTranslation();

  return (
    <NftActionBarWrapper>
      <p>
        <img src={back} alt="back to results" />
        {t('translation:buttons.action.backToResults')}
      </p>
      <div>
        <ActionButton outline="light" text="bold">
          {t('translation:buttons.action.cancelListing')}
        </ActionButton>
        &nbsp;
        &nbsp;
        <ActionButton background="filled" text="bold">
          {t('translation:buttons.action.changePrice')}
        </ActionButton>
      </div>
    </NftActionBarWrapper>
  );
};

export default NftActionBar;
