import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { PriceDetailsCell, TextCell, TextLinkCell } from '../core';
import { AcceptOfferModal } from '../modals';
import { TableLayout } from './table-layout';
import { mockTableData } from './mock-data';
import { Container, ButtonWrapper } from './styles';

export interface rowProps {
  price: string;
  floorDifference: string;
  offerFrom: string;
  expiration: string;
}

export const OffersTable = () => {
  const { t } = useTranslation();

  const columns = useMemo(
    () => [
      {
        id: 'price',
        Header: t('translation:tables.titles.price'),
        accessor: ({ price }: rowProps) => (
          <PriceDetailsCell
            wicp="5.12 WICP"
            price={price}
            tableType="offers"
          />
        ),
      },
      {
        id: 'floorDifference',
        Header: t('translation:tables.titles.floorDifference'),
        accessor: ({ floorDifference }: rowProps) => (
          <TextCell text={floorDifference} type="offers" />
        ),
      },
      {
        id: 'expiration',
        Header: t('translation:tables.titles.expiration'),
        accessor: ({ expiration }: rowProps) => (
          <TextCell text={expiration} type="offers" />
        ),
      },
      {
        id: 'from',
        Header: t('translation:tables.titles.from'),
        accessor: ({ offerFrom }: rowProps) => (
          <TextLinkCell text={offerFrom} url="" type="offers" />
        ),
      },
      {
        id: 'action',
        Header: t('translation:tables.titles.action'),
        accessor: () => (
          <ButtonWrapper>
            <AcceptOfferModal />
          </ButtonWrapper>
        ),
      },
    ],
    [], // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <Container>
      <TableLayout
        columns={columns}
        data={mockTableData}
        tableType="offers"
      />
    </Container>
  );
};
