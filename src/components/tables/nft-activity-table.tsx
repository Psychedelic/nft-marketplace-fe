import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  TypeDetailsCell,
  PriceDetailsCell,
  TextCell,
  TextLinkCell,
} from '../core';
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

export interface nftActivityTableProps {
  theme: string;
}

export const NFTActivityTable = ({ theme }: nftActivityTableProps) => {
  const { t } = useTranslation();

  const columns = useMemo(
    () => [
      {
        Header: t('translation:tables.titles.event'),
        accessor: ({ type }: rowProps) => (
          <TypeDetailsCell
            name={type}
            type={type}
            tableType="nftActivity"
            theme={theme}
          />
        ),
      },
      {
        Header: t('translation:tables.titles.price'),
        accessor: ({ price }: rowProps) => (
          <PriceDetailsCell
            wicp="5.12 WICP"
            price={price}
            tableType="nftActivity"
          />
        ),
      },
      {
        Header: t('translation:tables.titles.from'),
        accessor: ({ from }: rowProps) => (
          <TextLinkCell text={from} url="" type="nftActivity" />
        ),
      },
      {
        Header: t('translation:tables.titles.to'),
        accessor: ({ to }: rowProps) => (
          <TextLinkCell text={to} url="" type="nftActivity" />
        ),
      },
      {
        Header: t('translation:tables.titles.date'),
        accessor: ({ expiration }: rowProps) => (
          <TextCell text={expiration} type="nftActivityDate" />
        ),
      },
    ],
    [t, theme], // eslint-disable-line react-hooks/exhaustive-deps
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
