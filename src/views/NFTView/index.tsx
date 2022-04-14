import React, { useState, useEffect } from 'react';
import { NftActionBar, NFTActivityTable, NftDetails } from '../../components';
import { Container, NFTDetailsWrapper } from './styles';

/* --------------------------------------------------------------------------
 * NFT View Component
 * --------------------------------------------------------------------------*/

const NFTView = () => {
  // TODO: Seems that this theme and setTheme should be removed
  const [theme, setTheme] = useState('lightTheme');

  useEffect(() => {
    const getTheme = localStorage.getItem('theme');
    if (getTheme) {
      setTheme(getTheme);
    }
  });

  return (
    <Container>
      <NFTDetailsWrapper>
        <NftDetails />
        {/* TODO: What is this theme doing here? */}
        <NFTActivityTable theme={theme} />
      </NFTDetailsWrapper>
    </Container>
  );
};

export default NFTView;
