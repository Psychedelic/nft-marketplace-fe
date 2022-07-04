import { createStitches } from '@stitches/react';

export const {
  styled,
  css,
  globalCss,
  keyframes,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      backgroundColor: '#ffffff',
      navBackgroundColor: '#ffffff',
      buttonBackgroundColor: '#ffffff',
      mainTextColor: '#23262F',
      tabActive: '#23262F',
      borderColor: '#E5E8EB',
      buttonsBorderColor: '#E5E8EB',
      nftCardName: '#767D8E',
      nftCardId: '#23262F',
      nftCardSubSection: '#f6f7f9',
      tableBackgroundColor: '#FAFBFD',
      tableTextColor: '#777E90',
      tableNftActivityTextColor: '#767D8E',
      tableLinkTextColor: '#5542CF',
      tableRowHoverColor: '#F4F5F6',
      openAccordion: '#FAFBFD',
      closeAccordion: '#ffffff',
      accordionHeadingTextColor: '#767D8E',
      accordionContentBackgroundColor: '#FAFBFD',
      chipsTextColor: '#000000',
      chipsBackgroundColor: '#F4F5F6',
      chipsNftBackgroundColor: '#F4F5F6',
      modalOverlay: '#fafbfde6',
      skeletonBackground:
        'linear-gradient(160deg, rgb(209 211 213) 20%, rgb(247, 248, 250) 80%)',
      checkboxSelectedFiltersText: '#23262F',
      greyMid: '#767D8E',
      error: '#FD5F51',
      primary: '#5542CF',
      success: '#00AC7C',
      modalText: '#767D8E',
      toastBackground: '#ffffff',
      iconGrey: '#767D8F',
      lightYellow: '#ffd71926',
      paleYellow: '#987E00',
      regentGrey: '#777E8F',
      black: '#000000',
      white: '#FFFFFF',
    },
    space: {},
    fonts: {},
    shadows: {
      default: '0px 0px 8px #E6E9EF',
      active: '0px 0px 16px #E6E9EF',
    },
  },
  media: {
    // TODO: For responsiveness
    // find that is best to do mobile first approach
    // which means that you'd have min-width, instead
    // of max-width, to allow you to provide a set of
    // rules that fulfill a wider range
    sm: '(max-width: 640px)',
    md: '(max-width: 850px)',
    lg: '(max-width: 1140px)',
    // TODO: considering the request above
    // here's a temporary breakpoint
    large: '(min-width: 1140px)',
  },
  utils: {},
});

export const darkTheme = createTheme({
  colors: {
    backgroundColor: '#141416',
    navBackgroundColor: '#000000',
    buttonBackgroundColor: '#000000',
    mainTextColor: '#ffffff',
    borderColor: '#353945',
    buttonsBorderColor: '#353945',
    nftCardName: '#777E90',
    nftCardId: '#777E90',
    nftCardSubSection: '#202022',
    tableBackgroundColor: '#141416',
    tableTextColor: '#ffffff',
    tableNftActivityTextColor: '#ffffff',
    tableLinkTextColor: '#2253FF',
    tableRowHoverColor: '#141416',
    openAccordion: '#19191C',
    closeAccordion: '#141416',
    accordionHeadingTextColor: '#ffffff',
    accordionContentBackgroundColor: '#141416',
    chipsTextColor: '#ffffff',
    chipsBackgroundColor: '#000000',
    chipsNftBackgroundColor: 'transparent',
    tabActive: '#ffffff',
    modalOverlay: '#0a0a0ae6',
    skeletonBackground:
      'linear-gradient(160deg, rgb(36 34 34) 20%, rgb(41 42 44) 80%)',
    checkboxSelectedFiltersText: '#5542CF',
    error: '#FD5F51',
    primary: '#5542CF',
    success: '#00AC7C',
    modalText: '#767D8E',
    toastBackground: '#1e1e1e',
    black: '#FFFFFF',
    white: '#000000',
  },
  shadows: {
    default: 'none',
    active: 'none',
  },
});
