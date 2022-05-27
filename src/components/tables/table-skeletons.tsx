import { SkeletonBox } from '../core/skeleton';
import { TableSkeletonsWrapper, Flex } from './styles';

export type TableSkeletonProps = {
  loaderDetails: {
    showItemDetails?: boolean;
    showTypeDetails?: boolean;
    type?: any;
    hideColumns?: boolean;
  };
};

export type TableStringsProps = {
  type?: any;
  hideColumns?: boolean;
};

export const ItemDetail = () => (
  <td>
    <Flex>
      <SkeletonBox style={{ width: '48px', height: '48px' }} />
      <SkeletonBox style={{ width: '160px' }} />
    </Flex>
  </td>
);

export const TypeDetail = () => (
  <td>
    <Flex>
      <SkeletonBox style={{ width: '20px', height: '20px' }} />
      <SkeletonBox />
    </Flex>
  </td>
);

export const PriceDetail = () => (
  <td>
    <SkeletonBox />
    <SkeletonBox />
  </td>
);

export const TableStrings = ({
  type,
  hideColumns,
}: TableStringsProps) => (
  <td>
    <SkeletonBox size={!hideColumns ? type : undefined} />
  </td>
);

const TableSkeletons = ({
  loaderDetails: {
    showItemDetails = true,
    showTypeDetails = true,
    type = 'large',
    hideColumns,
  },
}: TableSkeletonProps) => (
  <TableSkeletonsWrapper type={type} role="row">
    {showItemDetails && <ItemDetail />}
    {showTypeDetails && <TypeDetail />}
    <TableStrings type={type} hideColumns={hideColumns} />
    <TableStrings type={type} hideColumns={hideColumns} />
    <TableStrings type={type} hideColumns={hideColumns} />
    <TableStrings type={type} hideColumns={hideColumns} />
    {hideColumns === false && (
      <TableStrings type={type} hideColumns={hideColumns} />
    )}
  </TableSkeletonsWrapper>
);

export default TableSkeletons;
