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
  BackIcon,
  MobileSearchBarActions,
  StyleRouter,
} from './styles';
import { Icon } from '../icons';
import { useBuyerOffers } from '../../hooks/use-buyer-offers';
import { MobileNavBar } from './mobile-nav-bar';
import useMediaQuery from '../../hooks/use-media-query';

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
  const [openMobileNavbar, setOpenMobileNavbar] = useState(false);
  const [openMobileSearchbar, setOpenMobileSearchbar] =
    useState(false);
  const [startAnimation, setStartAnimation] = useState(false);
  const [stopAnimation, setStopAnimation] = useState(false);
  const isMobileScreen = useMediaQuery('(max-width: 850px)');

  const changeThemeHandler = useCallback(() => {
    dispatch(
      themeActions.setTheme(
        isLightTheme ? 'darkTheme' : 'lightTheme',
      ),
    );
  }, [isLightTheme, dispatch]);

  useBuyerOffers();

  return (
    <Container
      showAlerts={showAlerts}
      openMobileNavbar={openMobileNavbar}
    >
      <NavBarWrapper>
        <StyleRouter
          to="/"
          onClick={() => pathname === '/' && window.location.reload()}
          startAnimation={startAnimation}
        >
          <LogoContainer>
            <LogoIcon
              src={isLightTheme ? jelly : jellyDark}
              alt={t('translation:common.collectionName')}
            />
          </LogoContainer>
        </StyleRouter>
        <MobileSearchBarActions>
          <BackIcon
            icon="back"
            startAnimation={startAnimation}
            stopAnimation={stopAnimation}
            size="lg"
            onClick={() => {
              setTimeout(() => {
                setOpenMobileSearchbar(false);
                setStartAnimation(false);
              }, 700);
              setStopAnimation(true);
            }}
          />
        </MobileSearchBarActions>
        <GlobalSearch
          startAnimation={startAnimation}
          isMobileScreen={isMobileScreen}
        />
        {!isMobileScreen && (
          <ActionButtonsContainer>
            <LinkButton handleClick={changeThemeHandler}>
              <Icon icon={isLightTheme ? 'moon' : 'sun'} />
            </LinkButton>
            <Plug />
          </ActionButtonsContainer>
        )}
        {isMobileScreen && (
          <MobileMenuContainer
            startAnimation={startAnimation}
            stopAnimation={stopAnimation}
          >
            <MobileNavbarIcons
              icon="search"
              size="md"
              paddingRight
              onClick={() => {
                setOpenMobileSearchbar(true);
                setStartAnimation(true);
                stopAnimation && setStopAnimation(false);
              }}
            />
            <MobileNavbarIcons
              icon="hamburger"
              size="lg"
              paddingLeft
              onClick={() => setOpenMobileNavbar(!openMobileNavbar)}
            />
          </MobileMenuContainer>
        )}
      </NavBarWrapper>
      {isMobileScreen && (
        <MobileNavBar
          openMobileNavbar={openMobileNavbar}
          setOpenMobileNavbar={setOpenMobileNavbar}
          changeThemeHandler={changeThemeHandler}
        />
      )}
    </Container>
  );
};
