import React, { useMemo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useThemeStore,
  useAppDispatch,
  useTableStore,
} from '../../store';
import {
  ItemDetailsCell,
  TypeDetailsCell,
  PriceDetailsCell,
  TextCell,
  TextLinkCell,
} from '../core';
import { TableLayout } from './table-layout';
import { Container } from './styles';
import crownsLogo from '../../assets/crowns-logo.svg';
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
        data={loadedCapActivityTableData.map((tableData) => {
          console.log('.');
          return {
            item: {
              name: `CAP Crowns #${tableData.token_id}`,
              logo: crownsLogo,
            },
            type: tableData.operation,
            price: `$${tableData.list_price ?? tableData.price}`,
            from: 'rgblt...whfy',
            to: 'rgblt...whfy',
            time: tableData.time,
            floorDifference: '12.42% above',
            expiration: '2 days ago',
            offerFrom: 'Prasanth',
          };
        })}
        tableType="activity"
      />
    </Container>
  );
};
