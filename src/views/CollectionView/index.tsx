import React from 'react';
import {
  NavBar,
  CollectionOverview,
  CollectionTabs,
} from '../../components';
import { Container, CollectionWrapper } from './styles';

/* --------------------------------------------------------------------------
 * Collection View Component
 * --------------------------------------------------------------------------*/

const CollectionView = () => (
  <Container>
    <NavBar />
    <CollectionWrapper>
      <CollectionOverview />
    </CollectionWrapper>
    <CollectionTabs />
  </Container>
);

export default CollectionView;
