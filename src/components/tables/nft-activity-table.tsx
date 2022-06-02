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
import { Container } from './styles';
import { recentNFTUpdatesCount } from '../../hooks/use-marketplace-store';

type RowProps = TokenTransactionItem;

export const NFTActivityTable = () => {
  const { t } = useTranslation();
  const { theme } = useThemeStore();
  const dispatch = useAppDispatch();
  const tokenTransactions = useSelector(
    (state: RootState) => state.table.tokenTransactions,
  );

  const loadingTokenTransactions = useSelector(
    (state: RootState) => state.table.loadingTokenTransactions,
  );

  const recentCountOfNFTUpdates = recentNFTUpdatesCount();

  const { id: tokenId } = useParams();

  useEffect(() => {
    if (!tokenId) return;

    dispatch(
      tableActions.getTokenTransactions({ tokenId: Number(tokenId) }),
    );
  }, [dispatch, tokenId, recentCountOfNFTUpdates]);

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
        accessor: ({ price }: RowProps) => (
          <PriceDetailsCell
            wicp={`${price}`}
            // Obs: we don't know the historical market price at time of direct buy
            // so we are not going to display it, as by computing the current market price
            // would be misleading
            tableType="nftActivity"
          />
        ),
      },
      {
        Header: t('translation:tables.titles.seller'),
        accessor: ({ seller }: RowProps) => (
          <TextLinkCell
            text={seller.formatted}
            url=""
            type="nftActivity"
          />
        ),
      },
      {
        Header: t('translation:tables.titles.buyer'),
        accessor: ({ buyer }: RowProps) => (
          <TextLinkCell
            text={buyer.formatted}
            url=""
            type="nftActivity"
          />
        ),
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
        columns={columns}
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
