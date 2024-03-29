import React, { useMemo, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
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
  marketplaceActions,
} from '../../store';
import {
  ItemDetailsCell,
  TypeDetailsCell,
  PriceDetailsCell,
  TextCell,
  TextLinkCell,
} from '../core';
import { TableLayout } from './table-layout';
import {
  Container,
  EmptyStateMessage,
  InfiniteScrollWrapper,
} from './styles';
import { NFTMetadata } from '../../declarations/legacy';
import TableSkeletons from './table-skeletons';
import {
  parseE8SAmountToWICP,
  formatAddress,
} from '../../utils/formatters';
import { getICAccountLink } from '../../utils/account-id';
import { OperationType } from '../../constants';
import MobileItemDetails from '../core/table-cells/mobile-item-details';
import useMediaQuery from '../../hooks/use-media-query';

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

export const UserActivityTable = () => {
  const { t } = useTranslation();
  const { theme } = useThemeStore();
  const {
    loadedUserActivityData,
    hasMoreUserActivities,
    loadingUserTableData,
    nextUserActivityPageNo,
  } = useTableStore();
  const dispatch = useAppDispatch();
  const bucketId = useSelector(
    (state: RootState) => state.cap.bucketId,
  );
  const tableSkeletonId = uuid();

  const { id: plugPrincipal, collectionId } = useParams();

  const isMobileScreen = useMediaQuery('(max-width: 640px)');

  const collectionDetails = useSelector(
    (state: RootState) => state.marketplace.currentCollectionDetails,
  );

  useEffect(() => {
    if (!collectionId) {
      console.warn(
        "Oops! Missing collection id, won't be able to get cap transactions",
      );

      return;
    }

    dispatch(
      marketplaceActions.getCollectionDetails({ collectionId }),
    );

    dispatch(
      capActions.getTokenContractRootBucket({
        collectionId,
      }),
    );
  }, [collectionId, dispatch]);

  useEffect(() => {
    if (!bucketId || !plugPrincipal) return;

    dispatch(
      tableActions.getUserActivity({
        pageCount: 0,
        bucketId,
        plugPrincipal,
        collectionName: collectionDetails?.collectionName || '',
      }),
    );
  }, [dispatch, bucketId, plugPrincipal]);

  const loadMoreData = useCallback(() => {
    if (
      loadingUserTableData ||
      !hasMoreUserActivities ||
      !bucketId ||
      !plugPrincipal
    )
      return;
    dispatch(
      tableActions.getUserActivity({
        pageCount: nextUserActivityPageNo,
        bucketId,
        plugPrincipal,
        collectionName: collectionDetails?.collectionName || '',
      }),
    );
  }, [
    dispatch,
    loadingUserTableData,
    hasMoreUserActivities,
    nextUserActivityPageNo,
    bucketId,
    plugPrincipal,
  ]);

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

          return (
            <TextLinkCell
              text={short}
              url={url}
              type=""
              principalId={principalText}
            />
          );
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

          return (
            <TextLinkCell
              text={short}
              url={url}
              type=""
              principalId={principalText}
            />
          );
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
        Header: t('translation:tables.titles.type'),
        accessor: ({ type, price, time, item }: RowProps) => (
          <MobileItemDetails
            type={type}
            price={price}
            time={time}
            item={item}
          />
        ),
      },
      {
        Header: t('translation:tables.titles.seller'),
        accessor: ({ seller }: RowProps) => {
          const principalText = seller.toText();
          const short = formatAddress(principalText);
          const url = getICAccountLink(principalText);

          return (
            <TextLinkCell
              text={short}
              url={url}
              type=""
              principalId={principalText}
            />
          );
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

          return (
            <TextLinkCell
              text={short}
              url={url}
              type=""
              principalId={principalText}
            />
          );
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

  return (
    <InfiniteScrollWrapper
      pageStart={0}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      loadMore={nextUserActivityPageNo >= 0 ? loadMoreData : () => {}}
      hasMore={hasMoreUserActivities}
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
          data={loadedUserActivityData}
          tableType="activity"
          loading={loadingUserTableData}
          loaderDetails={{
            showItemDetails: true,
            showTypeDetails: true,
            isMobileScreen,
          }}
          emptyMessage={t('translation:emptyStates.nftActivity')}
        />
      </Container>
    </InfiniteScrollWrapper>
  );
};
