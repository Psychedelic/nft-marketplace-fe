import { styled } from '../../stitches.config';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as Switch from '@radix-ui/react-switch';
import { ActionButton } from '../core';
import { Icon } from '../icons';

export const OnboardingWrapper = styled('div', {
  paddingTop: '70px',
});

export const Progress = styled('div', {
  position: 'fixed',
  width: '100%',
  zIndex: '3',
});

export const ProgressStepBarContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  background: '$lightAliceBlue',
  padding: '25px 0px 20px',
  borderBottom: '1px solid $borderColor',
  boxShadow: '0px -1px 8px rgba(0, 0, 0, 0.16)',
});

export const ProgressStepBarWrapper = styled('div', {
  width: '16%',
  marginRight: '8px',
  transition: 'all .5s',

  '&:nth-child(3)': {
    marginRight: 'unset',
  },
});

export const ProgressStepBar = styled('div', {
  background: '$lightGray',
  position: 'relative',
  width: '100%',
  height: '8px',

  '&::after': {
    content: '',
    position: 'absolute',
    top: '0',
    height: '100%',
    transition: 'all .5s',
  },

  variants: {
    isActive: {
      true: {
        '&::after': {
          width: '50%',
          background: '$primary',
        },
      },
    },
    isCanisterIdSubmitted: {
      true: {
        '&::after': {
          width: '100%',
          background: '$primary',
        },
      },
    },
    isCollectionDetailsSubmitted: {
      true: {
        '&::after': {
          width: '100%',
          background: '$primary',
        },
      },
    },
    isNftDetailsSubmitted: {
      true: {
        '&::after': {
          width: '100%',
          background: '$primary',
        },
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
  color: '$darkGray',

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

  variants: {
    gap: {
      sm: {
        margin: '0px 0px 20px',
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

  variants: {
    firstItem: {
      true: {
        paddingTop: '60px',
      },
    },
  },
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
  width: '520px',
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

export const SubTextLabel = styled('label', {
  fontStyle: 'normal',
  fontWeight: '600',
  lineHeight: '26px',
  color: '$mainTextColor',
  width: '520px',
  margin: '0px',
  fontSize: '15px',

  '&:after': {
    content: '*',
    color: 'red',
    fontSize: '16px',
  },
});

export const SectionFormContent = styled('form', {
  marginTop: '30px',
});

export const SectionFormContentWrapper = styled('div', {
  margin: '20px 0',
});

export const InputContainer = styled('div', {
  display: 'flex',
  margin: '10px 0',
  position: 'relative',
});

export const SectionInputField = styled('input', {
  width: '100%',
  height: '40px',
  border: '1.5px solid $borderColor',
  borderRadius: '14px',
  padding: '0px 10px',
  background: '$backgroundColor',
  boxSizing: 'border-box',
  position: 'relative',

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
      leftButton: {
        paddingLeft: '66px',
      },
      borderless: {
        paddingLeft: '50px',
        zIndex: '1',
      },
      smallWithLabel: {
        padding: '0px 0px 0px 25px',

        '&:disabled': {
          backgroundColor: 'unset',
          cursor: 'not-allowed',
        },
      },
    },
    error: {
      true: {
        border: '1.5px solid $error',
      },
      false: {
        border: '1.5px solid $borderColor',
      },
    },
    primaryLinks: {
      true: {
        color: '$primary',

        '&:focus': {
          color: '$textNeutralColor',
        },
      },
    },
    disabledStyle: {
      custom: {
        '&:disabled': {
          backgroundColor: 'unset',
          cursor: 'not-allowed',
        },
      },
    },
  },

  '&:focus': {
    outline: 'none !important',
  },

  '&:disabled': {
    backgroundColor: '$whiteSmokyGray',
    border: '1.5px solid $borderColor',
    cursor: 'not-allowed',
    color: '$mediumLightBluishGrey',
  },
});

export const StyledImgPlaceholder = styled('img', {
  zIndex: '2',
});

export const SectionTextArea = styled('textarea', {
  width: '100%',
  height: '87px',
  border: '1.5px solid $borderColor',
  borderRadius: '14px',
  padding: '10px',
  background: '$backgroundColor',
  marginTop: '10px',
  resize: 'none',
  fontFamily: 'inherit',
  boxSizing: 'border-box',

  '&:focus': {
    outline: 'none !important',
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
  cursor: 'pointer',

  variants: {
    submitted: {
      true: {
        pointerEvents: 'none',
      },
    },
  },
});

export const InputWrapper = styled('div', {
  position: 'relative',
  width: 'fit-content',

  variants: {
    type: {
      nft: {
        '&:nth-child(2)': {
          margin: '0px 11px',
        },
      },
    },
  },
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
          width: '520px',
          borderRadius: '10px',
          height: '150px',
        },
      },
      nft: {
        width: '160px',

        '&::before': {
          width: '140px',
          borderRadius: '10px',
          height: '150px',
        },
      },
    },
    isInputFilled: {
      true: {
        '&::before': {
          border: '2px solid $mediumLightBlue',
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
    border: '2px dashed $mediumLightBlue',
    display: 'flex',
    justifyContent: 'center',
    cursor: 'pointer',
  },
});

// TO-D0: refactor to use single style for all image types
export const LogoImageFieldWrapper = styled('div', {
  position: 'absolute',
  width: '100%',
  borderRadius: '100%',
  height: '114px',
  top: '15px',
  bottom: '0',
  right: '0',
  left: '0',
  cursor: 'pointer',
  zIndex: '-1',
});

export const LogoImageField = styled('img', {
  width: '100%',
  borderRadius: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const FeaturedImageFieldWrapper = styled('div', {
  position: 'absolute',
  width: '100%',
  borderRadius: '10px',
  height: '164px',
  top: '15px',
  bottom: '0',
  right: '0',
  left: '0',
  cursor: 'pointer',
  zIndex: '-1',
});

export const FeaturedImageField = styled('img', {
  width: '100%',
  borderRadius: '10px',
  height: '100%',
  objectFit: 'cover',
});

export const BannerImageFieldWrapper = styled('div', {
  position: 'absolute',
  width: '100%',
  borderRadius: '10px',
  height: '164px',
  top: '15px',
  bottom: '0',
  right: '0',
  left: '0',
  cursor: 'pointer',
  zIndex: '-1',
});

export const BannerImageField = styled('img', {
  width: '100%',
  borderRadius: '10px',
  height: '100%',
  objectFit: 'cover',
});

export const NftImage = styled('img', {
  width: '165px',
  height: '165px',
  borderRadius: '10px',
});

export const NftImageLabel = styled('p', {
  margin: '0',
  color: '$textNeutralColor',
  fontSize: '14px',
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

  '&:nth-child(1)': {
    marginRight: '20px',
  },
});

export const StyledRadioRoot = styled(RadioGroupPrimitive.Root, {
  display: 'flex',

  variants: {
    bottomSpace: {
      true: {
        marginBottom: '20px',
      },
    },
  },
});

export const StyledRadio = styled(RadioGroupPrimitive.Item, {
  all: 'unset',
  backgroundColor: '$backgroundColor',
  border: '1.5px solid $borderColor',
  width: 20,
  height: 20,
  borderRadius: '100%',
  cursor: 'pointer',
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

export const DetailsButtonWrapper = styled('div', {
  width: '98px',
  marginTop: '35px',

  variants: {
    size: {
      wide: {
        width: '198px',
      },
    },
  },
});

export const InputIconButton = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  top: '0px',
  bottom: '0px',
  left: '0px',
  width: '56px',
  borderTopLeftRadius: '14px',
  borderBottomLeftRadius: '14px',
  border: '1.5px solid $borderColor',
  zIndex: '2',

  variants: {
    borderless: {
      right: {
        borderRight: 'unset',
      },
      full: {
        border: 'none',
      },
    },
  },
});

export const LinkInputContentWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
});

export const LinkInputContent = styled('div', {
  display: 'flex',
  margin: '5px 0',
  position: 'relative',

  '&:first-child': {
    marginTop: '10px',
  },
});

export const StyledSwitch = styled(Switch.Root, {
  all: 'unset',
  width: 42,
  height: 25,
  backgroundColor: '#E3E1E1',
  borderRadius: '9999px',
  position: 'relative',
  WebkitTapHighlightColor: '#E3E1E1',
  cursor: 'pointer',
  '&[data-state="checked"]': { backgroundColor: '#3574F4' },
});

export const StyledThumb = styled(Switch.Thumb, {
  display: 'block',
  width: 21,
  height: 21,
  backgroundColor: '#EFEEEE',
  borderRadius: '9999px',
  transition: 'transform 100ms',
  transform: 'translateX(2px)',
  willChange: 'transform',
  '&[data-state="checked"]': { transform: 'translateX(19px)' },
});

export const ErrorMessage = styled('p', {
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '14px',
  lineHeight: '16px',
  display: 'flex',
  alignItems: 'center',
  color: '#EF4444',
  margin: '0',
});

export const WarningIcon = styled(Icon, {
  marginRight: '8px',
});

export const NftSampleWrapper = styled('div', {
  display: 'flex',
  marginTop: '10px',
});

export const NftNameDetailsWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
});

export const UnblockableContent = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const FormSectionContainer = styled('div', {
  variants: {
    disable: {
      true: {
        opacity: '0.4',
        pointerEvents: 'none',
      },
    },
    enable: {
      true: {
        opacity: '1',
      },
    },
  },
});

export const RangeWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  width: '23.5%',
  marginLeft: '1.5%',
});

export const RangeLabel = styled('p', {
  margin: '0',
  position: 'absolute',
  left: '10px',
  zIndex: '1',
  background: '#F1F2F3',
  borderRadius: '4px',
  width: '15px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '14px',
});

export const SpinnerWrapper = styled('div', {
  position: 'absolute',
  top: '0',
  bottom: '0',
  left: '0',
  right: '0',
  margin: '0 auto',
  zIndex: '5',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(0, 0, 0, 0.6)',
  height: '100%',
});
