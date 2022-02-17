import React from 'react';
import { useTranslation } from 'react-i18next';
import { PlugButton } from '../core';
import { usePlugStore } from '../../store';
import { PLUG_WALLET_WEBSITE_URL } from '../../constants';

export const Plug = () => {
  const { t } = useTranslation();
  const { isInstalled } = usePlugStore();

  const handleConnectToPlug = () => {
    // eslint-disable-next-line no-console
    console.log('connect to plug');
  };

  const handleClick = () => {
    if (!isInstalled) {
      window.open(PLUG_WALLET_WEBSITE_URL, '_blank');
      return;
    }

    handleConnectToPlug();
  };

  return (
    <>
      <PlugButton
        handleClick={handleClick}
        text={
          isInstalled
            ? t('translation:buttons.action.connectToPlug')
            : t('translation:buttons.action.installPlug')
        }
      />
    </>
  );
};
