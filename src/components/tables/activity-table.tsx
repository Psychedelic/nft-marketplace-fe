import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ItemDetailsCell,
  TypeDetailsCell,
  PriceDetailsCell,
} from '../core';
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
        accessor: ({ type }: rowProps) => (
          <TypeDetailsCell name={type} type={type} />
        ),
      },
      {
        Header: t('translation:tables.titles.price'),
        accessor: ({ price }: rowProps) => (
          <PriceDetailsCell wicp="5.12 WICP" price={price} />
        ),
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
