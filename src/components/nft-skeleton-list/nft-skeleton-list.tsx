import { NftSkeleton } from '../core';
import { NftListData } from '../mock-data/nft-list-data';

export const NftSkeletonList = () => (
  <>
    {NftListData.map((item) => (
      <NftSkeleton key={item.id} />
    ))}
  </>
);
