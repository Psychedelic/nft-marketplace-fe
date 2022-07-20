import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MyOffersTable } from '../../components/tables';
import { ActionButton } from '../../components/core';
import {
  Container,
  TitleWrapper,
  Title,
  ButtonListWrapper,
  ButtonDetailsWrapper,
  StyledIcons,
} from './styles';
import { OfferTypeStatusCodes } from '../../constants/my-offers';
import { useSettingsStore, usePlugStore } from '../../store';
import { NftMetadataBackground } from '../../components/collection-overview/styles';
import { isNFTOwner } from '../../integrations/kyasshu/utils';
import useMediaQuery from '../../hooks/use-media-query';
import { MobileMyOffersTab } from '../../components/tabs/mobile-my-offers-tab';

/* --------------------------------------------------------------------------
 * Offers View Component
 * --------------------------------------------------------------------------*/

const OffersView = () => {
  const { t } = useTranslation();
  const [offersType, setOffersType] = useState(
    OfferTypeStatusCodes.OffersReceived,
  );

  const { showAlerts } = useSettingsStore();

  const { isConnected, principalId: connectedPlugUser } =
    usePlugStore();

  const { id: plugPrincipal } = useParams();

  const isConnectedOwner = isNFTOwner({
    isConnected,
    owner: connectedPlugUser,
    principalId: plugPrincipal,
  });

  const isMobileScreen = useMediaQuery('(max-width: 640px)');

  return (
    <Container showAlerts={showAlerts}>
      <NftMetadataBackground />
      <TitleWrapper>
        <Title>
          {isConnectedOwner
            ? t('translation:offers.myOffers')
            : t('translation:offers.offers')}
        </Title>
        {!isMobileScreen && (
          <ButtonListWrapper>
            <ButtonDetailsWrapper>
              <ActionButton
                fontWeight="light"
                type={
                  offersType === OfferTypeStatusCodes.OffersReceived
                    ? 'outline'
                    : 'secondary'
                }
                onClick={() => {
                  setOffersType(OfferTypeStatusCodes.OffersReceived);
                }}
              >
                <StyledIcons icon="download" />
                {t('translation:offers.offersReceived')}
              </ActionButton>
            </ButtonDetailsWrapper>
            <ButtonDetailsWrapper>
              <ActionButton
                fontWeight="light"
                type={
                  offersType === OfferTypeStatusCodes.OffersMade
                    ? 'outline'
                    : 'secondary'
                }
                onClick={() => {
                  setOffersType(OfferTypeStatusCodes.OffersMade);
                }}
              >
                <StyledIcons icon="upload" />
                {t('translation:offers.offersMade')}
              </ActionButton>
            </ButtonDetailsWrapper>
          </ButtonListWrapper>
        )}
      </TitleWrapper>
      {isMobileScreen ? (
        <MobileMyOffersTab />
      ) : (
        <MyOffersTable offersType={offersType} />
      )}
    </Container>
  );
};

export default OffersView;
