import * as DialogPrimitive from '@radix-ui/react-dialog';
import { styled, keyframes } from '../../stitches.config';
import { Icon } from '../icons';

const overlayShow = keyframes({
  '0%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
  },
});

export const ModalRoot = styled(DialogPrimitive.Root, {
  variants: {
    isTriggerVisible: {
      true: {
        display: 'none',
      },
    },
  },
});

const contentShow = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translate(-50%, -48%) scale(.96)',
  },
  '100%': {
    opacity: 1,
    transform: 'translate(-50%, -50%) scale(1)',
  },
});

export const SellModalTrigger = styled('div', {
  width: '140px',
  height: '50px',
  marginLeft: '10px',

  '@sm': {
    marginLeft: '0px',
  },
});

export const ChangePriceModalTrigger = styled('div', {
  width: '155px',
  height: '50px',
  marginLeft: '10px',

  '@sm': {
    marginLeft: '0px',
    width: '100%',
    flex: '1',
  },
});

export const BuyNowModalTrigger = styled('div', {
  width: '140px',
  height: '50px',
  marginRight: '10px',

  '@md': {
    marginLeft: '0px',
    width: '100%',
    flex: '1',
  },
});

export const MakeOfferModalTrigger = styled('div', {
  width: '140px',
  height: '50px',
  marginRight: '10px',

  '@md': {
    marginLeft: '0px',
    width: '100%',
    flex: '1',
  },
});

export const CancelListingModalTrigger = styled('div', {
  width: '155px',
  height: '50px',
  marginLeft: '10px',

  '@md': {
    marginLeft: '0px',
    width: '100%',
    flex: '1',
  },
});

export const CancelOfferModalTrigger = styled('div', {
  width: '98px',
  height: '33px',
  marginRight: '10px',

  variants: {
    largeButton: {
      true: {
        width: '140px',
        height: '50px',

        '@md': {
          width: '100%',
        },
      },
      false: {
        '@md': {
          height: 'unset',
          width: '100%',
        },
      },
    },
  },
});

export const AcceptOfferModalTrigger = styled('div', {
  width: '98px',
  height: '33px',

  '@md': {
    height: 'unset',
  },
});

export const WithdrawModalTrigger = styled('div', {
  fontSize: '16px',
  fontWeight: '500',
  lineHeight: '22px',
  marginLeft: '5px',
  textDecoration: 'underline',
  cursor: 'pointer',
});

export const ModalOverlayContainer = styled(DialogPrimitive.Overlay, {
  backgroundColor: '$modalOverlay',
  position: 'fixed',
  inset: 0,
  zIndex: 5,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },

  '@md': {
    background: 'rgba(0, 0, 0, 0.6)',
  },
});

export const ModalContent = styled(DialogPrimitive.Content, {
  backgroundColor: '$backgroundColor',
  borderRadius: '30px',
  border: '1.5px solid $borderColor',
  boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.25)',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: 45,
  zIndex: 6,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  '&:focus': {
    outline: 'none',
  },

  '@md': {
    width: '65%',
    height: 'max-content',
    bottom: '0%',
    padding: '15px 0px 0px',
    borderRadius: '15px',
    animation: 'unset',
  },

  '@sm': {
    width: '95%',
    height: 'max-content',
    bottom: '0%',
    padding: '15px 0px 0px',
    borderRadius: '15px',
    animation: 'unset',
  },
});

export const SellModalPreviewWrapper = styled('div', {
  display: 'flex',
  alignItems: 'end',
  gap: '65px',
});

export const SellModalPreviewContainer = styled('div', {
  width: '100%',
  maxWidth: '430px',

  '@lg': {
    maxWidth: 'unset',
  },
});

export const NFTCardPreview = styled('div', {
  width: '210px',
  '.card-router': {
    cursor: 'default',
  },

  '@lg': {
    display: 'none',
  },
});

export const NFTPreviewText = styled('div', {
  color: '$modalText',
  fontSize: '18px',
  fontWeight: '600',
  lineHeight: '20px',
  marginBottom: '20px',
});

export const Container = styled('div', {
  width: '100%',
});

export const ModalHeader = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  margin: '0px 0px 30px',

  '@md': {
    margin: '0px 15px 25px',
  },
});

export const ModalTitle = styled(DialogPrimitive.Title, {
  fontSize: '32px',
  fontWeight: 'bold',
  lineHeight: '39px',
  color: '$mainTextColor',
  margin: '0px 0px 20px',

  '@sm': {
    margin: '0px 0px 10px',
    fontSize: '24px',
    lineHeight: '29px',
  },
});

export const ModalDescription = styled(DialogPrimitive.Description, {
  fontSize: '18px',
  fontWeight: '500',
  lineHeight: '20px',
  color: '$greyMid',
  margin: '0px',

  '@sm': {
    fontSize: '16px',
  },

  variants: {
    size: {
      medium: {
        maxWidth: '396px',
      },
    },
  },
});

