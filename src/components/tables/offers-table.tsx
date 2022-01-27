import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { TableLayout } from './table-layout';
import { mockTableData } from './mock-data';
import { Container } from './styles';

export interface rowProps {
  price: string;
  floorDifference: string;
  from: string;
  expiration: string;
}

export const OffersTable = () => {
  const { t } = useTranslation();

  const columns = useMemo(
    () => [
      {
        Header: t('translation:tables.titles.price'),
        accessor: ({ price }: rowProps) => <div>{price}</div>,
      },
      {
        Header: t('translation:tables.titles.floorDifference'),
        accessor: ({ floorDifference }: rowProps) => (
          <div>{floorDifference}</div>
        ),
      },
      {
        Header: t('translation:tables.titles.expiration'),
        accessor: ({ expiration }: rowProps) => (
          <div>{expiration}</div>
        ),
      },
      {
        Header: t('translation:tables.titles.from'),
        accessor: ({ from }: rowProps) => <div>{from}</div>,
      },
      {
        Header: t('translation:tables.titles.action'),
        accessor: () => <div>Action</div>,
      },
    ],
    [], // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <Container>
      <TableLayout
        columns={columns}
        data={mockTableData}
        tableType="offers"
      />
    </Container>
  );
};
