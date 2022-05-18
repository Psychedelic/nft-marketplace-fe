import type { IParticlesProps } from 'react-tsparticles';

export const ConfettiOptions: IParticlesProps['options'] = {
  fpsLimit: 60,
  particles: {
    number: {
      value: 0,
    },
    color: {
      value: ['#BEA4FF', '#FF6E83', '#59CAFC', '#FFB636'],
    },
    shape: {
      type: ['circle', 'square', 'polygon'],
      options: {
        polygon: {
          sides: 6,
        },
      },
    },
    opacity: {
      value: { min: 0, max: 1 },
      animation: {
        enable: true,
        speed: 1,
        startValue: 'max',
        destroy: 'min',
      },
    },
    size: {
      value: { min: 3, max: 7 },
    },
    life: {
      duration: {
        sync: true,
        value: 5,
      },
      count: 1,
    },
    move: {
      enable: true,
      gravity: {
        enable: true,
        acceleration: 20,
      },
      speed: 50,
      decay: 0.05,
      direction: 'none',
      outModes: {
        default: 'destroy',
        top: 'none',
      },
    },
    rotate: {
      value: {
        min: 0,
        max: 360,
      },
      direction: 'random',
      animation: {
        enable: true,
        speed: 60,
      },
    },
    tilt: {
      direction: 'random',
      enable: true,
      value: {
        min: 0,
        max: 360,
      },
      animation: {
        enable: true,
        speed: 60,
      },
    },
    roll: {
      darken: {
        enable: true,
        value: 25,
      },
      enable: true,
      speed: {
        min: 15,
        max: 25,
      },
    },
    wobble: {
      distance: 30,
      enable: true,
      speed: {
        min: -15,
        max: 15,
      },
    },
  },
  detectRetina: true,
  emitters: [
    {
      direction: 'top-right',
      rate: {
        delay: 0.1,
        quantity: 10,
      },
      position: {
        x: 0,
        y: 50,
      },
      size: {
        width: 0,
        height: 0,
      },
    },
    {
      direction: 'top-left',
      rate: {
        delay: 0.1,
        quantity: 10,
      },
      position: {
        x: 100,
        y: 50,
      },
      size: {
        width: 0,
        height: 0,
      },
    },
  ],
};
