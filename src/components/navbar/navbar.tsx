import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PlugButton, LinkButton, Tooltip } from '../core';
import { GlobalSearch } from '../search';
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
  currentTheme: string;
  setCurrentTheme: (value: string) => void;
};

export const NavBar = ({
  setCurrentTheme,
  currentTheme,
}: NavbarProps) => {
  const { t } = useTranslation();
  const selectedTheme = currentTheme === 'darkTheme' ? 'lightTheme' : 'darkTheme';
  const [theme, setTheme] = useState('lightTheme');

  useEffect(() => {
    const getTheme = localStorage.getItem('theme');
    setTheme(getTheme);
  });

  return (
    <Container>
      <RouterLink to="/">
        <LogoContainer>
          <LogoIcon
            src={appLogo}
            alt={t('translation:common.collectionName')}
          />
          <LogoName
            src={theme === 'lightTheme' ? appName : appNameDark}
            alt={t('translation:common.collectionName')}
          />
        </LogoContainer>
      </RouterLink>
      <GlobalSearch />
      <ActionButtonsContainer>
        <Tooltip text={t('translation:common.comingSoon')}>
          <LinkButton
            handleClick={() => {
              setCurrentTheme(selectedTheme);
              localStorage.setItem('theme', selectedTheme);
            }}
          >
            <img
              src={currentTheme === 'lightTheme' ? moon : sun}
              alt={currentTheme}
            />
          </LinkButton>
        </Tooltip>
        <PlugButton />
      </ActionButtonsContainer>
    </Container>
  );
};
