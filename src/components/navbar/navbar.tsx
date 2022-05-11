import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import {
  useThemeStore,
  themeActions,
  useAppDispatch,
} from '../../store';
import { LinkButton } from '../core';
import { GlobalSearch } from '../search';
import { Plug } from '../plug';
import crown from '../../assets/crown.svg';
import {
  Container,
  LogoContainer,
  LogoIcon,
  LogoName,
  ActionButtonsContainer,
} from './styles';
import { Icon } from '../icons';

/* --------------------------------------------------------------------------
 * NavBar Component
 * --------------------------------------------------------------------------*/

export const NavBar = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { theme } = useThemeStore();
  const isLightTheme = theme === 'lightTheme';

  const changeThemeHandler = useCallback(() => {
    dispatch(
      themeActions.setTheme(
        isLightTheme ? 'darkTheme' : 'lightTheme',
      ),
    );
  }, [isLightTheme, dispatch]);

  return (
    <Container>
      <RouterLink to="/">
        <LogoContainer>
          <LogoIcon
            src={crown}
            alt={t('translation:common.collectionName')}
          />
          <LogoName
            icon="app-name"
            extraIconProps={{ dark: !isLightTheme }}
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
    </Container>
  );
};
