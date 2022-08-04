import { styled, keyframes } from '../../../stitches.config';

const spin = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
});

export const TransactionStepContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
});

export const TransactionStepDetails = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '105px',
});

export const TransactionIconContainer = styled('div', {
  width: '45px',
  height: '45px',
  borderRadius: '45px',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '$primary',

  variants: {
    status: {
      notStarted: {
        background: '$lightGreyColor',
      },
      inProgress: {
        background: '$primary',
      },
      completed: {
        background: '$primary',
      },
    },
  },
});

export const TransactionLoadingOutline = styled('div', {
  width: '45px',
  height: '45px',
  borderRadius: '45px',
  position: 'absolute',
  filter: 'blur(10px)',
  background: '$primary',
});

export const TransactionLoader = styled('div', {
  width: '100%',
  height: '100%',
  borderRadius: '45px',
  border: '2px solid #A8B2FF',
  position: 'absolute',
  borderColor:
    'rgb(255 255 255) rgb(168, 178, 255) rgb(168, 178, 255)',
  animation: `${spin} infinite 2s linear`,
  zIndex: '200',
});

export const CheckedIcon = styled('img', {
  position: 'absolute',
  transition: 'opacity 400ms',
  zIndex: '300',
  top: '0px',
  right: '0px',
  marginTop: '-5px',
  marginRight: '-3px',
});

export const TransactionIcon = styled('div', {
  width: '18px',
  zIndex: '200',
  opacity: '1',
  color: '#fff',

  variants: {
    status: {
      notStarted: {
        opacity: '0.3',
      },
      inProgress: {
        opacity: '1',
      },
      completed: {
        opacity: '1',
      },
    },
  },
});

export const NextStepContainer = styled('div', {
  margin: '15px 30px',
  opacity: '1',
  color: '$mainTextColor',

  variants: {
    status: {
      notStarted: {
        opacity: '0.3',
      },
      inProgress: {
        opacity: '1',
      },
      completed: {
        opacity: '1',
      },
    },
  },
});

export const NextStepIcon = styled('div', {
  width: '18px',
  zIndex: '200',
  color: '$mainTextColor',
});

export const TransactionStepName = styled('div', {
  fontSize: '14px',
  fontWeight: '600',
  lineHeight: '19px',
  textAlign: 'center',
  marginTop: '9px',
  color: '$mainTextColor',
  opacity: '1',

  variants: {
    status: {
      notStarted: {
        opacity: '0.3',
      },
      inProgress: {
        opacity: '1',
      },
      completed: {
        opacity: '1',
      },
    },
  },
});
