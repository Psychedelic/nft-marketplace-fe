import { useCallback, useEffect, useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, plugActions } from '../../store';
import { disconnectPlug } from '../../integrations/plug';
import {
  PlugButtonContainer,
  PlugButtonText,
  PlugIcon,
  PlugArrowDownIcon,
  ConnectToPlugButton,
  ListItem,
} from './styles';
import plugIcon from '../../assets/plug-icon.svg';
import plugIconDark from '../../assets/plug-icon-dark.svg';
import arrowdown from '../../assets/arrowdown.svg';
import arrowdownDark from '../../assets/arrowdown-dark.svg';
import offers from '../../assets/buttons/offers.svg';
import disconnect from '../../assets/buttons/disconnect.svg';
import offersDark from '../../assets/buttons/offers-dark.svg';
import disconnectDark from '../../assets/buttons/disconnect-dark.svg';
import { useTheme } from '../../hooks';

export type PlugButtonProps = {
  handleClick: () => void;
  text: string;
  isConnected: boolean;
  principalId?: string;
};

/* --------------------------------------------------------------------------
 * Plug Button Component
 * --------------------------------------------------------------------------*/

export const PlugButton = ({
  handleClick,
  text,
  isConnected,
  principalId: userPrincipal,
}: PlugButtonProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [theme, themeObject] = useTheme();
  const [openDropdown, setOpenDropdown] = useState(false);
  const isLightTheme = theme === 'lightTheme';

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

  return (
    <Popover.Root open={openDropdown}>
      <Popover.Trigger asChild>
        <PlugButtonContainer
          onClick={handleClick}
          onMouseEnter={() => setOpenDropdown(true)}
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
      </Popover.Trigger>

      <Popover.Content onMouseLeave={() => setOpenDropdown(false)}>
        {isConnected && (
          <ConnectToPlugButton align="end" className={themeObject}>
            <ListItem onClick={myOffersHandler}>
              <img
                src={isLightTheme ? offers : offersDark}
                alt="offers"
              />
              <p>{t('translation:buttons.action.myOffers')}</p>
            </ListItem>
            <ListItem onClick={disconnectHandler}>
              <img
                src={isLightTheme ? disconnect : disconnectDark}
                alt="disconnect"
              />
              <p>{t('translation:buttons.action.disconnect')}</p>
            </ListItem>
          </ConnectToPlugButton>
        )}
      </Popover.Content>
    </Popover.Root>
  );
};
