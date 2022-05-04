import InfiniteScroll from 'react-infinite-scroller';
import { styled } from '../../stitches.config';

export const Container = styled('div', {
  width: '100%',
  paddingBottom: '8px', // TODO: make variant
});

export const TableWrapper = styled('div', {
  // marginTop: '44px', // TODO: make variant
  width: '100%',
  height: '100vh',

  table: {
    borderSpacing: '0',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'transparent',
    borderImage: 'initial',
    width: 'inherit',
    background: '$tableBackgroundColor',

    th: {
      textAlign: 'left',
      color: '#858585',
      fontSize: '16px',
      lineHeight: '22px',
      borderBottom: '1px solid #292929',
      whiteSpace: 'nowrap',
      // minWidth: '100px', // TODO: make variant
    },

    thead: {
      tr: {
        th: {
          fontSize: '16px',
          fontWeight: '600',
          lineHeight: '19px',
          color: '$mainTextColor',
          padding: '25px 0px 25px 10px',
          borderTop: '1px solid $borderColor',
          borderBottom: '1px solid $borderColor',

          '&:first-child': {
            paddingLeft: '80px',
          },
        },
      },
    },

    tbody: {
      tr: {
        opacity: 1,
        background: '$backgroundColor',

        td: {
          fontWeight: '500',
          padding: '25px 0px 25px 10px',
          borderBottom: '1px solid $borderColor',
          whiteSpace: 'nowrap',

          '&:first-child': {
            paddingLeft: '80px',
          },
        },
        '&:hover': {
          background: '$tableRowHoverColor',
          '.item-name': {
            color: '#2253FF',
          },
        },
      },
    },
  },

  // Variants
  variants: {
    type: {
      offers: {
        table: {
          background: '$backgroundColor',
          thead: {
            tr: {
              th: {
                color: '$tableTextColor',
                fontSize: '16px',
                fontWeight: '500',
                lineHeight: '19px',
                borderBottom: '1px solid $borderColor',
                padding: '10px 20px',

                '&:first-child': {
                  paddingLeft: '20px',
                },
              },
            },
          },
          tbody: {
            tr: {
              background: '$tableBackgroundColor',
              td: {
                color: '$tableTextColor',
                padding: '16px 20px',
                fontSize: '16px',
                fontWeight: '500',
                lineHeight: '19px',
                borderBottom: '1px solid $borderColor',
                '&:first-child': {
                  paddingLeft: '20px',
                },
              },
              '&:last-child': {
                td: {
                  borderBottom: 'initial',
                },
              },
            },
          },
        },
      },

      nftActivity: {
        table: {
          background: '$tableBackgroundColor',
          border: '1.5px solid $borderColor',
          boxSizing: 'border-box',
          borderRadius: '15px',
          thead: {
            tr: {
              th: {
                // color: '#767D8E',
                color: '$mainTextColor',
                fontSize: '18px',
                fontWeight: '500',
                lineHeight: '22px',
                borderTop: 'initial',
                borderBottom: '1px solid $borderColor',
                padding: '16px 20px',

                '&:first-child': {
                  paddingLeft: '20px',
                },
              },
            },
          },
          tbody: {
            tr: {
              background: '$tableBackgroundColor',
              td: {
                color: '$mainTextColor',
                padding: '24px 20px',
                fontSize: '18px',
                fontWeight: '500',
                lineHeight: '22px',
                borderBottom: '1px solid $borderColor',
                '&:first-child': {
                  paddingLeft: '20px',
                },
              },
              '&:last-child': {
                borderRadius: '15px',
                td: {
                  borderBottom: 'initial',
                  '&:first-child': {
                    borderRadius: '15px',
                  },
                  '&:last-child': {
                    borderRadius: '15px',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
});

export const ButtonWrapper = styled('div', {
  width: '98px',
  height: '33px',
});

export const InfiniteScrollWrapper = styled(InfiniteScroll, {
  width: '100%',
  height: '100vh',
});

export const TableSkeletonsWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  // variants
  variants: {
    type: {
      small: {
        padding: '10px 20px',

        '&:nth-child(1)': {
          paddingTop: '15px',
        },
      },

      large: {
        padding: '5px 80px',

        '&:nth-child(1)': {
          paddingTop: '30px',
        },
      },
    },
  },
});

export const ImageSkeleton = styled('div', {
  width: '48px',
  height: '48px',
  margin: '10px 0px',
  borderRadius: '10px',
  marginRight: '12px',
  backgroundColor: 'rgba(0, 0, 0, 0.11)',
  background: '$skeletonBackground',
});

export const NameSkeleton = styled('div', {
  width: '300px',
  height: '20px',
  borderRadius: '10px',
  backgroundColor: 'rgba(0, 0, 0, 0.11)',
  background: '$skeletonBackground',
});

export const Flex = styled('div', {
  display: 'flex',
  alignItems: 'center',
});

export const TypeDetailsSkeleton = styled('div', {
  width: '48px',
  height: '48px',
  margin: '10px 0px',
  borderRadius: '10px',
  marginRight: '12px',
  backgroundColor: 'rgba(0, 0, 0, 0.11)',
  background: '$skeletonBackground',
});

export const PriceSkeleton = styled('div', {
  width: '100px',
  height: '15px',
  borderRadius: '10px',
  backgroundColor: 'rgba(0, 0, 0, 0.11)',
  background: '$skeletonBackground',

  '&:nth-child(1)': {
    marginBottom: '5px',
  },
});

export const StringSkeleton = styled('div', {
  width: '120px',
  height: '15px',
  borderRadius: '10px',
  backgroundColor: 'rgba(0, 0, 0, 0.11)',
  background: '$skeletonBackground',
});

export const EmptyStateMessage = styled('p', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100vh',
  fontStyle: 'normal',
  fontWeight: '700',
  fontSize: '32px',
  lineHeight: '39px',
  color: '$mainTextColor',
  margin: '150px 50px',
});
