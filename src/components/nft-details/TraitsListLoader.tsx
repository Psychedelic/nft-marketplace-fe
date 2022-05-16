import React from 'react';
import {
  TraitsListLoaderSkeletonWrapper,
  NFTTraitsChipSkeleton,
} from './styles';

const TraitsListLoader = () => (
  <TraitsListLoaderSkeletonWrapper>
    <NFTTraitsChipSkeleton />
    <NFTTraitsChipSkeleton />
    <NFTTraitsChipSkeleton />
    <NFTTraitsChipSkeleton />
  </TraitsListLoaderSkeletonWrapper>
);

export default TraitsListLoader;

