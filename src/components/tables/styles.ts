import InfiniteScroll from 'react-infinite-scroller';
import { styled } from '../../stitches.config';

export const Container = styled('div', {
  width: '100%',
  paddingBottom: '8px', // TODO: make variant
});

export const TableWrapper = styled('div', {
  position: 'relative',
  // marginTop: '44px', // TODO: make variant
  width: '100%',
  height: '100%',
  overflowX: 'auto',

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
  height: '100%',
  overflowX: 'auto',
});
