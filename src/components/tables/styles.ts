import { styled } from '../../stitches.config';

export const Container = styled('div', {
  width: '100%',
});

export const TableWrapper = styled('div', {
  position: 'relative',
  marginTop: '44px',
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
    background: '#FAFBFD',

    th: {
      textAlign: 'left',
      color: '#858585',
      fontSize: '16px',
      lineHeight: '22px',
      borderBottom: '1px solid #292929',
      whiteSpace: 'nowrap',
      minWidth: '100px',
    },

    thead: {
      tr: {
        th: {
          fontSize: '16px',
          fontWeight: '600',
          lineHeight: '19px',
          color: '#23262F',
          padding: '25px 0px 25px 10px',
          borderTop: '1px solid #E5E8EB',
          borderBottom: '1px solid #E5E8EB',

          '&:first-child': {
            paddingLeft: '80px',
          },
        },
      },
    },

    tbody: {
      tr: {
        opacity: 1,
        background: '#FFFFFF',
        td: {
          fontWeight: '500',
          padding: '25px 0px 25px 10px',
          borderBottom: '1px solid #E5E8EB',
          whiteSpace: 'nowrap',

          '&:first-child': {
            paddingLeft: '80px',
          },
        },
      },
    },
  },
});
