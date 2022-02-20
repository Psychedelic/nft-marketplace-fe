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
    const getTheme = localStorage.getItem('theme');
    setTheme(getTheme);
  });

  return (
    <Container>
      <NftActionBar />
      <NFTDetailsWrapper>
        <NftDetails />
        <NFTActivityTable theme={theme} />
      </NFTDetailsWrapper>
    </Container>
  );
};

export default NFTView;
