import React from 'react';
import Lottie from 'react-lottie';
import partyPopperLottie from '../../../assets/lotties/party-popper.json';
import { Container } from './styles';

export const Completed = () => (
  <Container>
    <Lottie
      options={{
        animationData: partyPopperLottie,
        loop: false,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice',
        },
      }}
      height={112}
      width={112}
      style={{ transform: 'scale(3)', pointerEvents: 'none' }}
    />
  </Container>
);
