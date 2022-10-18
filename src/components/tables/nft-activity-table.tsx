import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  useThemeStore,
  tableActions,
  RootState,
  useAppDispatch,
} from '../../store';
import {
  TypeDetailsCell,
  PriceDetailsCell,
  TextCell,
  TextLinkCell,
} from '../core';
import { TableLayout } from './table-layout';
import { TokenTransactionItem } from '../../utils/parser';
import {
  Container,
  RowWrapper,
  HeaderText,
  EmptyStateMessage,
} from './styles';
import { recentNFTUpdatesCount } from '../../hooks/use-marketplace-store';
import { getICAccountLink } from '../../utils/account-id';
import MobileItemDetails from '../core/table-cells/mobile-item-details';
import useMediaQuery from '../../hooks/use-media-query';

type RowProps = TokenTransactionItem;

export const NFTActivityTable = () => {
  const { t } = useTranslation();
  const { theme } = useThemeStore();
  const dispatch = useAppDispatch();
  const isMobileScreen = useMediaQuery('(max-width: 640px)');
  const tokenTransactions = useSelector(
    (state: RootState) => state.table.tokenTransactions,
  );

  const loadingTokenTransactions = useSelector(
    (state: RootState) => state.table.loadingTokenTransactions,
  );

  const recentCountOfNFTUpdates = recentNFTUpdatesCount();

  const { id: tokenId, collectionId } = useParams();

  useEffect(() => {
    if (!tokenId || !collectionId) return;

    dispatch(
      tableActions.getTokenTransactions({
        tokenId: Number(tokenId),
        collectionId,
      }),
    );
  }, [dispatch, tokenId, collectionId, recentCountOfNFTUpdates]);

  const columns = useMemo(
    () => [
      {
        Header: t('translation:tables.titles.event'),
        accessor: ({ type }: RowProps) => (
          <TypeDetailsCell type={type} tableType="nftActivity" />
        ),
      },
      {
        Header: t('translation:tables.titles.price'),
        accessor: ({ price }: RowProps) => {
          if (!price) return <TextLinkCell text="-" type="price" />;

          return (
            <PriceDetailsCell
              wicp={`${price}`}
              // Obs: we don't know the historical market price at time of direct buy
              // so we are not going to display it, as by computing the current market price
              // would be misleading
              tableType="nftActivity"
            />
          );
        },
      },
      {
        Header: t('translation:tables.titles.seller'),
        accessor: ({ seller }: RowProps) => {
          const url = getICAccountLink(seller.raw);

          return (
            <TextLinkCell
              text={seller.formatted}
              url={url}
              type="nftActivity"
              principalId={seller.raw}
            />
          );
        },
      },
      {
        Header: t('translation:tables.titles.buyer'),
        accessor: ({ buyer }: RowProps) => {
          const url = getICAccountLink(buyer.raw);

          return (
            <TextLinkCell
              text={buyer.formatted}
              url={url}
              type="nftActivity"
              principalId={buyer.raw}
            />
          );
        },
      },
      {
        Header: t('translation:tables.titles.date'),
        accessor: ({ date }: RowProps) => (
          <TextCell text={date} type="nftActivityDate" />
        ),
      },
    ],
    [t, theme], // eslint-disable-line react-hooks/exhaustive-deps
  );

  const mobileColumns = useMemo(
    () => [
      {
        Header: ' ',
        accessor: ({ type, price, date }: RowProps) => (
          <MobileItemDetails
            type={type}
            price={`${price}`}
            time={date}
            tableType="nftActivity"
          />
        ),
      },
      {
        Header: t('translation:tables.titles.seller'),
        accessor: ({ seller }: RowProps) => {
          const url = getICAccountLink(seller.raw);

          return (
            <RowWrapper>
              <HeaderText>From:</HeaderText>
              <TextLinkCell
                text={seller.formatted}
                url={url}
                type="nftActivity"
                principalId={seller.raw}
              />
            </RowWrapper>
          );
        },
      },
      {
        Header: t('translation:tables.titles.buyer'),
        accessor: ({ buyer }: RowProps) => {
          const url = getICAccountLink(buyer.raw);

          return (
            <RowWrapper>
              <HeaderText>To:</HeaderText>
              <TextLinkCell
                text={buyer.formatted}
                url={url}
                type="nftActivity"
                principalId={buyer.raw}
              />
            </RowWrapper>
          );
        },
      },
      {
        Header: t('translation:tables.titles.date'),
        accessor: ({ date }: RowProps) => (
          <TextCell text={date} type="nftActivityDate" />
        ),
      },
    ],
    [t, theme], // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <Container>
      <TableLayout
        columns={isMobileScreen ? mobileColumns : columns}
        data={tokenTransactions}
        tableType="nftActivity"
        loadingTableRows={loadingTokenTransactions}
        loaderDetails={{
          showItemDetails: false,
          showTypeDetails: true,
          type: 'medium',
        }}
        emptyMessage={t('translation:emptyStates.nftActivity')}
      />
    </Container>
  );
};
