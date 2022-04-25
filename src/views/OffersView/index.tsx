import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MyOffersTable } from '../../components/tables';
import { ActionButton } from '../../components/core';
import {
  Container,
  TitleWrapper,
  Title,
  ButtonListWrapper,
  ButtonDetailsWrapper,
} from './styles';
import { OFFER_TYPE_STATUS_CODES } from '../../constants/my-offers';

/* --------------------------------------------------------------------------
 * Offers View Component
 * --------------------------------------------------------------------------*/

const OffersView = () => {
  const { t } = useTranslation();
  const [offersType, setOffersType] = useState(
    OFFER_TYPE_STATUS_CODES.OffersReceived,
  );

  return (
    <Container>
      <TitleWrapper>
        <Title>{t('translation:offers.myOffers')}</Title>
        <ButtonListWrapper>
          <ButtonDetailsWrapper>
            <ActionButton
              type={
                offersType === OFFER_TYPE_STATUS_CODES.OffersReceived
                  ? 'outline'
                  : 'secondary'
              }
              text={t('translation:offers.offersReceived')}
              handleClick={() => {
                setOffersType(OFFER_TYPE_STATUS_CODES.OffersReceived);
              }}
            />
          </ButtonDetailsWrapper>
          <ButtonDetailsWrapper>
            <ActionButton
              type={
                offersType === OFFER_TYPE_STATUS_CODES.OffersMade
                  ? 'outline'
                  : 'secondary'
              }
              text={t('translation:offers.offersMade')}
              handleClick={() => {
                setOffersType(OFFER_TYPE_STATUS_CODES.OffersMade);
              }}
            />
          </ButtonDetailsWrapper>
        </ButtonListWrapper>
      </TitleWrapper>
      <MyOffersTable offersType={offersType} />
    </Container>
  );
};

export default OffersView;
