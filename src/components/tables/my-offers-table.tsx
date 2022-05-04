import { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch, usePlugStore, RootState } from '../../store';
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
  EmptyStateMessage,
} from './styles';
import TableSkeletons from './table-skeletons';
import {
  OfferTypeStatusCodes,
  OffersTableHeaders,
} from '../../constants/my-offers';
import {
  getTokenOffers,
  getBuyerOffers,
} from '../../store/features/marketplace';
import { getOwnerTokenIdentifiers } from '../../store/features/crowns';
import { OffersTableItem } from '../../declarations/legacy';
import { formatPriceValue } from '../../utils/formatters';

/* --------------------------------------------------------------------------
 * My Offers Table Component
 * --------------------------------------------------------------------------*/

export type MyOffersTableProps = {
  offersType?: string; // offers received / offers made
};

export type TableDetails = {
  loading: boolean;
  loadedOffers: Array<any>;
};

// TODO: See parser.ts and refactor to use common type
// the current is all string which is not correct

export const MyOffersTable = ({ offersType }: MyOffersTableProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isConnected } = usePlugStore();
  const [columnsToHide, setColumnsToHide] = useState<Array<string>>(
    [],
  );
  const [tableDetails, setTableDetails] = useState<TableDetails>({
    loadedOffers: [],
    loading: true,
  });

  const ownerTokenIdentifiers = useSelector(
    (state: RootState) => state.crowns.ownerTokenIdentifiers,
  );
  const recentlyAcceptedOffers = useSelector(
    (state: RootState) => state.marketplace.recentlyAcceptedOffers,
  );

  const { id: plugPrincipal } = useParams();

  useEffect(() => {
    setTableDetails({
      loading: true,
      loadedOffers: [],
    });
  }, [offersType]);

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
        getBuyerOffers({
          userPrincipalId: plugPrincipal,
          onSuccess: (offers) => {
            setTableDetails({
              loading: false,
              loadedOffers: offers,
            });
          },
          onFailure: () => {
            // TODO: handle failure messages
          },
        }),
      );
      return;
    }

    dispatch(
      getOwnerTokenIdentifiers({
        plugPrincipal,
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, offersType, isConnected]);

  useEffect(() => {
    if (!ownerTokenIdentifiers) return;

    dispatch(
      getTokenOffers({
        // TODO: handle offers data gracefully
        ownerTokenIdentifiers,
        onSuccess: (offers) => {
          setTableDetails({
            loading: false,
            loadedOffers: offers,
          });
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
    [t, columnsToHide], // eslint-disable-line react-hooks/exhaustive-deps
  );

  const { loading, loadedOffers } = tableDetails;

  return (
    <>
      {(loading || (!loading && loadedOffers.length > 0)) && (
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
              data={loadedOffers}
              tableType="activity"
              columnsToHide={columnsToHide}
              loading={loading}
            />
          </Container>
        </InfiniteScrollWrapper>
      )}
      {!loading && loadedOffers.length === 0 && (
        <EmptyStateMessage>
          {(offersType === OfferTypeStatusCodes.OffersReceived &&
            t('translation:emptyStates.noOffersYet')) ||
            (offersType === OfferTypeStatusCodes.OffersMade &&
              t('translation:emptyStates.noOffersMade'))}
        </EmptyStateMessage>
      )}
    </>
  );
};
