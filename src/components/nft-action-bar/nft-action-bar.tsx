import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
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

const OnConnected = ({ isListed }: ConnectedProps) => (
  <ButtonListWrapper>
    {isListed && (
      <ButtonWrapper>
        <CancelListingModal />
      </ButtonWrapper>
    )}
    <ButtonWrapper>
      <ChangePriceModal isTriggerVisible={isListed} />
    </ButtonWrapper>
    <ButtonWrapper>
      <SellModal isTriggerVisible={!isListed} />
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

  const { isConnected, principalId: plugPrincipal } = usePlugStore();

  const isConnectedOwner = isNFTOwner({
    isConnected,
    owner,
    principalId: plugPrincipal,
  });

  return (
    <Container>
      <NftActionBarWrapper>
        <RouterLink to="/">
          <ActionText>
            <Icon icon="arrow-left-circle" paddingRight />
            {t('translation:buttons.links.back')}
          </ActionText>
        </RouterLink>
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
