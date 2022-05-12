import React, { useMemo, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  useThemeStore,
  useAppDispatch,
  useTableStore,
  tableActions,
  capActions,
  RootState,
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
import { parseE8SAmountToWICP } from '../../utils/formatters';
import config from '../../config/env';

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
  const bucketId = useSelector(
    (state: RootState) => state.cap.bucketId,
  );

  useEffect(() => {
    dispatch(
      capActions.getTokenContractRootBucket({
        marketplaceCanisterId: config?.marketplaceCanisterId,
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    if (!bucketId) return;

    dispatch(tableActions.getCAPActivity({ pageCount: 0, bucketId }));
  }, [dispatch, bucketId]);

  const loadMoreData = useCallback(() => {
    if (loadingTableData || !hasMoreData || !bucketId) return;
    dispatch(
      tableActions.getCAPActivity({
        pageCount: nextPageNo,
        bucketId,
      }),
    );
  }, [dispatch, loadingTableData, hasMoreData, nextPageNo, bucketId]);

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
          <TypeDetailsCell name={type} type={type} tableType="" />
        ),
      },
      {
        Header: t('translation:tables.titles.price'),
        accessor: ({ price }: RowProps) => (
          <PriceDetailsCell
            wicp={parseE8SAmountToWICP(BigInt(price))}
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
      loader={
        <TableSkeletons
          loaderDetails={{
            showItemDetails: true,
            showTypeDetails: true,
          }}
        />
      }
      useWindow={true || false}
      threshold={250 * 5}
      className="infinite-loader"
    >
      <Container>
        <TableLayout
          columns={columns}
          data={loadedCapActivityData}
          tableType="activity"
          loaderDetails={{
            showItemDetails: true,
            showTypeDetails: true,
          }}
        />
      </Container>
    </InfiniteScrollWrapper>
  );
};
