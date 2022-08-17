import { styled } from '../../stitches.config';
import { ActionButton } from '../core';

export const OnboardingWrapper = styled('div', {
  paddingTop: '70px',
});

export const Progress = styled('div', {
  position: 'relative',
});

export const ProgressStepBarContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  background: '$lightAliceBlue',
  padding: '25px 0px 20px',
});

export const ProgressStepBarWrapper = styled('div', {
  width: '16%',
  marginRight: '8px',

  '&:nth-child(3)': {
    marginRight: 'unset',
  },
});

export const ProgressStepBar = styled('div', {
  background: '$lightGray',
  height: '8px',

  variants: {
    isActive: {
      true: {
        background: '$primary',
      },
    },
  },
});

export const ProgressStepBarText = styled('p', {
  margin: '0px 0px 3px',
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '14px',
  lineHeight: '16px',
  color: '#B1B1B1',

  variants: {
    isActive: {
      true: {
        color: '$primary',
      },
    },
  },
});

export const Divider = styled('div', {
  height: '1px',
  width: '100%',
  background: '$borderColor',
  margin: '0px 0px 60px',
  boxShadow: '0px -1px 8px rgba(0, 0, 0, 0.16)',
});

export const ButtonWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'end',
  position: 'absolute',
  right: '20px',
  top: '25px',
});

export const StyledActionButton = styled(ActionButton, {
  height: 'unset',
  width: 'unset',
});

export const SectionWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '80px',
});

export const SectionTextContent = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  flexDirection: 'column',
});

export const Header = styled('h1', {
  fontStyle: 'normal',
  fontWeight: '700',
  fontSize: '32px',
  lineHeight: '32px',
  display: 'flex',
  alignItems: 'center',
  color: '$mainTextColor',
});

export const SubText = styled('p', {
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '18px',
  lineHeight: '26px',
  color: '$textNeutralColor',
  width: '500px',
  margin: '0px',

  '& a': {
    color: '$primary',
    textDecoration: 'underline',
    cursor: 'pointer',
  },

  variants: {
    type: {
      title: {
        color: '$mainTextColor',
        fontWeight: '600',
        fontSize: '16px',
      },
    },
    size: {
      sm: {
        fontSize: '15px',
      },
    },
  },
});

export const SectionFormContent = styled('form', {
  marginTop: '40px',
});

export const InputContainer = styled('form', {
  marginTop: '10px',
});

export const SectionInputField = styled('input', {
  width: '100%',
  height: '40px',
  border: '1.5px solid $borderColor',
  borderRadius: '14px',
  padding: '0px 10px',
  background: '$backgroundColor',

  '&::placeholder': {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '12px',
    lineHeight: '16px',
    display: 'flex',
    alignitems: 'center',
    color: '$textNeutralColor',
  },
});

export const SectionInputButton = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  top: '0px',
  bottom: '0px',
  right: '0px',
  fontStyle: 'normal',
  fontWeight: '700',
  fontSize: '16px',
  lineHeight: '18px',
  color: '$lightGreyText',
  background: '$primary',
  width: '140px',
  borderTopRightRadius: '14px',
  borderBottomRightRadius: '14px',
});
