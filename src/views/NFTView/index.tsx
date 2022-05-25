import { useEffect } from 'react';
import { NFTActivityTable, NftDetails } from '../../components';
import { Container, NFTDetailsWrapper } from './styles';
import { useSettingsStore } from '../../store';

/* --------------------------------------------------------------------------
 * NFT View Component
 * --------------------------------------------------------------------------*/

const NFTView = () => {
  const { showAlerts } = useSettingsStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container showAlerts={showAlerts}>
      <NFTDetailsWrapper>
        <NftDetails />
        <NFTActivityTable />
      </NFTDetailsWrapper>
    </Container>
  );
};

export default NFTView;
