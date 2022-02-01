import React from 'react';
import loadingLogo from '../../../assets/loading.svg';
import { Container, PendingLogo } from './styles';

export const Pending = () => (
  <Container>
    <PendingLogo src={loadingLogo} alt="pending" />
  </Container>
);
