import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCallback, useState } from 'react';
import {
  useThemeStore,
  themeActions,
  useAppDispatch,
  useSettingsStore,
} from '../../store';
import { LinkButton } from '../core';
import { GlobalSearch } from '../search';
import { Plug } from '../plug';
import jelly from '../../assets/jelly-full-image.svg';
import jellyDark from '../../assets/jelly-full-image-dark.svg';
import {
  Container,
  LogoContainer,
  LogoIcon,
  ActionButtonsContainer,
  MobileMenuContainer,
  NavBarWrapper,
  MobileNavbarIcons,
} from './styles';
import { Icon } from '../icons';
import { useBuyerOffers } from '../../hooks/use-buyer-offers';
import { MobileNavBar } from './mobile-nav-bar';

/* --------------------------------------------------------------------------
 * NavBar Component
 * --------------------------------------------------------------------------*/

export const NavBar = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { theme } = useThemeStore();
  const { showAlerts } = useSettingsStore();
  const { pathname } = useLocation();
  const isLightTheme = theme === 'lightTheme';
  const [openMobileNavbar, setOpenMobileNavbar] = useState(true);

  const changeThemeHandler = useCallback(() => {
    dispatch(
      themeActions.setTheme(
        isLightTheme ? 'darkTheme' : 'lightTheme',
      ),
    );
  }, [isLightTheme, dispatch]);

  useBuyerOffers();

  return (
    <Container showAlerts={showAlerts} openMobileNavbar={openMobileNavbar}>
      <NavBarWrapper>
        <RouterLink
          to="/"
          onClick={() => pathname === '/' && window.location.reload()}
        >
          <LogoContainer>
            <LogoIcon
              src={isLightTheme ? jelly : jellyDark}
              alt={t('translation:common.collectionName')}
            />
          </LogoContainer>
        </RouterLink>
        <GlobalSearch />
        <ActionButtonsContainer>
          <LinkButton handleClick={changeThemeHandler}>
            <Icon icon={isLightTheme ? 'moon' : 'sun'} />
          </LinkButton>
          <Plug />
        </ActionButtonsContainer>
        <MobileMenuContainer>
          <MobileNavbarIcons icon="search" size="md" paddingRight />
          <MobileNavbarIcons
            icon="hamburger"
            size="lg"
            paddingLeft
            onClick={() => setOpenMobileNavbar(!openMobileNavbar)}
          />
        </MobileMenuContainer>
      </NavBarWrapper>
      <MobileNavBar
        openMobileNavbar={openMobileNavbar}
        setOpenMobileNavbar={setOpenMobileNavbar}
        changeThemeHandler={changeThemeHandler}
      />
    </Container>
  );
};
