import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import * as Popover from '@radix-ui/react-popover';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, plugActions } from '../../store';
import {
  disconnectPlug,
  getPlugWalletBalance,
} from '../../integrations/plug';
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
  const [wicpBalance, setWicpBalance] = useState('');

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

  const myActivityHandler = useCallback(() => {
    navigate(`/activity/${userPrincipal}`);
    setOpenDropdown(false);
  }, [navigate, userPrincipal]);

  useLayoutEffect(() => {
    if (openDropdown) {
      // Add class after portal is added to the DOM
      setTimeout(() => {
        const portalElement = document.querySelector(
          '[data-radix-portal]',
        );
        portalElement?.classList.add('above-nav');
      });

      const scrollEvent = () => setOpenDropdown(false);
      window.addEventListener('scroll', scrollEvent);
      return () => window.removeEventListener('scroll', scrollEvent);
    }
  }, [openDropdown]);

  const handleClick = useCallback(() => {
    if (isConnected) {
      setOpenDropdown(!openDropdown);
    } else {
      handleConnect();
    }
  }, [handleConnect, isConnected, openDropdown]);

  const getPlugWICPBalance = async () => {
    const allPlugBalance = await getPlugWalletBalance();

    const wicpBalance = allPlugBalance.find(
      (balance: any) => balance?.name === 'Wrapped ICP',
    );

    return wicpBalance?.amount;
  };

  useEffect(() => {
    getPlugWICPBalance().then((data) => {
      setWicpBalance(data);
    });
  }, [wicpBalance]);

  return (
    <Popover.Root open={openDropdown}>
      <PopoverTrigger asChild>
        <PlugButtonContainer
          onClick={handleClick}
          className="plug-button"
        >
          <>{wicpBalance}</>
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

      {isConnected && (
        <ConnectToPlugButton
          align="end"
          className={themeObject}
          onMouseLeave={() => setOpenDropdown(false)}
        >
          <div>
            <ListItem onClick={myOffersHandler}>
              <Icon icon="offer" paddingRight />
              <p>{t('translation:buttons.action.myOffers')}</p>
            </ListItem>
            <ListItem onClick={myActivityHandler}>
              <Icon icon="activity" paddingRight />
              <p>{t('translation:buttons.action.myActivity')}</p>
            </ListItem>
            <ListItem onClick={disconnectHandler}>
              <Icon icon="disconnect" paddingRight />
              <p>{t('translation:buttons.action.disconnect')}</p>
            </ListItem>
          </div>
        </ConnectToPlugButton>
      )}
    </Popover.Root>
  );
};
