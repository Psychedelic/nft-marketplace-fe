import React from 'react';
import { useThemeStore } from '../../../store';
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
  const isLightTheme = theme === 'lightTheme';

  return (
    <PlugButtonContainer onClick={handleClick} className="plug-button">
      <PlugButtonText>
        <PlugIcon src={isLightTheme ? plugIcon : plugIconDark} />
        {text}
        <PlugArrowDownIcon src={isLightTheme ? arrowdown : arrowdownDark} />
      </PlugButtonText>
    </PlugButtonContainer>
  );
};
