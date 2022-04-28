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
}

export const TableLayout = ({
  columns,
  data,
  tableType,
  columnsToHide = [],
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

  const { loadingTableData } = useTableStore();

  return loadingTableData ? (
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
            <tr
              {...headerGroup.getHeaderGroupProps()}
              key={headerGroup.id}
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
    </TableWrapper>
  );
};
