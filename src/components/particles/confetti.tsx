import ParticlesClass from 'react-tsparticles';
import type { IParticlesProps } from 'react-tsparticles';
import React from 'react';
import { loadFull } from 'tsparticles';
import { ConfettiOptions } from './options';

const Particles =
  ParticlesClass as unknown as React.FC<IParticlesProps>;

export const ConfettiParticles: React.VFC = () => (
  <Particles
    id="confetti-particles"
    options={ConfettiOptions}
    init={loadFull as any}
  />
);
