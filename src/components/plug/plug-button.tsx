import React from 'react';
import * as HoverCard from '@radix-ui/react-hover-card';
import {
  useAppDispatch,
  usePlugStore,
  useThemeStore,
  plugActions,
} from '../../store';
import {
  PlugButtonContainer,
  PlugButtonText,
  PlugIcon,
  PlugArrowDownIcon,
  ConnectToPlugButton,
  Flex,
} from './styles';
import plugIcon from '../../assets/plug-icon.svg';
import plugIconDark from '../../assets/plug-icon-dark.svg';
import arrowdown from '../../assets/arrowdown.svg';
import arrowdownDark from '../../assets/arrowdown-dark.svg';
import offers from '../../assets/buttons/offers.svg';
import disconnect from '../../assets/buttons/disconnect.svg';
import offersDark from '../../assets/buttons/offers-dark.svg';
import disconnectDark from '../../assets/buttons/disconnect-dark.svg';

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
  const dispatch = useAppDispatch();
  const { theme } = useThemeStore();
  const { isConnected } = usePlugStore();
  const isLightTheme = theme === 'lightTheme';
  const currTheme = theme === 'darkTheme' ? 'dark' : 'light';

  return (
    <HoverCard.Root openDelay={300}>
      <HoverCard.Trigger>
        <PlugButtonContainer
          onClick={handleClick}
          className="plug-button"
        >
          <PlugButtonText className="plug-button-text">
            {isConnected && (
              <PlugIcon
                src={isLightTheme ? plugIcon : plugIconDark}
              />
            )}
            {text}
            {isConnected && (
              <PlugArrowDownIcon
                src={isLightTheme ? arrowdown : arrowdownDark}
              />
            )}
          </PlugButtonText>
        </PlugButtonContainer>
      </HoverCard.Trigger>
      {isConnected && (
        <ConnectToPlugButton align="end" background={currTheme}>
          <Flex>
            <img
              src={isLightTheme ? offers : offersDark}
              alt="offers"
            />
            <p>My Offers</p>
          </Flex>
          <div />
          <Flex
            onClick={() =>
              dispatch(plugActions.setIsConnected(false))
            }
          >
            <img
              src={isLightTheme ? disconnect : disconnectDark}
              alt="disconnect"
            />
            <p>Disconnect</p>
          </Flex>
        </ConnectToPlugButton>
      )}
    </HoverCard.Root>
  );
};
