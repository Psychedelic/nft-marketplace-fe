import React, { useEffect, useState } from 'react';
import * as Dropdown from '@radix-ui/react-dropdown-menu';
import { useNavigate } from 'react-router-dom';
import {
  useAppDispatch,
  usePlugStore,
  useThemeStore,
  plugActions,
} from '../../store';
import { disconnectPlug } from '../../integrations/plug';
import {
  PlugButtonContainer,
  PlugButtonText,
  PlugIcon,
  PlugArrowDownIcon,
  ConnectToPlugButton,
  DropdownTrigger,
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
  const [openDropdown, setOpenDropdown] = useState(false);
  const isLightTheme = theme === 'lightTheme';
  const currTheme = theme === 'darkTheme' ? 'dark' : 'light';

  const [userPrincipal, setUserPrincipal] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    // TODO: check if principal already available in the store
    (async () => {
      const principal = await (
        window as any
      ).ic?.plug?.getPrincipal();

      if (!principal) return;

      setUserPrincipal(principal.toString());
    })();
  }, []);

  return (
    <Dropdown.Root
      onOpenChange={() => {
        setOpenDropdown(!openDropdown);
      }}
      open={openDropdown}
    >
      <DropdownTrigger asChild>
        <PlugButtonContainer
          onClick={handleClick}
          onMouseEnter={() => {
            setOpenDropdown(true);
          }}
          onMouseLeave={() => {
            setTimeout(() => setOpenDropdown(false), 1500);
          }}
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
      </DropdownTrigger>
      {isConnected && (
        <ConnectToPlugButton align="end" background={currTheme}>
          <Flex onClick={() => navigate(`/offers/${userPrincipal}`)}>
            <img
              src={isLightTheme ? offers : offersDark}
              alt="offers"
            />
            <p>My Offers</p>
          </Flex>
          <div />
          <Flex
            onClick={() => {
              dispatch(plugActions.setIsConnected(false));
              disconnectPlug();
            }}
          >
            <img
              src={isLightTheme ? disconnect : disconnectDark}
              alt="disconnect"
            />
            <p>Disconnect</p>
          </Flex>
        </ConnectToPlugButton>
      )}
    </Dropdown.Root>
  );
};
