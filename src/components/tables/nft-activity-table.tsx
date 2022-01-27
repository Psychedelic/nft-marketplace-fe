import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { TableLayout } from './table-layout';
import { mockTableData } from './mock-data';
import { Container } from './styles';

export interface rowProps {
  price: string;
  type: string;
  from: string;
  to: string;
  expiration: string;
}

export const NFTActivityTable = () => {
  const { t } = useTranslation();

  const columns = useMemo(
    () => [
      {
        Header: t('translation:tables.titles.event'),
        accessor: ({ type }: rowProps) => <div>{type}</div>,
      },
      {
        Header: t('translation:tables.titles.price'),
        accessor: ({ price }: rowProps) => <div>{price}</div>,
      },
      {
        Header: t('translation:tables.titles.from'),
        accessor: ({ from }: rowProps) => <div>{from}</div>,
      },
      {
        Header: t('translation:tables.titles.to'),
        accessor: ({ to }: rowProps) => <div>{to}</div>,
      },
      {
        Header: t('translation:tables.titles.date'),
        accessor: ({ expiration }: rowProps) => (
          <div>{expiration}</div>
        ),
      },
    ],
    [], // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <Container>
      <TableLayout
        columns={columns}
        data={mockTableData}
        tableType="nftActivity"
      />
    </Container>
  );
};
