import { useEffect } from 'react';
import { NFTActivityTable, NftDetails } from '../../components';
import { Container, NFTDetailsWrapper } from './styles';

/* --------------------------------------------------------------------------
 * NFT View Component
 * --------------------------------------------------------------------------*/

const NFTView = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Container>
      <NFTDetailsWrapper>
        <NftDetails />
        <NFTActivityTable />
      </NFTDetailsWrapper>
    </Container>
  );
};

export default NFTView;
