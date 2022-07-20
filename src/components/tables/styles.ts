import InfiniteScroll from 'react-infinite-scroller';
import { styled } from '../../stitches.config';

export const Container = styled('div', {
  width: '100%',
  paddingBottom: '8px', // TODO: make variant
});

export const TableWrapper = styled('div', {
  // marginTop: '44px', // TODO: make variant
  width: '100%',

  table: {
    borderSpacing: '0',
    width: 'inherit',
    background: '$tableBackgroundColor',

    th: {
      textAlign: 'left',
      color: '#858585',
      fontSize: '16px',
      lineHeight: '22px',
      borderBottom: '1px solid #292929',
      whiteSpace: 'nowrap',
    },

    thead: {
      tr: {
        th: {
          fontSize: '16px',
          fontWeight: '500',
          lineHeight: '19px',
          color: '$mainTextColor',
          padding: '25px 0px 25px 10px',
          borderTop: '1px solid $borderColor',
          borderBottom: '1px solid $borderColor',
          minWidth: '100px',

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

            '@sm': {
              paddingLeft: '25px',
            },
          },

          '@sm': {
            borderTop: '1px solid $borderColor',
            padding: '20px 0px 20px 10px',
          },
        },
        '&:hover': {
          background: '$tableRowHoverColor',
          '.item-name': {
            color: '$primary',
          },
        },
      },
    },
  },

  // Variants
  variants: {
    type: {
      offers: {
        height: 'initial',
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
                minWidth: 'unset',

                '&:first-child': {
                  paddingLeft: '20px',
                },

                '@sm': {
                  padding: '10px 5px',

                  '&:first-child': {
                    paddingLeft: '10px',
                  },
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

                '@sm': {
                  padding: '10px 5px',

                  '&:first-child': {
                    paddingLeft: '10px',
                  },
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
          '@sm': {
            borderTopRightRadius: 'unset',
            borderTopLeftRadius: 'unset',
          },

          thead: {
            tr: {
              th: {
                color: '$greyMid',
                fontSize: '18px',
                fontWeight: '500',
                lineHeight: '22px',
                borderTop: 'initial',
                borderBottom: '1px solid $borderColor',
                padding: '16px 20px',

                '&:first-child': {
                  paddingLeft: '20px',
                },

                '@sm': {
                  background: 'white',
                  color: '$mainTextColor',
                  fontSize: '20px',
                  lineHeight: '24px',
                  fontWeight: '600',
                  padding: '25px 0',
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
                '@sm': {
                  padding: '14px 20px',
                },
              },
              '&:last-child': {
                borderRadius: '15px',
                td: {
                  borderBottom: 'initial',
                  '&:first-child': {
                    borderRadius: '15px',

                    '@sm': {
                      borderRadius: 'unset',
                    },
                  },
                  '&:last-child': {
                    borderRadius: '15px',

                    '@sm': {
                      borderRadius: 'unset',
                    },
                  },
                  '@sm': {
                    borderBottom: 'unset',
                  },
                },
              },

              '@sm': {
                background: 'white',
              },
            },
          },
        },
      },
    },
    dontShowTableRows: {
      true: {
        table: {
          borderRadius: '15px 15px 0px 0px',
        },
      },
    },
  },
});

export const ButtonWrapper = styled('div', {
  width: '98px',
  height: '33px',
});

export const InfiniteScrollWrapper = styled(InfiniteScroll as any, {
  table: {
    width: 'inherit',

    tr: {
      td: {
        padding: '25px 0px 25px 10px',

        '&:first-child': {
          paddingLeft: '80px',

          '@sm': {
            paddingLeft: '25px',
          },
        },
      },
    },
  },

  '&:hover': {
    background: '$tableRowHoverColor',
  },
});

export const TableSkeletonsWrapper = styled('tr', {
  // variants
  variants: {
    type: {
      small: {
        padding: '10px 20px',

        '&:nth-child(1)': {
          paddingTop: '15px',
        },
      },
      medium: {
        padding: '10px 30px',
      },
      large: {
        padding: '5px 80px',

        '&:nth-child(1)': {
          paddingTop: '30px',
        },
      },
    },
  },

  '@sm': {
    padding: '5px 25px',
  },
});

export const Flex = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',

  variants: {
    isMobileScreen: {
      true: {
        justifyContent: 'flex-end',
        paddingRight: '25px',
      },
    },
  },
});

export const EmptyStateContainer = styled('th', {
  border: 'none !important',
});

export const EmptyStateMessage = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  fontStyle: 'normal',

  // variants
  variants: {
    type: {
      smallTable: {
        fontWeight: '500',
        fontSize: '16px',
        lineHeight: '19px',
        color: '$mainTextColor',
        padding: '50px 25px',
      },
      mediumTable: {
        fontWeight: '500',
        fontSize: '16px',
        lineHeight: '19px',
        color: '$mainTextColor',
        padding: '50px 25px',
        margin: '0px',
      },
      largeTable: {
        height: '100vh',
        fontWeight: '700',
        fontSize: '32px',
        lineHeight: '39px',
        color: '$mainTextColor',
        margin: '150px 50px',
      },
    },
  },
});

export const LoadingContainer = styled('div', {
  border: '1px solid $borderColor',
  borderRadius: '0px 0px 15px 15px',
  borderTop: '0px',
  padding: '20px 10px 20px 0px',
});
