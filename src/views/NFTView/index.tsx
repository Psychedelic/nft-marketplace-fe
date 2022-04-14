import React, { useState, useEffect } from 'react';
import {
  NftActionBar,
  NFTActivityTable,
  NftDetails,
} from '../../components';
import { Container, NFTDetailsWrapper } from './styles';

/* --------------------------------------------------------------------------
 * NFT View Component
 * --------------------------------------------------------------------------*/

const NFTView = () => {
  const [theme, setTheme] = useState('lightTheme');

  useEffect(() => {
    window.scrollTo(0, 0);

    const getTheme = localStorage.getItem('theme');
    if (getTheme) {
      setTheme(getTheme);
    }
  });

  return (
    <Container>
      <NFTDetailsWrapper>
        <NftDetails />
        <NFTActivityTable theme={theme} />
      </NFTDetailsWrapper>
    </Container>
  );
};

export default NFTView;
