import React from 'react';
import { Icon } from '../../icons';
import { Container } from './styles';

export const Pending = () => (
  <Container>
    <Icon icon="spinner" extraIconProps={{ size: '112px' }} />
  </Container>
);
