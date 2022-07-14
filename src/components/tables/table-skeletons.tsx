import { SkeletonBox } from '../core/skeleton';
import { TableSkeletonsWrapper, Flex, Container } from './styles';

export type TableSkeletonProps = {
  loaderDetails: {
    showItemDetails?: boolean;
    showTypeDetails?: boolean;
    type?: any;
    hideColumns?: boolean;
    infiniteLoader?: boolean;
    isMobileScreen?: boolean;
  };
};

export type TableStringsProps = {
  type?: any;
  hideColumns?: boolean;
};

export type TypeDetailProps = {
  isMobileScreen?: boolean;
};

export const ItemDetail = () => (
  <td>
    <Flex>
      <SkeletonBox style={{ width: '48px', height: '48px' }} />
      <SkeletonBox size="large" />
    </Flex>
  </td>
);

export const TypeDetail = ({ isMobileScreen }: TypeDetailProps) => (
  <td>
    <Flex isMobileScreen={isMobileScreen}>
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
    infiniteLoader,
    isMobileScreen,
  },
}: TableSkeletonProps) => {
  console.log(isMobileScreen);

  return infiniteLoader ? (
    <Container>
      <table>
        <tbody>
          <TableSkeletonsWrapper type={type} role="row">
            {isMobileScreen ? (
              <>
                {showItemDetails && <ItemDetail />}
                {showTypeDetails && (
                  <TypeDetail isMobileScreen={isMobileScreen} />
                )}
              </>
            ) : (
              <>
                {showItemDetails && <ItemDetail />}
                {showTypeDetails && <TypeDetail />}
                <TableStrings type={type} hideColumns={hideColumns} />
                <TableStrings type={type} hideColumns={hideColumns} />
                <TableStrings type={type} hideColumns={hideColumns} />
                <TableStrings type={type} hideColumns={hideColumns} />
                {hideColumns === false && (
                  <TableStrings
                    type={type}
                    hideColumns={hideColumns}
                  />
                )}
              </>
            )}
          </TableSkeletonsWrapper>
        </tbody>
      </table>
    </Container>
  ) : (
    <TableSkeletonsWrapper type={type} role="row">
      {isMobileScreen ? (
        <>
          {showItemDetails && <ItemDetail />}
          {showTypeDetails && (
            <TypeDetail isMobileScreen={isMobileScreen} />
          )}
        </>
      ) : (
        <>
          {showItemDetails && <ItemDetail />}
          {showTypeDetails && <TypeDetail />}
          <TableStrings type={type} hideColumns={hideColumns} />
          <TableStrings type={type} hideColumns={hideColumns} />
          <TableStrings type={type} hideColumns={hideColumns} />
          <TableStrings type={type} hideColumns={hideColumns} />
          {hideColumns === false && (
            <TableStrings type={type} hideColumns={hideColumns} />
          )}
        </>
      )}
    </TableSkeletonsWrapper>
  );
};
export default TableSkeletons;
