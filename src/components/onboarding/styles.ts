import { styled } from '../../stitches.config';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
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

  variants: {
    gap: {
      sm: {
        margin: '0px 0px 20px',
        boxShadow: 'unset',
      },
    },
  },
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

export const SectionContent = styled('div', {
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
  marginTop: '30px',
});

export const SectionFormContentWrapper = styled('div', {
  margin: '15px 0',
});

export const InputContainer = styled('div', {
  display: 'flex',
  margin: '10px 0',
  position: 'relative',
});

export const SectionInputField = styled('input', {
  width: '480px',
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
    color: '$textNeutralColor',
    wordWrap: 'break-word',
  },

  variants: {
    inputStyle: {
      fullWidth: {
        margin: '10px 0',
      },
    },
    size: {
      medium: {},
    },
  },
});

export const SectionTextArea = styled('textarea', {
  width: '480px',
  height: '87px',
  border: '1.5px solid $borderColor',
  borderRadius: '14px',
  padding: '10px',
  background: '$backgroundColor',
  marginTop: '10px',
  resize: 'none',
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

export const InputWrapper = styled('div', {
  position: 'relative',
  width: 'fit-content',
});

export const ImageInputField = styled('input', {
  color: 'transparent',
  marginTop: '15px',

  '&::-webkit-file-upload-button': {
    visibility: 'hidden',
  },

  variants: {
    imageType: {
      logo: {
        width: '120px',

        '&::before': {
          width: '100px',
          borderRadius: '100%',
          height: '100px',
        },
      },
      featured: {
        width: '250px',

        '&::before': {
          width: '230px',
          borderRadius: '10px',
          height: '150px',
        },
      },
      banner: {
        width: '500px',

        '&::before': {
          width: '480px',
          borderRadius: '10px',
          height: '150px',
        },
      },
    },
  },

  '&::before': {
    content: '',
    background: 'linear-gradient(top, #f9f9f9, #e3e3e3)',
    padding: '5px 8px',
    outline: 'none',
    '-webkit-user-select': 'none',
    top: '0',
    border: '2px dashed #ABB2C2',
    display: 'flex',
    justifyContent: 'center',
    cursor: 'pointer',
  },
});

export const IconWrapper = styled('div', {
  position: 'absolute',
  top: '-10px',
  left: '0',
  bottom: '0',
  right: '0',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'center',
  cursor: 'pointer',
  zIndex: '-1',
});

export const Label = styled('label', {
  color: '$textNeutralColor',
  fontSize: 15,
  lineHeight: 1,
  paddingLeft: 10,
});

export const Flex = styled('div', {
  display: 'flex',
  margin: '10px 0',
  alignItems: 'center',
});

export const StyledRadio = styled(RadioGroupPrimitive.Item, {
  all: 'unset',
  backgroundColor: '$backgroundColor',
  border: '1.5px solid $borderColor',
  width: 20,
  height: 20,
  borderRadius: '100%',
});

export const StyledIndicator = styled(RadioGroupPrimitive.Indicator, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  position: 'relative',
  '&::after': {
    content: '""',
    display: 'block',
    width: 15,
    height: 15,
    borderRadius: '50%',
    backgroundColor: '$primary',
  },
});
