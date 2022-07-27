import React from 'react';
import TraitsListLoader from './TraitsListLoader';
import {
  DetailsContainer,
  PreviewContainer,
  PreviewImageSkeleton,
  AccordionSkeletion,
  Wrapper,
} from './styles';

const NFTDetailsSkeleton = () => (
  <Wrapper>
    <PreviewContainer>
      <PreviewImageSkeleton />
    </PreviewContainer>
    <DetailsContainer>
      <AccordionSkeletion />
      <AccordionSkeletion />
    </DetailsContainer>
  </Wrapper>
);

export default NFTDetailsSkeleton;

