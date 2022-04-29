import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useThemeStore, useAppDispatch, usePlugStore, RootState } from '../../store';
import {
  ItemDetailsCell,
  PriceDetailsCell,
  TextCell,
  TextLinkCell,
} from '../core';
import { AcceptOfferModal, CancelOfferModal } from '../modals';
import { TableLayout } from './table-layout';
import {
  Container,
  InfiniteScrollWrapper,
  ButtonWrapper,
} from './styles';
import TableSkeletons from './table-skeletons';
import {
  OFFER_TYPE_STATUS_CODES,
  OFFERS_TABLE_HEADERS,
} from '../../constants/my-offers';
import { getTokenOffers } from '../../store/features/marketplace';
import { getOwnerTokenIdentifiers } from '../../store/features/crowns';

/* --------------------------------------------------------------------------
 * My Offers Table Component
 * --------------------------------------------------------------------------*/

export type MyOffersTableProps = {
  offersType?: string; // offers received / offers made
};

// TODO: See parser.ts and refactor to use common type
// the current is all string which is not correct
export interface rowProps {
  item: {
    name: string;
    logo: string;
    tokenId: bigint;
  };
  price: bigint;
  floorDifference: string;
  from: string;
  time: string;
  callerDfinityExplorerUrl: string;
  computedCurrencyPrice: number | undefined;
}

export const MyOffersTable = ({ offersType }: MyOffersTableProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { theme } = useThemeStore();
  const { isConnected } = usePlugStore();
  const [columnsToHide, setColumnsToHide] = useState<Array<string>>(
    [],
  );
  const [loadingTableData, setLoadingTableData] = useState<boolean>(true);
  // TODO: update loadedOffers state array record type
  const [loadedOffersReceivedData, setLoadedOffersReceivedData] = useState<any>([]);
  const ownerTokenIdentifiers = useSelector(
    (state: RootState) => state.crowns.ownerTokenIdentifiers,
  );

  const { id: plugPrincipal } = useParams();

  useEffect(() => {
    // hide offersMadeAction if offersType = OffersReceived
    if (
      offersType === OFFER_TYPE_STATUS_CODES.OffersReceived
      && !columnsToHide.includes(OFFERS_TABLE_HEADERS.OffersMadeAction)
    ) {
      const newColumns = columnsToHide.filter(
        (header) => header !== OFFERS_TABLE_HEADERS.OffersReceivedAction,
      );
      setColumnsToHide([
        ...newColumns,
        OFFERS_TABLE_HEADERS.OffersMadeAction,
      ]);

      return;
    }

    // hide offersReceivedAction if offersType = OffersMade
    if (
      offersType === OFFER_TYPE_STATUS_CODES.OffersMade
      && !columnsToHide.includes(
        OFFERS_TABLE_HEADERS.OffersReceivedAction,
      )
    ) {
      const newColumns = columnsToHide.filter(
        (header) => header !== OFFERS_TABLE_HEADERS.OffersMadeAction,
      );
      setColumnsToHide([
        ...newColumns,
        OFFERS_TABLE_HEADERS.OffersReceivedAction,
      ]);
    }
  }, [offersType]);

  // TODO: Update mockedetails configured below
  // with original details while doing integration
  const hasMoreData = false;
  const nextPageNo = 0;

  useEffect(() => {
    if (!isConnected || !plugPrincipal) return;

    dispatch(
      getOwnerTokenIdentifiers({
        plugPrincipal,
      }),
    );
  }, [dispatch, offersType, isConnected]);

  useEffect(() => {
    if (!ownerTokenIdentifiers) return;

    // TODO: Add logic to fetch table data
    // TODO: Update loadedOffersReceivedData when there is
    // a change in offersType
    dispatch(
      getTokenOffers({
        // TODO: handle offers data gracefully
        ownerTokenIdentifiers,
        onSuccess: (offers) => {
          // TODO: handle success messages
          setLoadingTableData(false);
          setLoadedOffersReceivedData(offers);
        },
        onFailure: () => {
          // TODO: handle failure messages
        },
      }),
    );
  }, [ownerTokenIdentifiers, dispatch]);

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
            id={item.tokenId.toString()}
            logo={item.logo}
          />
        ),
      },
      {
        Header: t('translation:tables.titles.price'),
        accessor: ({ price, computedCurrencyPrice }: rowProps) => (
          <PriceDetailsCell
            wicp={price.toString()}
            price={computedCurrencyPrice && `$${computedCurrencyPrice.toString()}` || ''}
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
        id: OFFERS_TABLE_HEADERS.OffersReceivedAction,
        Header: t('translation:tables.titles.action'),
        // TODO: Update formatted price and offerFrom with dynamic fields
        accessor: ({ price, from, item, computedCurrencyPrice }: rowProps) => (
          <ButtonWrapper>
            <AcceptOfferModal
              price={price.toString()}
              formattedPrice={computedCurrencyPrice && computedCurrencyPrice.toString() || ''}
              offerFrom={from}
              nftTokenId={item.tokenId.toString()}
            />
          </ButtonWrapper>
        ),
      },
      {
        id: OFFERS_TABLE_HEADERS.OffersMadeAction,
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
          loading={loadingTableData}
        />
      </Container>
    </InfiniteScrollWrapper>
  );
};
