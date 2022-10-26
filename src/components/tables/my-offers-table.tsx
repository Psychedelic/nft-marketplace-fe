import { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  useAppDispatch,
  usePlugStore,
  RootState,
  marketplaceActions,
  crownsActions,
  nftsActions,
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
  EmptyStateMessage,
} from './styles';
import TableSkeletons from './table-skeletons';
import {
  OfferTypeStatusCodes,
  OffersTableHeaders,
} from '../../constants/my-offers';
import { OffersTableItem } from '../../declarations/legacy';
import {
  formatPriceValue,
  parseE8SAmountToWICP,
} from '../../utils/formatters';
import { verifyConnectedOwner } from '../../integrations/kyasshu/utils';
import { formatTimestamp } from '../../integrations/functions/date';
import { getICAccountLink } from '../../utils/account-id';
import useMediaQuery from '../../hooks/use-media-query';

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
  const { isConnected, principalId: connectedPlugUser } =
    usePlugStore();
  const [columnsToHide, setColumnsToHide] = useState<Array<string>>(
    [],
  );
  const [tableDetails, setTableDetails] = useState<TableDetails>({
    loadedOffers: [],
    loading: false,
  });

  const recentlyAcceptedOffers = useSelector(
    (state: RootState) => state.marketplace.recentlyAcceptedOffers,
  );

  const recentlyCancelledOffers = useSelector(
    (state: RootState) => state.marketplace.recentlyCancelledOffers,
  );

  const collectionDetails = useSelector(
    (state: RootState) => state.marketplace.currentCollectionDetails,
  );

  const { id: plugPrincipal, collectionId } = useParams();

  const isConnectedOwner = verifyConnectedOwner({
    isConnected,
    owner: connectedPlugUser,
    principalId: plugPrincipal,
  });

  useEffect(() => {
    if (!collectionId) {
      console.warn('Oops! Missing collection id');

      return;
    }

    dispatch(
      marketplaceActions.getCollectionDetails({ collectionId }),
    );

    dispatch(marketplaceActions.getProtocolFee({ collectionId }));
  }, [collectionId, dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);

    setTableDetails({
      loading: true,
      loadedOffers: [],
    });
  }, [offersType]);

  useEffect(() => {
    // hide offersReceivedAction & offersMadeAction
    // when user not connected to plug
    if (!isConnectedOwner) {
      if (
        !columnsToHide.includes(
          OffersTableHeaders.OffersReceivedAction,
        )
      ) {
        setColumnsToHide((oldColumns) => [
          ...oldColumns,
          OffersTableHeaders.OffersReceivedAction,
          OffersTableHeaders.OffersMadeAction,
        ]);
      }

      return;
    }

    // hide offersMadeAction if offersType = OffersReceived
    if (offersType === OfferTypeStatusCodes.OffersReceived) {
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
    if (offersType === OfferTypeStatusCodes.OffersMade) {
      const newColumns = columnsToHide.filter(
        (header) => header !== OffersTableHeaders.OffersMadeAction,
      );
      setColumnsToHide([
        ...newColumns,
        OffersTableHeaders.OffersReceivedAction,
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offersType, isConnectedOwner]);

  // TODO: Update mockedetails configured below
  // with original details while doing integration
  const hasMoreData = false;
  const nextPageNo = 0;

  useEffect(() => {
    if (!plugPrincipal || !collectionId) return;

    if (offersType === OfferTypeStatusCodes.OffersMade) {
      setTableDetails({
        loading: true,
        loadedOffers: [],
      });

      dispatch(
        marketplaceActions.getBuyerOffers({
          userPrincipalId: plugPrincipal,
          collectionId,
          collectionName: collectionDetails?.collectionName || '',
          onSuccess: (offers: any) => {
            if (offersType === OfferTypeStatusCodes.OffersMade) {
              setTableDetails({
                loading: false,
                loadedOffers: offers,
              });
            }
          },
          onFailure: () => {
            // TODO: handle failure messages
          },
        }),
      );
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, offersType, isConnected, recentlyCancelledOffers]);

  useEffect(() => {
    if (!collectionId) return;

    if (offersType === OfferTypeStatusCodes.OffersReceived) {
      setTableDetails({
        loading: true,
        loadedOffers: [],
      });

      dispatch(
        marketplaceActions.getUserOffers({
          collectionId,
          collectionName: collectionDetails?.collectionName || '',
          onSuccess: (offers: any) => {
            if (offersType === OfferTypeStatusCodes.OffersReceived) {
              setTableDetails({
                loading: false,
                // TODO: Remove once the backend stops returning undefined for offers received
                loadedOffers: offers ? offers : [],
              });
            }
          },
          onFailure: () => {
            // TODO: handle failure messages
          },
        }),
      );
    }
  }, [dispatch, offersType, recentlyAcceptedOffers]);

  const loadMoreData = () => {
    // TODO: Add logic to load more data
  };

  const isMobileScreen = useMediaQuery('(max-width: 640px)');

  const columns = useMemo(
    () => [
      {
        Header: t('translation:tables.titles.item'),
        // eslint-disable-next-line
        accessor: ({ item }: OffersTableItem) => {
          return (
            <ItemDetailsCell
              name={item?.name}
              id={item?.tokenId.toString()}
              logo={item?.logo}
            />
          );
        },
      },
      {
        Header: t('translation:tables.titles.price'),
        accessor: ({
          price,
          computedCurrencyPrice,
        }: OffersTableItem) => (
          <PriceDetailsCell
            wicp={parseE8SAmountToWICP(price)}
            price={
              (computedCurrencyPrice &&
                `$${formatPriceValue(
                  computedCurrencyPrice.toString(),
                )}`) ||
              ''
            }
            tableType="myOffers"
          />
        ),
      },
      {
        Header: t(
          !isMobileScreen
            ? 'translation:tables.titles.floorDifference'
            : 'translation:tables.titles.floorDif',
        ),
        accessor: ({ floorDifference }: OffersTableItem) => (
          <TextCell text={floorDifference} type="myOffers" />
        ),
      },
      {
        Header: t('translation:tables.titles.from'),
        accessor: ({ fromDetails }: OffersTableItem) => {
          const url = getICAccountLink(fromDetails?.address);
          return (
            <TextLinkCell
              text={fromDetails?.formattedAddress}
              url={url}
              type=""
              principalId={fromDetails?.address}
            />
          );
        },
      },
      {
        Header: t('translation:tables.titles.time'),
        accessor: ({ time }: OffersTableItem) => (
          <TextCell
            text={time && formatTimestamp(BigInt(time))}
            type="myOffersActivityTime"
            tableType="myOffers"
          />
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
              price={parseE8SAmountToWICP(price)}
              formattedPrice={
                (computedCurrencyPrice &&
                  computedCurrencyPrice.toString()) ||
                ''
              }
              offerFrom={fromDetails?.address}
              nftTokenId={item?.tokenId.toString()}
              actionButtonProp="light"
            />
          </ButtonWrapper>
        ),
      },
      {
        id: OffersTableHeaders.OffersMadeAction,
        Header: t('translation:tables.titles.action'),
        // TODO: Update cancel offer modal
        accessor: ({ item }: OffersTableItem) => (
          <ButtonWrapper>
            <CancelOfferModal item={item} />
          </ButtonWrapper>
        ),
      },
    ],
    [t, columnsToHide], // eslint-disable-line react-hooks/exhaustive-deps
  );

  const { loading, loadedOffers } = tableDetails;

  return (
    <>
      {(loading || (!loading && loadedOffers?.length > 0)) && (
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
                infiniteLoader: true,
                isMobileScreen,
                tableType: 'myOffers',
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
              data={loadedOffers}
              tableType="myOffers"
              columnsToHide={columnsToHide}
              loading={loading}
              loaderDetails={{
                showItemDetails: true,
                showTypeDetails: true,
                isMobileScreen,
                tableType: 'myOffers',
              }}
            />
          </Container>
        </InfiniteScrollWrapper>
      )}
      {!loading && loadedOffers?.length === 0 && (
        <EmptyStateMessage type="largeTable">
          {(offersType === OfferTypeStatusCodes.OffersReceived &&
            t('translation:emptyStates.noOffersYet')) ||
            (offersType === OfferTypeStatusCodes.OffersMade &&
              t('translation:emptyStates.noOffersMade'))}
        </EmptyStateMessage>
      )}
    </>
  );
};
