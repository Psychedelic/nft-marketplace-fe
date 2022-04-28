import React from 'react';
import {
  TableSkeletonsWrapper,
  ImageSkeleton,
  NameSkeleton,
  Flex,
  PriceSkeleton,
  StringSkeleton,
} from './styles';

export const ItemDetail = () => (
  <Flex>
    <ImageSkeleton />
    <NameSkeleton />
  </Flex>
);

export const TypeDetail = () => (
  <Flex>
    <ImageSkeleton />
  </Flex>
);

export const PriceDetail = () => (
  <div>
    <PriceSkeleton />
    <PriceSkeleton />
  </div>
);

export const TableStrings = () => <StringSkeleton />;

const TableSkeletons = () => (
  <TableSkeletonsWrapper>
    <ItemDetail />
    <TypeDetail />
    <PriceDetail />
    <TableStrings />
    <TableStrings />
    <TableStrings />
  </TableSkeletonsWrapper>
);

export default TableSkeletons;
