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

export type NftActionBarProps = {
  isOwner?: boolean;
  isListed?: boolean;
};

export type ConnectedProps = {
  isListed?: boolean;
};

const OnConnected = ({ isListed }: ConnectedProps) => (
  // TODO: A user might be connected
  // but not own the current token id
  // as such, the view should display the correct view
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
  isOwner,
  isListed,
}: NftActionBarProps) => {
  const { t } = useTranslation();

  const { isConnected } = usePlugStore();

  return (
    <Container>
      <NftActionBarWrapper>
        <RouterLink to="/">
          <ActionText>
            <img src={back} alt="back to results" />
            {t('translation:buttons.action.backToResults')}
          </ActionText>
        </RouterLink>
        {(isConnected && isOwner && (
          <OnConnected isListed={isListed} />
        )) || <OnDisconnected />}
      </NftActionBarWrapper>
    </Container>
  );
};
