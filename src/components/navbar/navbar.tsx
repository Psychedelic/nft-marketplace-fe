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
  LogoSearchWrapper,
  NavText,
  StyledChevronIcon,
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

  const revertMobileNavAnimation = () => {
    setTimeout(() => {
      setOpenMobileSearchbar(false);
      setStartAnimation(false);
    }, 700);
    setStopAnimation(true);
  };

  return (
    <Container
      showAlerts={showAlerts}
      openMobileNavbar={openMobileNavbar}
    >
      <NavBarWrapper>
        <LogoSearchWrapper>
          <StyleRouter
            to="/"
            onClick={() => {
              pathname === '/' && window.location.reload();
              setOpenMobileNavbar(false);
            }}
            startAnimation={startAnimation}
          >
            <LogoContainer
              style={{
                marginRight: '15px',
              }}
            >
              <LogoIcon
                src={isLightTheme ? jelly : jellyDark}
                alt={t('translation:common.collectionName')}
              />
            </LogoContainer>
          </StyleRouter>
          {!isMobileScreen && (
            <GlobalSearch
              startAnimation={startAnimation}
              isMobileScreen={isMobileScreen}
              revertMobileNavAnimation={revertMobileNavAnimation}
            />
          )}
        </LogoSearchWrapper>
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
        {isMobileScreen && (
          <GlobalSearch
            startAnimation={startAnimation}
            isMobileScreen={isMobileScreen}
            revertMobileNavAnimation={revertMobileNavAnimation}
          />
        )}
        {!isMobileScreen && (
          <ActionButtonsContainer>
            <NavText>
              {t('translation:navbar.community')}
              <StyledChevronIcon size="sm" icon="chevron-down" />
            </NavText>
            <NavText>{t('translation:navbar.create')}</NavText>
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
                setOpenMobileNavbar(false);
                setOpenMobileSearchbar(true);
                setStartAnimation(true);
                stopAnimation && setStopAnimation(false);
              }}
            />
            <MobileNavbarIcons
              icon={openMobileNavbar ? 'close' : 'hamburger'}
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
