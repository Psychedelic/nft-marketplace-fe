import React from 'react';
import { NftDetailSkeleton, NFTTraitsChipSkeleton } from './styles';

const NftDetailsSkeleton = () => {
  return (
    <NftDetailSkeleton>
      <NFTTraitsChipSkeleton></NFTTraitsChipSkeleton>
      <NFTTraitsChipSkeleton></NFTTraitsChipSkeleton>
      <NFTTraitsChipSkeleton></NFTTraitsChipSkeleton>
      <NFTTraitsChipSkeleton></NFTTraitsChipSkeleton>
    </NftDetailSkeleton>
  );
};

export default NftDetailsSkeleton;
