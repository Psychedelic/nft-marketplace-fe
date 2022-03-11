import React from 'react';
import { NftSkeleton } from '../core';
import { NftListData } from '../mock-data/nft-list-data';
import { ListWrapper } from './styles';

export const NftSkeletonList = () => (
  <>
    {NftListData.map((item) => (
      <NftSkeleton key={item.id} />
    ))}
  </>
);
