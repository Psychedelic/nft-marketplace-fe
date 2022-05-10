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
import {
  ChevronDownIcon,
  DisconnectIcon,
  Icon,
  OfferIcon,
} from '../icons';

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
      <PopoverTrigger asChild>
        <PlugButtonContainer
          onClick={handleClick}
          onMouseEnter={() => setOpenDropdown(true)}
          className="plug-button"
        >
          <PlugButtonText className="plug-button-text">
            {isConnected && (
              <PlugIconStyled dark={theme === 'darkTheme'} />
            )}
            {text}
            {isConnected && (
              <PlugArrowDownIcon
                size="sm"
                icon={ChevronDownIcon}
                rotate={openDropdown}
                noPadding
              />
            )}
          </PlugButtonText>
        </PlugButtonContainer>
      </PopoverTrigger>

      <Popover.Content onMouseLeave={() => setOpenDropdown(false)}>
        {isConnected && (
          <ConnectToPlugButton align="end" className={themeObject}>
            <ListItem onClick={myOffersHandler}>
              <Icon icon={OfferIcon} />
              <p>{t('translation:buttons.action.myOffers')}</p>
            </ListItem>
            <ListItem onClick={disconnectHandler}>
              <Icon icon={DisconnectIcon} />
              <p>{t('translation:buttons.action.disconnect')}</p>
            </ListItem>
          </ConnectToPlugButton>
        )}
      </Popover.Content>
    </Popover.Root>
  );
};
