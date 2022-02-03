import React from 'react';
import { useTranslation } from 'react-i18next';
import { SearchInput, PlugButton, LinkButton } from '../core';
import appLogo from '../../assets/app-logo.svg';
import appName from '../../assets/app-name.svg';
import darkTheme from '../../assets/buttons/dark-theme.svg';
import {
  Container,
  LogoContainer,
  LogoIcon,
  LogoName,
  SearchContainer,
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
      <SearchContainer>
        <SearchInput
          placeholder={t(
            'translation:inputField.placeholder.searchCollection',
          )}
          handleClick={() => {
            // eslint-disable-next-line no-console
            console.log('click callback');
          }}
        />
      </SearchContainer>
      <ActionButtonsContainer>
        <LinkButton>
          <img src={darkTheme} alt="dark-theme" />
        </LinkButton>
        <PlugButton />
      </ActionButtonsContainer>
    </Container>
  );
};
