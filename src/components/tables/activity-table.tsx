import React, { useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useThemeStore, useAppDispatch, useTableStore } from '../../store';
import {
  ItemDetailsCell,
  TypeDetailsCell,
  PriceDetailsCell,
  TextCell,
  TextLinkCell,
} from '../core';
import { TableLayout } from './table-layout';
import { mockTableData } from './mock-data';
import { Container } from './styles';
import { fetchCAPActivity } from '../../integrations/kyasshu/utils';

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
  const { theme } = useThemeStore();
  const { loadedCapActivityTableData } = useTableStore();
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchCAPActivity({
      dispatch,
    });
  }, []);

  console.log(loadedCapActivityTableData);

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
          <TypeDetailsCell
            name={type}
            type={type}
            tableType=""
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
            tableType=""
          />
        ),
      },
      {
        Header: t('translation:tables.titles.quantity'),
        accessor: ({ quantity }: rowProps) => (
          <TextCell text={quantity} type="" />
        ),
      },
      {
        Header: t('translation:tables.titles.from'),
        accessor: ({ from }: rowProps) => (
          <TextLinkCell text={from} url="" type="" />
        ),
      },
      {
        Header: t('translation:tables.titles.to'),
        accessor: ({ to }: rowProps) => (
          <TextLinkCell text={to} url="" type="" />
        ),
      },
      {
        Header: t('translation:tables.titles.time'),
        accessor: ({ time }: rowProps) => (
          <TextCell text={time} type="activityTime" />
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
        tableType="activity"
      />
    </Container>
  );
};
