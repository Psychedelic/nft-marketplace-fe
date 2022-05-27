import React from 'react';
import { CollectionOverview, CollectionTabs } from '../../components';
import { Container, CollectionWrapper } from './styles';
import { useSettingsStore } from '../../store';

/* --------------------------------------------------------------------------
 * Collection View Component
 * --------------------------------------------------------------------------*/

const CollectionView = () => {
  const { showAlerts } = useSettingsStore();

  return (
    <Container>
      <CollectionWrapper showAlerts={showAlerts}>
        <CollectionOverview />
      </CollectionWrapper>
      <CollectionTabs />
    </Container>
  );
};

export default CollectionView;
