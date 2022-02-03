import React from 'react';
import { useTranslation } from 'react-i18next';
import { PlugButtonContainer, PlugButtonText } from './styles';

/* --------------------------------------------------------------------------
 * Plug Button Component
 * --------------------------------------------------------------------------*/

export const PlugButton = () => {
  const { t } = useTranslation();

  return (
    <PlugButtonContainer>
      <PlugButtonText>
        {t('translation:buttons.action.connectToPlug')}
      </PlugButtonText>
    </PlugButtonContainer>
  );
};
