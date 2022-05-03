import React from 'react';
import { CardWrapper, SkeletonLarge, SkeletonSmall } from './styles';

export const NftSkeleton = () => (
  <CardWrapper>
    <SkeletonLarge />
    <SkeletonSmall />
    <SkeletonSmall />
  </CardWrapper>
);
