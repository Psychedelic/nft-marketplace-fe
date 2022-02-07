import React from 'react';
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

export const NftActionBar = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <NftActionBarWrapper>
        <ActionText>
          <img src={back} alt="back to results" />
          {t('translation:buttons.action.backToResults')}
        </ActionText>
        <ButtonListWrapper>
          <ButtonWrapper>
            <CancelListingModal />
          </ButtonWrapper>
          <ButtonWrapper>
            <ChangePriceModal />
          </ButtonWrapper>
        </ButtonListWrapper>
      </NftActionBarWrapper>
    </Container>
  );
};
