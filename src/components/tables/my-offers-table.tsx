import React, { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '../../store';
import {
  ItemDetailsCell,
  PriceDetailsCell,
  TextCell,
  TextLinkCell,
} from '../core';
import { AcceptOfferModal, CancelOfferModal } from '../modals';
import { TableLayout } from './table-layout';
import { mockTableData } from './mock-data';
import {
  Container,
  InfiniteScrollWrapper,
  ButtonWrapper,
} from './styles';
import TableSkeletons from './table-skeletons';
import { OFFER_TYPE_STATUS_CODES } from '../../constants/my-offers';

/* --------------------------------------------------------------------------
 * My Offers Table Component
 * --------------------------------------------------------------------------*/

export type MyOffersTableProps = {
  offersType?: string; // offers received / offers made
};
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

export const MyOffersTable = ({ offersType }: MyOffersTableProps) => {
  const { t } = useTranslation();
  const { theme } = useThemeStore();
  const [columnsToHide, setColumnsToHide] = useState<Array<string>>(
    [],
  );

  useEffect(() => {
    // hide offersMadeAction if offersType = OffersReceived
    if (
      offersType === OFFER_TYPE_STATUS_CODES.OffersReceived &&
      !columnsToHide.includes('offersMadeAction')
    ) {
      const newColumns = columnsToHide.filter(
        (header) => header !== 'offersReceivedAction',
      );
      setColumnsToHide([...newColumns, 'offersMadeAction']);

      return;
    }

    // hide offersReceivedAction if offersType = OffersMade
    if (
      offersType === OFFER_TYPE_STATUS_CODES.OffersMade &&
      !columnsToHide.includes('offersReceivedAction')
    ) {
      const newColumns = columnsToHide.filter(
        (header) => header !== 'offersMadeAction',
      );
      setColumnsToHide([...newColumns, 'offersReceivedAction']);

      return;
    }
  }, [offersType]);

  // TODO: Update mockedetails configured below
  // with original details while doing integration
  const loadedOffersReceivedData = mockTableData;
  const hasMoreData = false;
  const loadingTableData = false;
  const nextPageNo = 0;

  useEffect(() => {
    // TODO: Add logic to fetch table data
    // TODO: Update loadedOffersReceivedData when there is
    // a change in offersType
  }, [offersType]);

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
        id: 'offersReceivedAction',
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
      {
        id: 'offersMadeAction',
        Header: t('translation:tables.titles.action'),
        // TODO: Update cancel offer modal
        accessor: () => (
          <ButtonWrapper>
            <CancelOfferModal />
          </ButtonWrapper>
        ),
      },
    ],
    [t, theme, columnsToHide], // eslint-disable-line react-hooks/exhaustive-deps
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
          columnsToHide={columnsToHide}
        />
      </Container>
    </InfiniteScrollWrapper>
  );
};
