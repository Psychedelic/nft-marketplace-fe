import React, { useMemo, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Principal } from '@dfinity/principal';
import { v4 as uuid } from 'uuid';
import {
  useThemeStore,
  useAppDispatch,
  useTableStore,
  tableActions,
  capActions,
  RootState,
  useCapStore,
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
import {
  parseE8SAmountToWICP,
  formatAddress,
} from '../../utils/formatters';
import { getICAccountLink } from '../../utils/account-id';
import config from '../../config/env';
import { OperationType } from '../../constants';
import useMediaQuery from '../../hooks/use-media-query';
import MobileItemDetails from '../core/table-cells/mobile-item-details';

interface RowProps {
  item: {
    name: string;
    logo: string;
    token_id: string;
  };
  type: OperationType;
  price: string;
  quantity: string;
  seller: Principal;
  buyer?: Principal;
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
  const { loading: capLoading } = useCapStore();
  const dispatch = useAppDispatch();
  const bucketId = useSelector(
    (state: RootState) => state.cap.bucketId,
  );
  const tableSkeletonId = uuid();
  const isMobileScreen = useMediaQuery('(max-width: 640px');

  useEffect(() => {
    dispatch(
      capActions.getTokenContractRootBucket({
        marketplaceCanisterId: config?.marketplaceCanisterId,
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    if (!bucketId) return;

    dispatch(
      tableActions.getCAPActivity({ pageCount: 'last', bucketId }),
    );
  }, [dispatch, bucketId]);

  const loadMoreData = useCallback(() => {
    if (loadingTableData || !hasMoreData || !bucketId) return;
    dispatch(
      tableActions.getCAPActivity({
        pageCount: nextPageNo.toString(),
        bucketId,
      }),
    );
  }, [dispatch, loadingTableData, hasMoreData, nextPageNo, bucketId]);

  const isTableLoading = useMemo(
    () => capLoading || loadingTableData,
    [loadingTableData, capLoading],
  );

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
          <TypeDetailsCell type={type} tableType="" />
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
        Header: t('translation:tables.titles.seller'),
        accessor: ({ seller }: RowProps) => {
          const principalText = seller.toText();
          const short = formatAddress(principalText);
          const url = getICAccountLink(principalText);

          return <TextLinkCell text={short} url={url} type="" />;
        },
      },
      {
        Header: t('translation:tables.titles.buyer'),
        accessor: ({ buyer }: RowProps) => {
          if (!buyer) {
            return <TextLinkCell text="-" type="" />;
          }

          const principalText = buyer.toText();
          const short = formatAddress(principalText);
          const url = getICAccountLink(principalText);

          return <TextLinkCell text={short} url={url} type="" />;
        },
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

  const mobileColumns = useMemo(
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
        accessor: ({ type, price, time }: RowProps) => (
          <MobileItemDetails
            type={type}
            price={parseE8SAmountToWICP(BigInt(price))}
            time={time}
            tableType="activity"
          />
        ),
      },
    ],
    [t, theme], // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <InfiniteScrollWrapper
      pageStart={0}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      loadMore={nextPageNo >= 0 ? loadMoreData : () => {}}
      hasMore={hasMoreData}
      loader={
        <TableSkeletons
          loaderDetails={{
            showItemDetails: true,
            showTypeDetails: true,
            type: 'large',
            infiniteLoader: true,
            isMobileScreen,
          }}
          key={tableSkeletonId}
        />
      }
      useWindow={true || false}
      threshold={250 * 5}
      className="infinite-loader"
    >
      <Container>
        <TableLayout
          columns={isMobileScreen ? mobileColumns : columns}
          data={loadedCapActivityData}
          tableType="activity"
          loading={isTableLoading}
          loaderDetails={{
            showItemDetails: true,
            showTypeDetails: true,
            isMobileScreen,
          }}
        />
      </Container>
    </InfiniteScrollWrapper>
  );
};
