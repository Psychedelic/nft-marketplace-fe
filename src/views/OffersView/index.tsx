import React from 'react';
import { ActivityTable } from '../../components/tables';
import { Container, TitleWrapper, Title } from './styles';

/* --------------------------------------------------------------------------
 * Offers View Component
 * --------------------------------------------------------------------------*/

const OffersView = () => (
  <Container>
    <TitleWrapper>
      <Title>My Offers</Title>
    </TitleWrapper>
    <ActivityTable />
  </Container>
);

export default OffersView;
