import React from 'react';
import { useTranslation } from 'react-i18next';
import { PlugButtonContainer, PlugButtonText } from './styles';

export type PlugButtonProps = {
  handleClick: () => void;
};

/* --------------------------------------------------------------------------
 * Plug Button Component
 * --------------------------------------------------------------------------*/

export const PlugButton = ({ handleClick }: PlugButtonProps) => {
  const { t } = useTranslation();

  return (
    <PlugButtonContainer onClick={handleClick}>
      <PlugButtonText>
        {t('translation:buttons.action.connectToPlug')}
      </PlugButtonText>
    </PlugButtonContainer>
  );
};
