import React from 'react';
import { NftDetailTraitSkeleton, NFTTraitsChipSkeleton } from './styles';

const NftDetailsTraitSkeleton = () => {
  return (
    <NftDetailTraitSkeleton>
      <NFTTraitsChipSkeleton></NFTTraitsChipSkeleton>
      <NFTTraitsChipSkeleton></NFTTraitsChipSkeleton>
      <NFTTraitsChipSkeleton></NFTTraitsChipSkeleton>
      <NFTTraitsChipSkeleton></NFTTraitsChipSkeleton>
    </NftDetailTraitSkeleton>
  );
};

export default NftDetailsTraitSkeleton;
