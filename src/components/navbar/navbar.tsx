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
            src={appLogo}
            alt={t('translation:common.collectionName')}
          />
          <LogoName
            src={isLightTheme ? appName : appNameDark}
            alt={t('translation:common.collectionName')}
          />
        </LogoContainer>
      </RouterLink>
      <GlobalSearch />
      <ActionButtonsContainer>
        <LinkButton handleClick={changeThemeHandler}>
          <img src={isLightTheme ? moon : sun} alt="" />
        </LinkButton>
        <Plug />
      </ActionButtonsContainer>
    </Container>
  );
};
