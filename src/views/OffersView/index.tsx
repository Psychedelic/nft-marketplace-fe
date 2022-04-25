import React from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityTable } from '../../components/tables';
import { Container, TitleWrapper, Title } from './styles';

/* --------------------------------------------------------------------------
 * Offers View Component
 * --------------------------------------------------------------------------*/

const OffersView = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <TitleWrapper>
        <Title>{t('translation:common.myOffers')}</Title>
      </TitleWrapper>
      <ActivityTable />
    </Container>
  );
};

export default OffersView;
