import { useTable } from 'react-table';
import {
  TableWrapper,
  LoadingContainer,
  EmptyStateContainer,
  EmptyStateMessage,
} from './styles';
import TableSkeletons from './table-skeletons';

export interface TableLayoutProps {
  columns: any;
  data: Array<object>;
  tableType: any;
  columnsToHide?: Array<string>;
  loading?: boolean;
  loaderDetails: {
    showItemDetails?: boolean;
    showTypeDetails?: boolean;
    type?: string;
  };
  loadingTableRows?: boolean;
  emptyMessage?: string;
}

export const TableLayout = ({
  columns,
  data,
  tableType,
  columnsToHide = [],
  loading,
  loaderDetails,
  loadingTableRows = false,
  emptyMessage,
}: TableLayoutProps) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
    initialState: {
      hiddenColumns: columnsToHide,
    },
  });

  const isTableDataEmpty = data.length === 0;

  // TODO: Refactor Table skeleton loader
  return loading && isTableDataEmpty ? (
    <>
      <TableSkeletons loaderDetails={loaderDetails} />
      <TableSkeletons loaderDetails={loaderDetails} />
      <TableSkeletons loaderDetails={loaderDetails} />
      <TableSkeletons loaderDetails={loaderDetails} />
      <TableSkeletons loaderDetails={loaderDetails} />
      <TableSkeletons loaderDetails={loaderDetails} />
    </>
  ) : (
    <TableWrapper
      type={tableType}
      dontShowTableRows={loadingTableRows || isTableDataEmpty}
    >
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, idx) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              // eslint-disable-next-line react/no-array-index-key
              key={idx}
            >
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} key={column.id}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {!loadingTableRows && !isTableDataEmpty && (
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={row.id}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} key={cell.column.id}>
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
      {loadingTableRows && (
        <LoadingContainer>
          <TableSkeletons loaderDetails={loaderDetails} />
          <TableSkeletons loaderDetails={loaderDetails} />
          <TableSkeletons loaderDetails={loaderDetails} />
          <TableSkeletons loaderDetails={loaderDetails} />
          <TableSkeletons loaderDetails={loaderDetails} />
          <TableSkeletons loaderDetails={loaderDetails} />
        </LoadingContainer>
      )}
      {!loadingTableRows && isTableDataEmpty && (
        <EmptyStateContainer>
          <EmptyStateMessage type="mediumTable">
            {emptyMessage}
          </EmptyStateMessage>
        </EmptyStateContainer>
      )}
    </TableWrapper>
  );
};
