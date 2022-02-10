import React from 'react';
import {
  CollectionOverview,
  CollectionTabs,
} from '../../components';
import { Container, CollectionWrapper } from './styles';

/* --------------------------------------------------------------------------
 * Collection View Component
 * --------------------------------------------------------------------------*/

const CollectionView = () => (
  <Container>
    <CollectionWrapper>
      <CollectionOverview />
    </CollectionWrapper>
    <CollectionTabs />
  </Container>
);

export default CollectionView;
