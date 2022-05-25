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
import jelly from '../../assets/jelly-full-image.svg';
import {
  Container,
  LogoContainer,
  LogoIcon,
  ActionButtonsContainer,
} from './styles';
import { Icon } from '../icons';
import { useLocationResolver } from '../../hooks/use-location-resolver';

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

  useLocationResolver();

  return (
    <Container>
      <RouterLink to="/">
        <LogoContainer>
          <LogoIcon
            src={jelly}
            alt={t('translation:common.collectionName')}
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
