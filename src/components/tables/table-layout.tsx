import { useTable } from 'react-table';
import {
  TableWrapper,
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

  return (
    <TableWrapper type={tableType}>
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
        <tbody {...getTableBodyProps()}>
          {loading && isTableDataEmpty && (
            <>
              <TableSkeletons loaderDetails={loaderDetails} />
              <TableSkeletons loaderDetails={loaderDetails} />
              <TableSkeletons loaderDetails={loaderDetails} />
              <TableSkeletons loaderDetails={loaderDetails} />
              <TableSkeletons loaderDetails={loaderDetails} />
              <TableSkeletons loaderDetails={loaderDetails} />
            </>
          )}
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
      </table>
      {!loading && isTableDataEmpty && (
        <EmptyStateContainer>
          <EmptyStateMessage type="mediumTable">
            {emptyMessage}
          </EmptyStateMessage>
        </EmptyStateContainer>
      )}
    </TableWrapper>
  );
};
