import React from 'react';
import completedIcon from '../../../assets/completed.svg';
import { Container, CompletedLogo } from './styles';

export const Completed = () => (
  <Container>
    <CompletedLogo src={completedIcon} alt="completed" />
  </Container>
);
