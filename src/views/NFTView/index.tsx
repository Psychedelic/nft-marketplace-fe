import React from 'react';
import {
  NftActionBar,
  NFTActivityTable,
  NftDetails,
} from '../../components';
import { Container, NFTDetailsWrapper } from './styles';

/* --------------------------------------------------------------------------
 * NFT View Component
 * --------------------------------------------------------------------------*/

const NFTView = () => (
  <Container>
    <NftActionBar />
    <NFTDetailsWrapper>
      <NftDetails />
      <NFTActivityTable />
    </NFTDetailsWrapper>
  </Container>
);

export default NFTView;
