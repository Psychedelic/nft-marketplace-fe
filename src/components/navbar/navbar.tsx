import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ColourModeContext } from '../../ColourModeProvider';
import { PlugButton, LinkButton, Tooltip } from '../core';
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

const ColorModeToggleButton = () => (
  <ColourModeContext.Consumer>
    {(context: any) => (
      <button type="button" onClick={context.cycleToggleMode}>
        Mode:
        {context.colorMode}
      </button>
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
          <ColorModeToggleButton />
          <LogoName
            src={appName}
            alt={t('translation:common.collectionName')}
          />
        </LogoContainer>
      </RouterLink>
      <GlobalSearch />
      <ActionButtonsContainer>
        <Tooltip text={t('translation:common.comingSoon')}>
          <LinkButton>
            <img src={darkTheme} alt="dark-theme" />
          </LinkButton>
        </Tooltip>
        <PlugButton />
      </ActionButtonsContainer>
    </Container>
  );
};
