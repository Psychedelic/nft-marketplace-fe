import { useCallback, useEffect, useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, plugActions } from '../../store';
import { disconnectPlug } from '../../integrations/plug';
import {
  PlugButtonContainer,
  PlugButtonText,
  PlugArrowDownIcon,
  ConnectToPlugButton,
  ListItem,
  PopoverTrigger,
  PlugIconStyled,
} from './styles';
import { useTheme } from '../../hooks';
import { Icon } from '../icons';

export type PlugButtonProps = {
  handleConnect: () => void;
  text: string;
  isConnected: boolean;
  principalId?: string;
};

/* --------------------------------------------------------------------------
 * Plug Button Component
 * --------------------------------------------------------------------------*/

export const PlugButton = ({
  handleConnect,
  text,
  isConnected,
  principalId: userPrincipal,
}: PlugButtonProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [theme, themeObject] = useTheme();
  const [openDropdown, setOpenDropdown] = useState(false);

  const navigate = useNavigate();

  const disconnectHandler = useCallback(() => {
    dispatch(plugActions.setIsConnected(false));
    disconnectPlug();
    setOpenDropdown(false);
  }, [dispatch]);

  const myOffersHandler = useCallback(() => {
    navigate(`/offers/${userPrincipal}`);
    setOpenDropdown(false);
  }, [navigate, userPrincipal]);

  useEffect(() => {
    const scrollEvent = () => setOpenDropdown(false);
    window.addEventListener('scroll', scrollEvent);
    return () => window.removeEventListener('scroll', scrollEvent);
  }, []);

  const handleClick = useCallback(() => {
    if (isConnected) {
      setOpenDropdown(!openDropdown);
    } else {
      handleConnect();
    }
  }, [handleConnect, isConnected, openDropdown]);

  return (
    <Popover.Root open={openDropdown}>
      <PopoverTrigger asChild>
        <PlugButtonContainer
          onClick={handleClick}
          className="plug-button"
        >
          <PlugButtonText className="plug-button-text">
            {isConnected && (
              <PlugIconStyled
                icon="plug"
                extraIconProps={{ dark: theme === 'darkTheme' }}
              />
            )}
            {text}
            {isConnected && (
              <PlugArrowDownIcon
                icon="chevron-down"
                rotate={openDropdown}
              />
            )}
          </PlugButtonText>
        </PlugButtonContainer>
      </PopoverTrigger>

      <Popover.Content onMouseLeave={() => setOpenDropdown(false)}>
        {isConnected && (
          <ConnectToPlugButton align="end" className={themeObject}>
            <ListItem onClick={myOffersHandler}>
              <Icon icon="offer" paddingRight />
              <p>{t('translation:buttons.action.myOffers')}</p>
            </ListItem>
            <ListItem onClick={disconnectHandler}>
              <Icon icon="disconnect" paddingRight />
              <p>{t('translation:buttons.action.disconnect')}</p>
            </ListItem>
          </ConnectToPlugButton>
        )}
      </Popover.Content>
    </Popover.Root>
  );
};
