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

/* --------------------------------------------------------------------------
 * Offers View Component
 * --------------------------------------------------------------------------*/

const OffersView = () => {
  const { t } = useTranslation();
  const [offersType, setOffersType] = useState(
    OfferTypeStatusCodes.OffersReceived,
  );

  return (
    <Container>
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
              text={t('translation:offers.offersReceived')}
              handleClick={() => {
                setOffersType(OfferTypeStatusCodes.OffersReceived);
              }}
            />
          </ButtonDetailsWrapper>
          <ButtonDetailsWrapper>
            <ActionButton
              type={
                offersType === OfferTypeStatusCodes.OffersMade
                  ? 'outline'
                  : 'secondary'
              }
              text={t('translation:offers.offersMade')}
              handleClick={() => {
                setOffersType(OfferTypeStatusCodes.OffersMade);
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
