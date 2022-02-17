import React from 'react';
import { useTranslation } from 'react-i18next';
import { PlugButton } from '../core';

export const Plug = () => {
  const { t } = useTranslation();

  return (
    <>
      <PlugButton
        handleClick={() => {
          // eslint-disable-next-line no-console
          console.log('connect to plug');
        }}
        text={t('translation:buttons.action.connectToPlug')}
      />
    </>
  );
};
