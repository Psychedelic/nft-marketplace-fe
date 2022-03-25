import React from 'react';
import { usePlugStore, useThemeStore } from '../../../store';
import { PlugButtonContainer, PlugButtonText, PlugIcon, PlugArrowDownIcon } from './styles';
import plugIcon from '../../../assets/plug-icon.svg';
import plugIconDark from '../../../assets/plug-icon-dark.svg';
import arrowdown from '../../../assets/arrowdown.svg';
import arrowdownDark from '../../../assets/arrowdown-dark.svg';

export type PlugButtonProps = {
  handleClick: () => void;
  text: string;
};

/* --------------------------------------------------------------------------
 * Plug Button Component
 * --------------------------------------------------------------------------*/

export const PlugButton = ({
  handleClick,
  text,
}: PlugButtonProps) => {
  const { theme } = useThemeStore();
  const { isConnected } = usePlugStore();
  const isLightTheme = theme === 'lightTheme';

  return (
    <PlugButtonContainer onClick={handleClick} className="plug-button">
      <PlugButtonText>
        {isConnected && <PlugIcon src={isLightTheme ? plugIcon : plugIconDark} />}
        {text}
        {isConnected && <PlugArrowDownIcon src={isLightTheme ? arrowdown : arrowdownDark} />}
      </PlugButtonText>
    </PlugButtonContainer>
  );
};