export const SaleContentWrapper = styled('div', {
  minWidth: '430px',

  '@lg': {
    minWidth: 'unset',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export const FeeContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  margin: '35px 0px 0px',

  '@lg': {
    width: '100%',
    margin: '25px 15px',
  },
});

export const FeeDetails = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '20px',

  '&:last-child': {
    marginBottom: '0px',
  },

  '@lg': {
    width: '100%',
  },
});

export const FeeLabelContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
});

export const FeeLabel = styled('div', {
  fontSize: '18px',
  fontWeight: '600',
  lineHeight: '20px',
  color: '#767D8E',
  marginRight: '6px',
});

export const InfoIcon = styled(Icon, {
  color: '$modalText',
  width: '16px',
  height: '16px',
  marginBottom: '-3px',
});

export const FeePercent = styled('div', {
  fontSize: '18px',
  fontWeight: '600',
  lineHeight: '20px',
  color: '#767D8E',
  marginLeft: '6px',
});

export const ItemDetailsWrapper = styled('div', {
  // base styles
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 0px 32px',
  borderBottom: '1.5px solid #E5E8EB',

  '@lg': {
    width: '100%',
    margin: '0px 15px',
    padding: '0px 0px 20px',
  },

  // variants
  variants: {
    lastChild: {
      true: {
        padding: '32px 0px 12px',
        borderTop: '1.5px solid #E5E8EB',
        borderBottom: 'initial',
        marginTop: '35px',

        '@md': {
          marginTop: '10px',
        },
      },
    },

    type: {
      withdraw: {
        padding: '0px 0px 32px',
      },
    },
  },
});

export const ItemDetails = styled('div', {
  // base styles
  display: 'flex',
  alignItems: 'center',
});

export const ItemStatus = styled('div', {
  fontSize: '18px',
  fontWeight: '500',
  lineHeight: '20px',
  color: '$modalText',
});

export const ItemLogo = styled('img', {
  width: '48px',
  height: '48px',
  borderRadius: '10px',
  marginRight: '12px',

  // variants
  variants: {
    withoutBorderRadius: {
      true: {
        borderRadius: '0px',
      },
    },
  },
});

export const ItemName = styled('div', {
  fontSize: '18px',
  fontWeight: '600',
  lineHeight: '20px',
  color: '$mainTextColor',
});

export const ItemTokenId = styled('div', {
  fontSize: '18px',
  fontWeight: '500',
  lineHeight: '20px',
  color: '$mainTextColor',
  display: 'none',

  '@md': {
    fontWeight: '600',
    display: 'block',
  },
});

export const PriceDetails = styled('div', {
  // base styles
  display: 'flex',
  flexDirection: 'column',
});

export const WICPContainer = styled('div', {
  // base styles
  display: 'flex',
  alignItems: 'center',
  marginBottom: '6px',

  // variants
  variants: {
    size: {
      small: {
        marginBottom: '4px',
      },

      large: {
        marginBottom: '8px',
      },
    },
  },
});

export const WICPText = styled('div', {
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '20px',
  color: '$mainTextColor',

  // variants
  variants: {
    size: {
      small: {
        fontSize: '18px',

        '@md': {
          fontSize: '16px',
        },
      },

      large: {
        fontSize: '24px',
      },
    },
  },
});

export const WICPLogo = styled('img', {
  width: '15px',
  height: '15px',
  marginRight: '5px',

  // variants
  variants: {
    size: {
      large: {
        width: '20px',
        height: '20px',
        marginRight: '4px',
      },
    },
  },
});

export const PriceText = styled('div', {
  fontSize: '18px',
  fontWeight: '500',
  lineHeight: '20px',
  color: '#777E90',
  textAlign: 'right',

  // variants
  variants: {
    size: {
      large: {
        fontSize: '20px',
      },
    },
  },
});

export const ModalButtonsList = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '35px',

  '@md': {
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: '20px',
  },
});

export const ModalButtonWrapper = styled('div', {
  width: '205px',
  height: '56px',
  marginRight: '21px',

  '&:last-child': {
    marginRight: '0px',

    '@md': {
      marginRight: '15px',
    },
  },

  '@md': {
    width: '100%',
    margin: '0px 15px 15px',
  },

  variants: {
    fullWidth: {
      true: {
        width: '430px',
      },
    },
  },
});

export const ActionTextWrapper = styled('span', {
  cursor: 'pointer',

  variants: {
    isDisabled: {
      true: {
        cursor: 'not-allowed',
      },
    },
  },
});

export const ActionText = styled('span', {
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '14px',
  lineHeight: '20px',
  color: '$primary',

  '&:hover': {
    opacity: '60%',
  },

  variants: {
    isDisabled: {
      true: {
        pointerEvents: 'none',
      },
    },
    danger: {
      true: {
        color: '$error',
      },
    },
  },
});

export const PlugButtonContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',

  '.plug-button': {
    marginLeft: '0px',
    width: '100%',
    fontSize: '18px',
    fontWeight: '700',
  },

  '.plug-button-text': {
    width: '100%',
    height: '50px',
  },
});
