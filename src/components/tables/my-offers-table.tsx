import { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  useThemeStore,
  useAppDispatch,
  usePlugStore,
  RootState,
  marketplaceActions,
  crownsActions,
} from '../../store';
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
  OfferTypeStatusCodes,
  OffersTableHeaders,
} from '../../constants/my-offers';
import { OffersTableItem } from '../../declarations/legacy';
import { formatPriceValue } from '../../utils/formatters';

/* --------------------------------------------------------------------------
 * My Offers Table Component
 * --------------------------------------------------------------------------*/

export type MyOffersTableProps = {
  offersType?: string; // offers received / offers made
};

// TODO: See parser.ts and refactor to use common type
// the current is all string which is not correct

export const MyOffersTable = ({ offersType }: MyOffersTableProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { theme } = useThemeStore();
  const { isConnected } = usePlugStore();
  const [columnsToHide, setColumnsToHide] = useState<Array<string>>(
    [],
  );
  const [loadingTableData, setLoadingTableData] =
    useState<boolean>(true);
  // TODO: update loadedOffers state array record type
  const [loadedOffersReceivedData, setLoadedOffersReceivedData] =
    useState<any>([]);
  const ownerTokenIdentifiers = useSelector(
    (state: RootState) => state.crowns.ownerTokenIdentifiers,
  );
  const recentlyAcceptedOffers = useSelector(
    (state: RootState) => state.marketplace.recentlyAcceptedOffers,
  );

  const { id: plugPrincipal } = useParams();

  useEffect(() => {
    // hide offersMadeAction if offersType = OffersReceived
    if (
      offersType === OfferTypeStatusCodes.OffersReceived &&
      !columnsToHide.includes(OffersTableHeaders.OffersMadeAction)
    ) {
      const newColumns = columnsToHide.filter(
        (header) =>
          header !== OffersTableHeaders.OffersReceivedAction,
      );
      setColumnsToHide([
        ...newColumns,
        OffersTableHeaders.OffersMadeAction,
      ]);

      return;
    }

    // hide offersReceivedAction if offersType = OffersMade
    if (
      offersType === OfferTypeStatusCodes.OffersMade &&
      !columnsToHide.includes(OffersTableHeaders.OffersReceivedAction)
    ) {
      const newColumns = columnsToHide.filter(
        (header) => header !== OffersTableHeaders.OffersMadeAction,
      );
      setColumnsToHide([
        ...newColumns,
        OffersTableHeaders.OffersReceivedAction,
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offersType]);

  // TODO: Update mockedetails configured below
  // with original details while doing integration
  const hasMoreData = false;
  const nextPageNo = 0;

  useEffect(() => {
    if (!isConnected || !plugPrincipal) return;

    if (offersType === OfferTypeStatusCodes.OffersMade) {
      dispatch(
        marketplaceActions.getBuyerOffers({
          userPrincipalId: plugPrincipal,
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
      return;
    }

    dispatch(
      crownsActions.getOwnerTokenIdentifiers({
        plugPrincipal,
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, offersType, isConnected]);

  useEffect(() => {
    if (!ownerTokenIdentifiers) return;

    // TODO: Add logic to fetch table data
    // TODO: Update loadedOffersReceivedData when there is
    // a change in offersType
    dispatch(
      marketplaceActions.getTokenOffers({
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
  }, [ownerTokenIdentifiers, dispatch, recentlyAcceptedOffers]);

  const loadMoreData = () => {
    // TODO: Add logic to load more data
  };

  const columns = useMemo(
    () => [
      {
        Header: t('translation:tables.titles.item'),
        // eslint-disable-next-line
        accessor: ({ item }: OffersTableItem) => (
          <ItemDetailsCell
            name={item.name}
            id={item.tokenId.toString()}
            logo={item.logo}
          />
        ),
      },
      {
        Header: t('translation:tables.titles.price'),
        accessor: ({
          price,
          computedCurrencyPrice,
        }: OffersTableItem) => (
          <PriceDetailsCell
            wicp={price.toString()}
            price={
              (computedCurrencyPrice &&
                `$${formatPriceValue(
                  computedCurrencyPrice.toString(),
                )}`) ||
              ''
            }
            tableType=""
          />
        ),
      },
      {
        Header: t('translation:tables.titles.floorDifference'),
        accessor: ({ floorDifference }: OffersTableItem) => (
          <TextCell text={floorDifference} type="offers" />
        ),
      },
      {
        Header: t('translation:tables.titles.from'),
        accessor: ({
          fromDetails,
          callerDfinityExplorerUrl,
        }: OffersTableItem) => (
          <TextLinkCell
            text={fromDetails.formattedAddress}
            url={callerDfinityExplorerUrl}
            type=""
          />
        ),
      },
      {
        Header: t('translation:tables.titles.time'),
        accessor: ({ time }: OffersTableItem) => (
          <TextCell text={time} type="activityTime" />
        ),
      },
      {
        id: OffersTableHeaders.OffersReceivedAction,
        Header: t('translation:tables.titles.action'),
        // TODO: Update formatted price and offerFrom with dynamic fields
        accessor: ({
          price,
          fromDetails,
          item,
          computedCurrencyPrice,
        }: OffersTableItem) => (
          <ButtonWrapper>
            <AcceptOfferModal
              price={price.toString()}
              formattedPrice={
                (computedCurrencyPrice &&
                  computedCurrencyPrice.toString()) ||
                ''
              }
              offerFrom={fromDetails.address}
              nftTokenId={item.tokenId.toString()}
            />
          </ButtonWrapper>
        ),
      },
      {
        id: OffersTableHeaders.OffersMadeAction,
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
