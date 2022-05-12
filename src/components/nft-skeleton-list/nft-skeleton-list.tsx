import { NftSkeleton } from '../core';

const NftListData = Array(6)
  .fill('')
  .map((_, id) => ({ id: `${id}` }));

export const NftSkeletonList = () => (
  <>
    {NftListData.map((item) => (
      <NftSkeleton key={item.id} />
    ))}
  </>
);
