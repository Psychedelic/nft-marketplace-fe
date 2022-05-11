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
import { TokenTransactionItem } from '../../store/features/tables/async-thunks/get-token-transactions';
import { Container } from './styles';

type RowProps = TokenTransactionItem;

export const NFTActivityTable = () => {
  const { t } = useTranslation();
  const { theme } = useThemeStore();
  const dispatch = useAppDispatch();
  const tokenTransactions = useSelector(
    (state: RootState) => state.table.tokenTransactions,
  );
  const { id: tokenId } = useParams();

  useEffect(() => {
    if (!tokenId) return;

    dispatch(
      tableActions.getTokenTransactions({ tokenId: Number(tokenId) }),
    );
  }, [dispatch, tokenId]);

  const columns = useMemo(
    () => [
      {
        Header: t('translation:tables.titles.event'),
        accessor: ({ type }: RowProps) => (
          <TypeDetailsCell
            name={type}
            type={type}
            tableType="nftActivity"
          />
        ),
      },
      {
        Header: t('translation:tables.titles.price'),
        accessor: ({ price }: RowProps) => (
          <PriceDetailsCell
            wicp={`${price} WICP`}
            // Obs: we don't know the historical market price at time of direct buy
            // so we are not going to display it, as by computing the current market price
            // would be misleading
            tableType="nftActivity"
          />
        )
      },
      {
        Header: t('translation:tables.titles.from'),
        accessor: ({ from }: RowProps) => (
          <TextLinkCell text={from.formatted} url="" type="nftActivity" />
        ),
      },
      {
        Header: t('translation:tables.titles.to'),
        accessor: ({ to }: RowProps) => (
          <TextLinkCell text={to.formatted} url="" type="nftActivity" />
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
      {
        // TODO: Show loading until data readiness
        // and show empty view when no data
        tokenTransactions && (
          <TableLayout
            columns={columns}
            data={tokenTransactions}
            tableType="nftActivity"
            loaderDetails={{
              showItemDetails: true,
              showTypeDetails: true,
            }}
          />
        )
      }
    </Container>
  );
};
