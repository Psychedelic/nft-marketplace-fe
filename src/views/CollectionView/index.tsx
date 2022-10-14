import React from 'react';
import { CollectionOverview, CollectionTabs } from '../../components';
import PageNotFoundView from '../PageNotFoundView';
import {
  Container,
  CollectionContainer,
  CollectionWrapper,
} from './styles';
import { useSettingsStore } from '../../store';

/* --------------------------------------------------------------------------
 * Collection View Component
 * --------------------------------------------------------------------------*/

const CollectionView = () => {
  const { showAlerts, showPageNotFound } = useSettingsStore();

  return (
    <Container>
      {!showPageNotFound ? (
        <CollectionContainer>
          <CollectionWrapper showAlerts={showAlerts}>
            {/* <CollectionOverview /> */}
          </CollectionWrapper>
          <CollectionTabs />
        </CollectionContainer>
      ) : (
        <PageNotFoundView />
      )}
    </Container>
  );
};

export default CollectionView;
