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

export const NftActionBar = () => {
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
        {isConnected && (
          <ButtonListWrapper>
            <ButtonWrapper>
              <CancelListingModal />
            </ButtonWrapper>
            <ButtonWrapper>
              <ChangePriceModal />
            </ButtonWrapper>
          </ButtonListWrapper>
        )}
      </NftActionBarWrapper>
    </Container>
  );
};
