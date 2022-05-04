import React, { useMemo, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useThemeStore,
  useAppDispatch,
  useTableStore,
  tableActions,
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
import { NFTMetadata } from '../../declarations/legacy';
import TableSkeletons from './table-skeletons';

interface RowProps {
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
  data: NFTMetadata;
  callerDfinityExplorerUrl: string;
}

export const ActivityTable = () => {
  const { t } = useTranslation();
  const { theme } = useThemeStore();
  const {
    loadedCapActivityData,
    hasMoreData,
    loadingTableData,
    nextPageNo,
  } = useTableStore();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(tableActions.getCAPActivity({ pageCount: 0 }));
  }, [dispatch]);

  const loadMoreData = useCallback(() => {
    if (loadingTableData || !hasMoreData) return;
    dispatch(
      tableActions.getCAPActivity({
        pageCount: nextPageNo,
      }),
    );
  }, [dispatch, loadingTableData, hasMoreData, nextPageNo]);

  const columns = useMemo(
    () => [
      {
        Header: t('translation:tables.titles.item'),
        // eslint-disable-next-line
        accessor: ({ item }: RowProps) => (
          <ItemDetailsCell
            name={item.name}
            id={item.token_id}
            logo={item.logo}
          />
        ),
      },
      {
        Header: t('translation:tables.titles.type'),
        accessor: ({ type }: RowProps) => (
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
        accessor: ({ price }: RowProps) => (
          <PriceDetailsCell
            wicp={price}
            tableType=""
          />
        ),
      },
      {
        Header: t('translation:tables.titles.from'),
        accessor: ({ from, callerDfinityExplorerUrl }: RowProps) => (
          <TextLinkCell
            text={from}
            url={callerDfinityExplorerUrl}
            type=""
          />
        ),
      },
      {
        Header: t('translation:tables.titles.to'),
        accessor: ({ to }: RowProps) => (
          <TextLinkCell text={to} type="" />
        ),
      },
      {
        Header: t('translation:tables.titles.time'),
        accessor: ({ time }: RowProps) => (
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
      loader={<TableSkeletons />}
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
