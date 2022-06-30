import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import * as Popover from '@radix-ui/react-popover';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  useAppDispatch,
  plugActions,
  notificationActions,
  RootState,
  useFilterStore,
  filterActions,
} from '../../store';
import { useSelector } from 'react-redux';
import {
  disconnectPlug,
  getPlugWalletBalance,
} from '../../integrations/plug';
import { openSonicURL } from '../../utils/ handle-redirect-urls';
import {
  PlugButtonContainer,
  PlugButtonText,
  PlugArrowDownIcon,
  ConnectToPlugButton,
  ListItem,
  PopoverTrigger,
  PlugIconStyled,
  WICPBalance,
  WICPLogo,
} from './styles';
import { useTheme } from '../../hooks';
import { Icon } from '../icons';
import { SpinnerIcon } from '../icons/custom';
import { AppLog } from '../../utils/log';
import wicpImage from '../../assets/wicp.svg';

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
  const { isMyNfts, defaultFilters } = useFilterStore();
  const [theme, themeObject] = useTheme();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [wicpBalance, setWicpBalance] = useState('');
  const [loadingWicpBalance, setLoadingWicpBalance] = useState(false);

  const navigate = useNavigate();

  const recentlyPurchasedTokens = useSelector(
    (state: RootState) => state.marketplace.recentlyPurchasedTokens,
  );

  const recentlyMadeOffers = useSelector(
    (state: RootState) => state.marketplace.recentlyMadeOffers,
  );

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

  useEffect(() => {
    if (!isConnected) return;

    (async () => {
      setLoadingWicpBalance(true);
      try {
        const allPlugBalance = await getPlugWalletBalance();

        const wicpWalletBalance = allPlugBalance?.find(
          (balance: any) => balance?.name === 'Wrapped ICP',
        );

        setWicpBalance(wicpWalletBalance?.amount);
        setLoadingWicpBalance(false);
      } catch (err) {
        setLoadingWicpBalance(false);
        AppLog.error(err);
        dispatch(
          notificationActions.setErrorMessage(
            t('translation:errorMessages.unableToGetBalance'),
          ),
        );
      }
    })();
  }, [
    isConnected,
    recentlyPurchasedTokens,
    recentlyMadeOffers,
  ]);

  const filterExists = (filterName: string) =>
    defaultFilters.some(
      (appliedFilter) => appliedFilter.filterName === filterName,
    );

  const setMyNfts = () => {
    dispatch(filterActions.setMyNfts(true));
    if (filterExists(t('translation:buttons.action.myNfts'))) return;
    dispatch(
      filterActions.applyFilter({
        filterName: `${t('translation:buttons.action.myNfts')}`,
        filterCategory: 'Display',
      }),
    );
  };

  return (
    <Popover.Root open={openDropdown}>
      {isConnected && (
        <WICPBalance>
          <WICPLogo
            src={wicpImage}
            alt={t('translation:logoAlts.wicp')}
          />
          {wicpBalance !== '' && !loadingWicpBalance ? (
            `${wicpBalance} WICP`
          ) : (
            <SpinnerIcon />
          )}
        </WICPBalance>
      )}
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
            <ListItem onClick={openSonicURL}>
              <WICPLogo
                src={wicpImage}
                alt={t('translation:logoAlts.wicp')}
              />
              <p>{t('translation:buttons.action.getWicp')}</p>
              </ListItem>
            <ListItem onClick={setMyNfts}>
              <Icon icon="myNfts" paddingRight />
              <p>{t('translation:buttons.action.myNfts')}</p>
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
