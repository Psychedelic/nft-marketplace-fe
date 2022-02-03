import React from 'react';
import { NftCard } from '../core/cards/nft-card';
import { NftListData } from '../mock-data/nft-list-data';
import { ListWrapper } from './styles';

export const NftList = () => (
  <ListWrapper>
    {NftListData.map((data) => (
      <NftCard data={data} />
    ))}
  </ListWrapper>
);
