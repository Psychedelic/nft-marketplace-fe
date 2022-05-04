import { useMemo, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../store';
import { PriceDetailsCell, TextCell, TextLinkCell } from '../core';
import { AcceptOfferModal } from '../modals';
import { TableLayout } from './table-layout';
import {
  Container,
  ButtonWrapper,
  EmptyStateMessage,
} from './styles';
import { getTokenOffers } from '../../store/features/marketplace';
import { OffersTableItem } from '../../declarations/legacy';
import { formatPriceValue } from '../../utils/formatters';

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
  const [tableDetails, setTableDetails] = useState<NFTTableDetails>({
    loadedOffers: [],
    loading: true,
  });

  const { id: tokenId } = useParams();

  useEffect(() => {
    if (!isConnectedOwner && !columnsToHide.includes('action')) {
      setColumnsToHide((oldColumns) => [...oldColumns, 'action']);

      return;
    }

    const newColumnsToHide = columnsToHide.filter(
      (header) => header !== 'action',
    );

    setColumnsToHide(newColumnsToHide);
  }, [isConnectedOwner]);

  useEffect(() => {
    if (!tokenId) return;

    dispatch(
      getTokenOffers({
        // TODO: update ownerTokenIdentifiers naming convention
        ownerTokenIdentifiers: [BigInt(tokenId)],
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
  }, [dispatch]);

  const columns = useMemo(
    () => [
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
            tableType="offers"
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
            type="offers"
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
    ],
    [t, columnsToHide], // eslint-disable-line react-hooks/exhaustive-deps
  );

  const { loading, loadedOffers } = tableDetails;

  return (
    <>
      {(loading || (!loading && loadedOffers.length > 0)) && (
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
            }}
          />
        </Container>
      )}
      {!loading && loadedOffers.length === 0 && (
        <EmptyStateMessage>
          {t('translation:emptyStates.noOffersYet')}
        </EmptyStateMessage>
      )}
    </>
  );
};
