import { useEffect } from 'react';
import { NFTActivityTable, NftDetails } from '../../components';
import { Container, NFTDetailsWrapper } from './styles';
import { useSettingsStore } from '../../store';
import PageNotFoundView from '../PageNotFoundView';

/* --------------------------------------------------------------------------
 * NFT View Component
 * --------------------------------------------------------------------------*/

const NFTView = () => {
  const { showAlerts, showPageNotFound } = useSettingsStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container showAlerts={showAlerts}>
      {!showPageNotFound ? (
        <NFTDetailsWrapper>
          <NftDetails />
          <NFTActivityTable />
        </NFTDetailsWrapper>
      ) : (
        <PageNotFoundView />
      )}
    </Container>
  );
};

export default NFTView;
