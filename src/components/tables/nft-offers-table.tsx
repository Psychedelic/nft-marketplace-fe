import { useMemo, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  useAppDispatch,
  RootState,
  marketplaceActions,
  usePlugStore,
} from '../../store';
import { PriceDetailsCell, TextCell, TextLinkCell } from '../core';
import { AcceptOfferModal } from '../modals';
import { TableLayout } from './table-layout';
import { Container, ButtonWrapper } from './styles';
import { OffersTableItem } from '../../declarations/legacy';
import {
  formatPriceValue,
  parseE8SAmountToWICP,
} from '../../utils/formatters';
import { isNFTOwner } from '../../integrations/kyasshu/utils';
import { formatTimestamp } from '../../integrations/functions/date';
import { getICAccountLink } from '../../utils/account-id';
import useMediaQuery from '../../hooks/use-media-query';

/* --------------------------------------------------------------------------
 * NFT Offers Table Component
 * --------------------------------------------------------------------------*/

export type NFTOffersTableProps = {
  isConnectedOwner?: boolean;
};

export type NFTTableDetails = {
  loading: boolean;
  loadedOffers: Array<any>;
};

export const NFTOffersTable = ({
  isConnectedOwner,
}: NFTOffersTableProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [columnsToHide, setColumnsToHide] = useState<Array<string>>(
    [],
  );
  const [hideColumns, setHideColumn] = useState<boolean>(false);

  const [tableDetails, setTableDetails] = useState<NFTTableDetails>({
    loadedOffers: [],
    loading: true,
  });

  const recentlyMadeOffers = useSelector(
    (state: RootState) => state.marketplace.recentlyMadeOffers,
  );

  const recentlyCancelledOffers = useSelector(
    (state: RootState) => state.marketplace.recentlyCancelledOffers,
  );

  const nftOffers = useSelector(
    (state: RootState) => state.marketplace.nftOffers,
  );

  const { id, collectionId } = useParams();

  const { isConnected, principalId: plugPrincipal } = usePlugStore();

  const isMobileScreen = useMediaQuery('(max-width: 640px)');

  const myNFTIds = useSelector(
    (state: RootState) => state.nfts.myNFTIds,
  );

  useEffect(() => {
    if (!isConnectedOwner && !columnsToHide.includes('action')) {
      setColumnsToHide((oldColumns) => [...oldColumns, 'action']);
      setHideColumn(true);

      return;
    }

    const newColumnsToHide = columnsToHide.filter(
      (header) => header !== 'action',
    );

    setColumnsToHide(newColumnsToHide);
    setHideColumn(false);
  }, [isConnectedOwner]);

  useEffect(() => {
    if (!id || !collectionId) return;

    dispatch(
      marketplaceActions.getNFTOffers({
        id,
        collectionId,

        onSuccess: () => {
          // TODO: handle success messages
        },

        onFailure: () => {
          // TODO: handle failure messages
        },
      }),
    );
  }, [dispatch, recentlyMadeOffers, recentlyCancelledOffers]);

  useEffect(() => {
    setTableDetails({
      loading: false,
      loadedOffers: nftOffers,
    });
  }, [nftOffers]);

  const columns = useMemo(
    () => [
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
            tableType="offers"
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
          <TextCell text={floorDifference} type="offers" />
        ),
      },
      {
        Header: t('translation:tables.titles.from'),
        accessor: ({ fromDetails }: OffersTableItem) => {
          const isOwner = isNFTOwner({
            isConnected,
            myNFTIds,
            currentNFTId: id,
          });
          const url = getICAccountLink(fromDetails.address);

          return (
            <TextLinkCell
              text={
                (isOwner && t('translation:tables.labels.you')) ||
                fromDetails.formattedAddress
              }
              url={url}
              type="offers"
              principalId={fromDetails.address}
            />
          );
        },
      },
      {
        Header: t('translation:tables.titles.time'),
        accessor: ({ time }: OffersTableItem) => (
          <TextCell
            text={formatTimestamp(BigInt(time))}
            type="offersActivityTime"
          />
        ),
      },
      {
        id: 'action',
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
              offerFrom={fromDetails.address}
              nftTokenId={item.tokenId.toString()}
            />
          </ButtonWrapper>
        ),
      },
    ],
    [t, columnsToHide], // eslint-disable-line react-hooks/exhaustive-deps
  );

  const { loading, loadedOffers } = tableDetails;

  return (
    <Container>
      <TableLayout
        columns={columns}
        data={loadedOffers}
        tableType="offers"
        columnsToHide={columnsToHide}
        loading={loading}
        loaderDetails={{
          showItemDetails: false,
          showTypeDetails: false,
          type: 'small',
          hideColumns,
          isMobileScreen,
        }}
        emptyMessage={t('translation:emptyStates.noOffersYet')}
      />
    </Container>
  );
};
