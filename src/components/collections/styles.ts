import { styled, keyframes } from '../../stitches.config';

export const ExploreCollectionsContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '160px',
});

export const ExploreCollectionsWrapper = styled('div', {
  width: '1100px',
});

export const Flex = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const Heading = styled('h1', {
  margin: '0 0 8px',
  fontStyle: 'normal',
  fontWeight: '700',
  fontSize: '32px',
  lineHeight: '32px',
  color: '$mainTextColor',
});

export const SubText = styled('p', {
  margin: '0',
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '16px',
  lineHeight: '27px',
  color: '$textNeutralColor',

  variants: {
    size: {
      sm: {
        fontSize: '15px',
      },
    },
    color: {
      primary: {
        color: '$mainTextColor',
      },
    },
    font: {
      bold: {
        fontWeight: '600',
      },
    },
    height: {
      small: {
        lineHeight: '24px',
      },
    },
  },
});

export const OwnerText = styled('span', {
  color: '$primary',
});

export const CollectionsContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
  marginTop: '40px',
  flexWrap: 'wrap',
});

export const CollectionContainer = styled('div', {
  width: '260px',
  marginRight: '20px',
  marginBottom: '25px',
  background: '$backgroundColor',
  borderRadius: '14px',
  boxShadow: '0px 0px 8px #E6E9EF',

  '&:nth-child(4)': {
    marginRight: 'unset',
  },
});

export const BannerImage = styled('img', {
  width: '100%',
  borderTopRightRadius: '14px',
  borderTopLeftRadius: '14px',
});

export const LogoImageWrapper = styled('div', {
  position: 'relative',
  left: '10px',
  top: '-20px',
});

export const LogoImage = styled('img', {
  width: '80px',
  height: '80px',
});

export const CollectionDataWrapper = styled('div', {
  display: 'flex',
});

export const CollectionData = styled('div', {
  marginLeft: '20px',
});
