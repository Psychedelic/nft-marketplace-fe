import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  useThemeStore,
  themeActions,
  useAppDispatch,
} from '../../store';
import { LinkButton, Tooltip } from '../core';
import { GlobalSearch } from '../search';
import { Plug } from '../plug';
import appLogo from '../../assets/app-logo.svg';
import appName from '../../assets/app-name.svg';
import appNameDark from '../../assets/app-name-dark.svg';
import moon from '../../assets/buttons/dark-theme.svg';
import sun from '../../assets/buttons/light-theme.svg';
import {
  Container,
  LogoContainer,
  LogoIcon,
  LogoName,
  ActionButtonsContainer,
} from './styles';

/* --------------------------------------------------------------------------
 * NavBar Component
 * --------------------------------------------------------------------------*/

export type NavbarProps = {
  currentTheme: string | null;
};

export const NavBar = ({ currentTheme }: NavbarProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { theme } = useThemeStore();
  const isLightTheme = theme === 'lightTheme';
  const selectedTheme = currentTheme === 'darkTheme' ? 'lightTheme' : 'darkTheme';

  return (
    <Container>
      <RouterLink to="/">
        <LogoContainer>
          <LogoIcon
            src={appLogo}
            alt={t('translation:common.collectionName')}
          />
          <LogoName
            src={
              isLightTheme ? appName : appNameDark
            }
            alt={t('translation:common.collectionName')}
          />
        </LogoContainer>
      </RouterLink>
      <GlobalSearch />
      <ActionButtonsContainer>
        <Tooltip text={t('translation:common.comingSoon')}>
          <LinkButton
            handleClick={() => dispatch(themeActions.setTheme(selectedTheme))}
          >
            <img
              src={isLightTheme ? moon : sun}
              alt=""
            />
          </LinkButton>
        </Tooltip>
        <Plug />
      </ActionButtonsContainer>
    </Container>
  );
};
