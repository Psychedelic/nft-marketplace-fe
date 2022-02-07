import React from 'react';
import { NftActionBar, NFTActivityTable } from '../../components';
import { Container, NFTDetailsWrapper } from './styles';

/* --------------------------------------------------------------------------
 * NFT View Component
 * --------------------------------------------------------------------------*/

const NFTView = () => (
  <Container>
    <NftActionBar />
    <NFTDetailsWrapper>
      <NFTActivityTable />
    </NFTDetailsWrapper>
  </Container>
);

export default NFTView;
