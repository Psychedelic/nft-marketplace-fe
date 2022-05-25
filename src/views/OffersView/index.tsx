import { useState } from 'react';
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
import { OfferTypeStatusCodes } from '../../constants/my-offers';
import { useSettingsStore } from '../../store';

/* --------------------------------------------------------------------------
 * Offers View Component
 * --------------------------------------------------------------------------*/

const OffersView = () => {
  const { t } = useTranslation();
  const [offersType, setOffersType] = useState(
    OfferTypeStatusCodes.OffersReceived,
  );

  const { showAlerts } = useSettingsStore();

  return (
    <Container showAlerts={showAlerts}>
      <TitleWrapper>
        <Title>{t('translation:offers.myOffers')}</Title>
        <ButtonListWrapper>
          <ButtonDetailsWrapper>
            <ActionButton
              type={
                offersType === OfferTypeStatusCodes.OffersReceived
                  ? 'outline'
                  : 'secondary'
              }
              onClick={() => {
                setOffersType(OfferTypeStatusCodes.OffersReceived);
              }}
            >
              {t('translation:offers.offersReceived')}
            </ActionButton>
          </ButtonDetailsWrapper>
          <ButtonDetailsWrapper>
            <ActionButton
              type={
                offersType === OfferTypeStatusCodes.OffersMade
                  ? 'outline'
                  : 'secondary'
              }
              onClick={() => {
                setOffersType(OfferTypeStatusCodes.OffersMade);
              }}
            >
              {t('translation:offers.offersMade')}
            </ActionButton>
          </ButtonDetailsWrapper>
        </ButtonListWrapper>
      </TitleWrapper>
      <MyOffersTable offersType={offersType} />
    </Container>
  );
};

export default OffersView;
