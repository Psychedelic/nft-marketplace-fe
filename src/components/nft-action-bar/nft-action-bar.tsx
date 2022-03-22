import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CancelListingModal, ChangePriceModal } from '../modals';

import {
  Container,
  NftActionBarWrapper,
  ActionText,
  ButtonListWrapper,
  ButtonWrapper,
} from './styles';
import back from '../../assets/back.svg';

import { usePlugStore } from '../../store';

const OnConnected = () => (
  // TODO: A user might be connected
  // but not own the current token id
  // as such, the view should display the correct view
  <>
    <ButtonListWrapper>
      <ButtonWrapper>
        <CancelListingModal />
      </ButtonWrapper>
      <ButtonWrapper>
        <ChangePriceModal />
      </ButtonWrapper>
    </ButtonListWrapper>
  </>
);

// TODO: On disconnected users should display a particular state
// also, for the users which are not "ownersOf"
const OnDisconnected = () => null;

export const NftActionBar = () => {
  const { t } = useTranslation();

  const { isConnected } = usePlugStore();

  // TODO: Should verify if owner of current token id
  // as early as possible
  // e.g. if opted to verify on-chain the method is "ownerOf"

  return (
    <Container>
      <NftActionBarWrapper>
        <RouterLink to="/">
          <ActionText>
            <img src={back} alt="back to results" />
            {t('translation:buttons.action.backToResults')}
          </ActionText>
        </RouterLink>
        {(isConnected && <OnConnected />) || <OnDisconnected />}
      </NftActionBarWrapper>
    </Container>
  );
};
