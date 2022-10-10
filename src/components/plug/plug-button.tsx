import { useCallback, useLayoutEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as Popover from '@radix-ui/react-popover';

import { useTranslation } from 'react-i18next';
import {
  useAppDispatch,
  plugActions,
  useFilterStore,
  filterActions,
  RootState,
} from '../../store';
import { disconnectPlug } from '../../integrations/plug';
import { openSonicURL } from '../../utils/handle-redirect-urls';
import {
  PlugButtonContainer,
  PlugButtonText,
  PlugArrowDownIcon,
  ConnectToPlugButton,
  ListItem,
  PopoverTrigger,
  PlugIconStyled,
  WICPLogo,
} from './styles';
import { useTheme } from '../../hooks';
import { Icon } from '../icons';
import wicpImage from '../../assets/wicp.svg';
import PlugBalance from './plug-balance';
import { useSelector } from 'react-redux';

export type PlugButtonProps = {
  handleConnect: (dispatch: any) => void;
  text: string;
  isConnected: boolean;
  principalId?: string;
  isMobileScreen?: boolean;
};

/* --------------------------------------------------------------------------
 * Plug Button Component
 * --------------------------------------------------------------------------*/

export const PlugButton = ({
  handleConnect,
  text,
  isConnected,
  principalId: userPrincipal,
  isMobileScreen,
}: PlugButtonProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { defaultFilters } = useFilterStore();
  const [theme, themeObject] = useTheme();
  const [openDropdown, setOpenDropdown] = useState(false);

  const navigate = useNavigate();
  const collectionDetails = useSelector(
    (state: RootState) => state.marketplace.currentCollectionDetails,
  );

  const { collectionId } = collectionDetails;

  const disconnectHandler = useCallback(() => {
    dispatch(plugActions.setIsConnected(false));
    disconnectPlug();
    setOpenDropdown(false);
  }, [dispatch]);

  const myOffersHandler = useCallback(() => {
    navigate(`${collectionId}/offers/${userPrincipal}`);
    setOpenDropdown(false);
  }, [navigate, userPrincipal, collectionId]);

  const myActivityHandler = useCallback(() => {
    navigate(`${collectionId}/activity/${userPrincipal}`);
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
      handleConnect({ dispatch, t });
    }
  }, [handleConnect, isConnected, openDropdown]);

  const filterExists = (filterName: string) =>
    defaultFilters.some(
      (appliedFilter) => appliedFilter.filterName === filterName,
    );

  const setMyNfts = () => {
    navigate(`/${collectionId}`);
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
      {isConnected && <PlugBalance />}
      <PopoverTrigger asChild>
        <PlugButtonContainer
          onClick={handleClick}
          className="plug-button"
        >
          <PlugButtonText
            className="plug-button-text"
            isMobileScreen={isMobileScreen}
          >
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
            {collectionId && (
              <>
                <ListItem onClick={myOffersHandler}>
                  <Icon icon="offer" paddingRight />
                  <p>{t('translation:buttons.action.myOffers')}</p>
                </ListItem>
                <ListItem onClick={myActivityHandler}>
                  <Icon icon="activity" paddingRight />
                  <p>{t('translation:buttons.action.myActivity')}</p>
                </ListItem>
                <ListItem onClick={setMyNfts}>
                  <Icon icon="myNfts" paddingRight />
                  <p>{t('translation:buttons.action.myNfts')}</p>
                </ListItem>
              </>
            )}
            <ListItem onClick={openSonicURL}>
              <WICPLogo
                src={wicpImage}
                alt={t('translation:logoAlts.wicp')}
              />
              <p>{t('translation:buttons.action.getWicp')}</p>
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
