/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable  @typescript-eslint/no-explicit-any */
import React from 'react';
import { useTable } from 'react-table';
import { useTableStore } from '../../store';
import { TableWrapper } from './styles';
import TableSkeletons from './table-skeletons';

export interface TableLayoutProps {
  columns: any;
  data: Array<object>;
  tableType: any;
  columnsToHide?: Array<string>;
  loading: boolean;
}

export const TableLayout = ({
  columns,
  data,
  tableType,
  columnsToHide = [],
  loading,
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

  // TODO: We may need to remove loadingTableData fetching
  // from store and replace with props, since this a common layout
  // across all the tables
  const { loadingTableData } = useTableStore();

  return (
    <>
      {loadingTableData || loading ? (
        <>
          <TableSkeletons />
          <TableSkeletons />
          <TableSkeletons />
          <TableSkeletons />
          <TableSkeletons />
          <TableSkeletons />
        </>
      ) : (
        <TableWrapper type={tableType}>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </TableWrapper>
      )}
    </>
  );
};
