import { useTranslation } from 'react-i18next';
import {
  MobileMenuContentWrapper,
  NavItem,
  NavItemContent,
  WICPLogo,
  PlugLogo,
  PrincipalAddress,
  Flex,
  StyledSwitch,
  StyledThumb,
  NotConnectedMessage,
  Divider,
  NotConnectedMessageWrapper,
  StyledIcon,
  TotalWICPBalanceTitle,
  TotalWICPBalanceAmount,
} from './styles';
import wicpImage from '../../assets/wicp.svg';
import plugLogo from '../../assets/plug-logo.svg';
import {
  disconnectPlug,
  formatAddress,
} from '../../integrations/plug';
import {
  filterActions,
  plugActions,
  useAppDispatch,
  useFilterStore,
  usePlugStore,
  useThemeStore,
} from '../../store';
import { openSonicURL } from '../../utils/ handle-redirect-urls';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { Plug } from '../plug';
import { roundOffDecimalValue } from '../../utils/nfts';
import { SpinnerIcon } from '../icons/custom';

type MobileNavBarTypes = {
  openMobileNavbar: boolean;
  setOpenMobileNavbar: (value: boolean) => void;
  changeThemeHandler: () => void;
};

export const MobileNavBar = ({
  openMobileNavbar,
  setOpenMobileNavbar,
  changeThemeHandler,
}: MobileNavBarTypes) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { defaultFilters } = useFilterStore();
  const {
    isConnected,
    principalId,
    wicpBalance,
    loadingWicpBalance,
  } = usePlugStore();
  const { theme } = useThemeStore();
  const navigate = useNavigate();

  const myActivityHandler = useCallback(() => {
    navigate(`/activity/${principalId}`);
    setOpenMobileNavbar(false);
  }, [navigate, principalId]);

  const myOffersHandler = useCallback(() => {
    navigate(`/offers/${principalId}`);
    setOpenMobileNavbar(false);
  }, [navigate, principalId]);

  const filterExists = (filterName: string) =>
    defaultFilters.some(
      (appliedFilter) => appliedFilter.filterName === filterName,
    );

  const setMyNfts = () => {
    dispatch(filterActions.setMyNfts(true));
    if (filterExists(t('translation:buttons.action.myNfts'))) return;
    dispatch(
      filterActions.applyFilter({
        filterName: `${t('translation:buttons.action.myNfts')}`,
        filterCategory: 'Display',
      }),
    );
  };

  const disconnectHandler = useCallback(() => {
    dispatch(plugActions.setIsConnected(false));
    disconnectPlug();
    setOpenMobileNavbar(false);
  }, [dispatch]);

  return (
    <MobileMenuContentWrapper>
      {openMobileNavbar && (
        <NavItemContent>
          {isConnected && (
            <>
              <NavItem onClick={myOffersHandler}>
                <Flex justifyBetween>
                  <Flex>
                    <PlugLogo
                      src={plugLogo}
                      alt={t('translation:logoAlts.plug')}
                    />
                    <PrincipalAddress>
                      {principalId && formatAddress(principalId)}
                    </PrincipalAddress>
                  </Flex>
                  <div>
                    <TotalWICPBalanceTitle>
                      Total Balance
                    </TotalWICPBalanceTitle>
                    <Flex justifyEnd>
                      {wicpBalance !== '' && !loadingWicpBalance ? (
                        <TotalWICPBalanceAmount>
                          {`${roundOffDecimalValue(
                            Number(wicpBalance),
                            2,
                          )}
                          `}
                        </TotalWICPBalanceAmount>
                      ) : (
                        <SpinnerIcon />
                      )}
                      <WICPLogo
                        src={wicpImage}
                        alt={t('translation:logoAlts.wicp')}
                        paddingLeft
                      />
                    </Flex>
                  </div>
                </Flex>
              </NavItem>
              <NavItem onClick={myOffersHandler}>
                <StyledIcon icon="offer" />
                <p>{t('translation:buttons.action.myOffers')}</p>
              </NavItem>
              <NavItem onClick={myActivityHandler}>
                <StyledIcon icon="activity" />
                <p>{t('translation:buttons.action.myActivity')}</p>
              </NavItem>
              <NavItem onClick={openSonicURL}>
                <WICPLogo
                  src={wicpImage}
                  alt={t('translation:logoAlts.wicp')}
                />
                <p>{t('translation:buttons.action.getWicp')}</p>
              </NavItem>
              <NavItem onClick={setMyNfts}>
                <StyledIcon icon="myNfts" />
                <p>{t('translation:buttons.action.myNfts')}</p>
              </NavItem>
              <NavItem onClick={disconnectHandler}>
                <StyledIcon icon="disconnect" />
                <p>{t('translation:buttons.action.disconnect')}</p>
              </NavItem>
            </>
          )}
          <NavItem onClick={changeThemeHandler}>
            <Flex justifyBetween>
              <Flex>
                <StyledIcon icon="nightMode" />
                <p>{t('translation:buttons.action.nigthMode')}</p>
              </Flex>
              <StyledSwitch checked={theme === 'darkTheme'}>
                <StyledThumb />
              </StyledSwitch>
            </Flex>
          </NavItem>
          <Divider />
          {!isConnected && (
            <NotConnectedMessageWrapper>
              <NotConnectedMessage>
                {t('translation:common.notConnectedMessage')}
              </NotConnectedMessage>
              <Plug />
            </NotConnectedMessageWrapper>
          )}
        </NavItemContent>
      )}
    </MobileMenuContentWrapper>
  );
};
