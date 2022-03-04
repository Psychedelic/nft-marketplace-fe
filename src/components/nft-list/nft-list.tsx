import React from 'react';
import { NftCard } from '../core/cards/nft-card';
import { ListWrapper } from './styles';

import { useNFTSStore } from '../../store';

export const NftList = () => {
  const { loadedNFTS } = useNFTSStore();

  return (
    <ListWrapper>
      {loadedNFTS.map((nft) => (
        <NftCard data={nft} key={nft.id} />
      ))}
    </ListWrapper>
  );
};