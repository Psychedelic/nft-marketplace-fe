import React from 'react';
import {
  TableSkeletonsWrapper,
  ImageSkeleton,
  NameSkeleton,
  Flex,
  PriceSkeleton,
  StringSkeleton,
} from './styles';

export type TableSkeletonProps = {
  loaderDetails: {
    showItemDetails?: boolean;
    showTypeDetails?: boolean;
    type?: any;
  };
};

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

const TableSkeletons = ({
  loaderDetails: {
    showItemDetails = true,
    showTypeDetails = true,
    type = 'large',
  },
}: TableSkeletonProps) => (
  <TableSkeletonsWrapper type={type}>
    {showItemDetails && <ItemDetail />}
    {showTypeDetails && <TypeDetail />}
    <PriceDetail />
    <TableStrings />
    <TableStrings />
    <TableStrings />
  </TableSkeletonsWrapper>
);

export default TableSkeletons;
