import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ColourModeContext } from '../../theme-context/theme-context-provider';
import { PlugButton, LinkButton, Tooltip } from '../core';
import { GlobalSearch } from '../search';
import appLogo from '../../assets/app-logo.svg';
import appName from '../../assets/app-name.svg';
import darkTheme from '../../assets/buttons/dark-theme.svg';
import lightTheme from '../../assets/buttons/light-theme.svg';
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

const ColorModeToggleButton = () => (
  <ColourModeContext.Consumer>
    {(context: any) => (
      <LinkButton handleClick={context.cycleToggleMode}>
        <img
          src={context.colorMode !== 'dark' ? darkTheme : lightTheme}
          alt="dark-theme"
        />
      </LinkButton>
    )}
  </ColourModeContext.Consumer>
);

export const NavBar = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <RouterLink to="/">
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
      </RouterLink>
      <GlobalSearch />
      <ActionButtonsContainer>
        <Tooltip text={t('translation:common.comingSoon')}>
          <ColorModeToggleButton />
        </Tooltip>
        <PlugButton />
      </ActionButtonsContainer>
    </Container>
  );
};
