import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MyOffersTable } from '../tables';
import {
  TabsRoot,
  TabsTrigger,
  TabsList,
  TabsContent,
} from './styles';
import { StyledIcons } from '../../views/OffersView/styles';
import { OfferTypeStatusCodes } from '../../constants/my-offers';

export const MobileMyOffersTab = () => {
  const { t } = useTranslation();

  const [offersType, setOffersType] = useState(
    OfferTypeStatusCodes.OffersReceived,
  );

  return (
    <TabsRoot defaultValue="items" value={offersType}>
      <TabsList aria-label="Manage your account">
        <TabsTrigger
          value="offersReceived"
          status={
            offersType === OfferTypeStatusCodes.OffersReceived
              ? 'active'
              : 'inactive'
          }
          onClick={() => {
            setOffersType(OfferTypeStatusCodes.OffersReceived);
          }}
        >
          <StyledIcons icon="download" />
          {t('translation:offers.received')}
        </TabsTrigger>
        <TabsTrigger
          value="offersMade"
          status={
            offersType === OfferTypeStatusCodes.OffersMade
              ? 'active'
              : 'inactive'
          }
          onClick={() => {
            setOffersType(OfferTypeStatusCodes.OffersMade);
          }}
        >
          <StyledIcons icon="upload" />
          {t('translation:offers.made')}
        </TabsTrigger>
      </TabsList>
      <TabsContent value={OfferTypeStatusCodes.OffersReceived}>
        <MyOffersTable offersType={offersType} />
      </TabsContent>
      <TabsContent value={OfferTypeStatusCodes.OffersMade}>
        <MyOffersTable offersType={offersType} />
      </TabsContent>
    </TabsRoot>
  );
};
