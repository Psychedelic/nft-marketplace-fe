import React, { useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '../../store';
import {
  ItemDetailsCell,
  PriceDetailsCell,
  TextCell,
  TextLinkCell,
} from '../core';
import { AcceptOfferModal } from '../modals';
import { TableLayout } from './table-layout';
import { mockTableData } from './mock-data';
import {
  Container,
  InfiniteScrollWrapper,
  ButtonWrapper,
} from './styles';
import TableSkeletons from './table-skeletons';

/* --------------------------------------------------------------------------
 * Offers Received Table Component
 * --------------------------------------------------------------------------*/

export interface rowProps {
  item: {
    name: string;
    logo: string;
    token_id: string;
  };
  price: string;
  floorDifference: string;
  from: string;
  time: string;
  callerDfinityExplorerUrl: string;
}

export const OffersReceivedTable = () => {
  const { t } = useTranslation();
  const { theme } = useThemeStore();

  // TODO: Update mockedetails configured below
  // with original details while doing integration
  const loadedOffersReceivedData = mockTableData;
  const hasMoreData = false;
  const loadingTableData = false;
  const nextPageNo = 0;

  useEffect(() => {
    // TODO: Add logic to fetch table data
  }, []);

  const loadMoreData = () => {
    if (loadingTableData || !hasMoreData) return;

    // TODO: Add logic to load more data
  };

  const columns = useMemo(
    () => [
      {
        Header: t('translation:tables.titles.item'),
        // eslint-disable-next-line
        accessor: ({ item }: rowProps) => (
          <ItemDetailsCell
            name={item.name}
            id={item.token_id}
            logo={item.logo}
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
        Header: t('translation:tables.titles.floorDifference'),
        accessor: ({ floorDifference }: rowProps) => (
          <TextCell text={floorDifference} type="offers" />
        ),
      },
      {
        Header: t('translation:tables.titles.from'),
        accessor: ({ from, callerDfinityExplorerUrl }: rowProps) => (
          <TextLinkCell
            text={from}
            url={callerDfinityExplorerUrl}
            type=""
          />
        ),
      },
      {
        Header: t('translation:tables.titles.time'),
        accessor: ({ time }: rowProps) => (
          <TextCell text={time} type="activityTime" />
        ),
      },
      {
        id: 'action',
        Header: t('translation:tables.titles.action'),
        // TODO: Update formatted price and offerFrom with dynamic fields
        accessor: ({ price, from }: rowProps) => (
          <ButtonWrapper>
            <AcceptOfferModal
              price={price}
              formattedPrice={price}
              offerFrom={from}
            />
          </ButtonWrapper>
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
          data={loadedOffersReceivedData}
          tableType="activity"
        />
      </Container>
    </InfiniteScrollWrapper>
  );
};
