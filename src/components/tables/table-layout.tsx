/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable  @typescript-eslint/no-explicit-any */
import React from 'react';
import { useTable } from 'react-table';
import { TableWrapper } from './styles';

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

  return (
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
  );
};
