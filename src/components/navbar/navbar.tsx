import React from 'react';
import { useTranslation } from 'react-i18next';
import { PlugButton, LinkButton } from '../core';
import { GlobalSearch } from '../search';
import appLogo from '../../assets/app-logo.svg';
import appName from '../../assets/app-name.svg';
import darkTheme from '../../assets/buttons/dark-theme.svg';
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

export const NavBar = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <LogoContainer>
        <LogoIcon
          src={appLogo}
          alt={t('translation:common.collectionName')}
        />
        <LogoName
          src={appName}
          alt={t('translation:common.collectionName')}
        />
      </LogoContainer>
      <GlobalSearch />
      <ActionButtonsContainer>
        <LinkButton>
          <img src={darkTheme} alt="dark-theme" />
        </LinkButton>
        <PlugButton />
      </ActionButtonsContainer>
    </Container>
  );
};
