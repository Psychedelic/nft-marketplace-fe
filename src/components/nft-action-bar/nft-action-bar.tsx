import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  CancelListingModal,
  ChangePriceModal,
  SellModal,
} from '../modals';

import {
  Container,
  NftActionBarWrapper,
  ActionText,
  ButtonListWrapper,
  ButtonWrapper,
} from './styles';

import { usePlugStore } from '../../store';
import { isNFTOwner } from '../../integrations/kyasshu/utils';
import { Icon } from '../icons';

export type NftActionBarProps = {
  isListed?: boolean;
  owner?: string;
  showNFTActionButtons: boolean;
};

type ConnectedProps = {
  isListed?: boolean;
};

const OnConnected = ({ isListed }: ConnectedProps) =>
  isListed ? (
    <ButtonListWrapper>
      <ButtonWrapper>
        <CancelListingModal />
      </ButtonWrapper>
      <ButtonWrapper>
        <ChangePriceModal />
      </ButtonWrapper>
    </ButtonListWrapper>
  ) : (
    <ButtonListWrapper>
      <ButtonWrapper>
        <SellModal />
      </ButtonWrapper>
    </ButtonListWrapper>
  );

// TODO: On disconnected users should display a particular state
// also, for the users which are not "ownersOf"
const OnDisconnected = () => null;

export const NftActionBar = ({
  isListed,
  owner,
  showNFTActionButtons,
}: NftActionBarProps) => {
  const { t } = useTranslation();
  const location = useLocation()

  const { isConnected, principalId: plugPrincipal } = usePlugStore();

  const isConnectedOwner = isNFTOwner({
    isConnected,
    owner,
    principalId: plugPrincipal,
  });

  return (
    <Container>
      <NftActionBarWrapper>
        <div onClick={() => history.back()}>
          <ActionText>
            <Icon icon="arrow-left-circle" paddingRight />
            {t('translation:buttons.action.backToResults')}
          </ActionText>
        </div>
        {showNFTActionButtons &&
          (isConnectedOwner ? (
            <OnConnected isListed={isListed} />
          ) : (
            <OnDisconnected />
          ))}
      </NftActionBarWrapper>
    </Container>
  );
};
