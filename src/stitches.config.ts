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
      tableLinkTextColor: '#2253FF',
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
        'linear-gradient(90deg, rgb(229, 232, 235) 0%, rgb(247, 248, 250) 59.9%)',
      checkboxSelectedFiltersText: '#23262F',
      greyMid: '#767D8E',
    },
    space: {},
    fonts: {},
  },
  media: {
    sm: '(max-width: 640px)',
    md: '(max-width: 1024px)',
    lg: '(max-width: 1140px)',
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
    buttonsBorderColor: '#777E90',
    nftCardName: '#ffffff',
    nftCardId: '#777E90',
    nftCardSubSection: '#202022',
    tableBackgroundColor: '#141416',
    tableTextColor: '#ffffff',
    tableNftActivityTextColor: '#ffffff',
    tableLinkTextColor: '#ffffff',
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
      'linear-gradient(90deg, rgb(36 34 34) 0%, rgb(41 42 44) 59.9%)',
    checkboxSelectedFiltersText: '#2253FF',
  },
});
