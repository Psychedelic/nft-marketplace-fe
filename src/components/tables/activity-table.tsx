import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ItemDetailsCell } from '../core';
import { TableLayout } from './table-layout';
import { mockTableData } from './mock-data';
import { Container } from './styles';

export interface rowProps {
  item: {
    name: string;
    logo: string;
  };
  type: string;
  price: string;
  quantity: string;
  from: string;
  to: string;
  time: string;
}

export const ActivityTable = () => {
  const { t } = useTranslation();

  const columns = useMemo(
    () => [
      {
        Header: t('translation:tables.titles.item'),
        accessor: ({ item }: rowProps) => (
          <ItemDetailsCell name={item.name} logo={item.logo} />
        ),
      },
      {
        Header: t('translation:tables.titles.type'),
        accessor: ({ type }: rowProps) => <div>{type}</div>,
      },
      {
        Header: t('translation:tables.titles.price'),
        accessor: ({ price }: rowProps) => <div>{price}</div>,
      },
      {
        Header: t('translation:tables.titles.quantity'),
        accessor: ({ quantity }: rowProps) => <div>{quantity}</div>,
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
        Header: t('translation:tables.titles.time'),
        accessor: ({ time }: rowProps) => <div>{time}</div>,
      },
    ],
    [], // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <Container>
      <TableLayout
        columns={columns}
        data={mockTableData}
        tableType="activity"
      />
    </Container>
  );
};
