import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '../../store';
import {
  TypeDetailsCell,
  PriceDetailsCell,
  TextCell,
  TextLinkCell,
} from '../core';
import { TableLayout } from './table-layout';
import { mockTableData } from './mock-data';
import { Container } from './styles';

interface RowProps {
  price: string;
  type: string;
  from: string;
  to: string;
  expiration: string;
}

export const NFTActivityTable = () => {
  const { t } = useTranslation();
  const { theme } = useThemeStore();

  const columns = useMemo(
    () => [
      {
        Header: t('translation:tables.titles.event'),
        accessor: ({ type }: RowProps) => (
          <TypeDetailsCell
            name={type}
            type={type}
            tableType="nftActivity"
          />
        ),
      },
      {
        Header: t('translation:tables.titles.price'),
        accessor: ({ price }: RowProps) => (
          <PriceDetailsCell
            wicp="5.12 WICP"
            price={price}
            tableType="nftActivity"
          />
        ),
      },
      {
        Header: t('translation:tables.titles.from'),
        accessor: ({ from }: RowProps) => (
          <TextLinkCell text={from} url="" type="nftActivity" />
        ),
      },
      {
        Header: t('translation:tables.titles.to'),
        accessor: ({ to }: RowProps) => (
          <TextLinkCell text={to} url="" type="nftActivity" />
        ),
      },
      {
        Header: t('translation:tables.titles.date'),
        accessor: ({ expiration }: RowProps) => (
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
        loaderDetails={{
          showItemDetails: true,
          showTypeDetails: true,
        }}
      />
    </Container>
  );
};
