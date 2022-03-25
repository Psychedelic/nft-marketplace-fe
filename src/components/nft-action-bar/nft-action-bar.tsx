import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
import back from '../../assets/back.svg';

import { usePlugStore } from '../../store';
import { isNFTOwner } from '../../integrations/kyasshu/utils';

export type NftActionBarProps = {
  isListed?: boolean;
  owner?: string;
};

export type ConnectedProps = {
  isListed?: boolean;
};

const OnConnected = ({ isListed }: ConnectedProps) => (
  <>
    {isListed ? (
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
    )}
  </>
);

// TODO: On disconnected users should display a particular state
// also, for the users which are not "ownersOf"
const OnDisconnected = () => null;

export const NftActionBar = ({
  isListed,
  owner,
}: NftActionBarProps) => {
  const { t } = useTranslation();

  const { isConnected, principalId } = usePlugStore();

  const isConnectedOwner = isNFTOwner({
    isConnected,
    owner,
    principalId,
  });

  return (
    <Container>
      <NftActionBarWrapper>
        <RouterLink to="/">
          <ActionText>
            <img src={back} alt="back to results" />
            {t('translation:buttons.action.backToResults')}
          </ActionText>
        </RouterLink>
        {(isConnectedOwner && (
          <OnConnected isListed={isListed} />
        )) || <OnDisconnected />}
      </NftActionBarWrapper>
    </Container>
  );
};
