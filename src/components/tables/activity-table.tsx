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
import { Container, InfiniteScrollWrapper } from './styles';
import { fetchCAPActivity } from '../../integrations/kyasshu/utils';
import { NFTMetadata } from '../../declarations/nft';

export interface rowProps {
  item: {
    name: string;
    logo: string;
    token_id: string;
  };
  type: string;
  price: string;
  quantity: string;
  from: string;
  to: string;
  time: string;
  data: NFTMetadata
}

export const ActivityTable = () => {
  const { t } = useTranslation();
  const { theme } = useThemeStore();
  const { loadedCapActivityData, hasMoreData, loadingTableData, nextPageNo } = useTableStore();
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchCAPActivity({
      dispatch,
      pageCount: 0,
    });
  }, []);

  const loadMoreData = () => {
    if (loadingTableData || !hasMoreData) return;

    fetchCAPActivity({
      dispatch,
      pageCount: nextPageNo,
    });
  };

  const columns = useMemo(
    () => [
      {
        Header: t('translation:tables.titles.item'),
        // eslint-disable-next-line
        accessor: ({ item }: rowProps) => (
          <ItemDetailsCell name={item.name} id={item.token_id} logo={item.logo} />
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
            wicp="undefined"
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
    <InfiniteScrollWrapper
      pageStart={0}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      loadMore={nextPageNo > 0 ? loadMoreData : () => {}}
      hasMore={hasMoreData}
      // to-do: add loader for table
      loader="Loading"
      useWindow={true || false}
      threshold={250 * 5}
      className="infinite-loader"
    >
      <Container>
        <TableLayout
          columns={columns}
          data={loadedCapActivityData}
          tableType="activity"
        />
      </Container>
    </InfiniteScrollWrapper>
  );
};
