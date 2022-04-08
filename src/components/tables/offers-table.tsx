import React, { useMemo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PriceDetailsCell, TextCell, TextLinkCell } from '../core';
import { AcceptOfferModal } from '../modals';
import { TableLayout } from './table-layout';
// TODO: Remove mock data after fetching offers table details
import { mockTableData } from './mock-offers-data';
import { Container, ButtonWrapper } from './styles';

export type OffersTableProps = {
  isConnectedOwner?: boolean;
  lastSalePrice?: string;
};

export interface rowProps {
  price: string;
  floorDifference: string;
  offerFrom: string;
  formattedPrice: string;
}

export const OffersTable = ({
  isConnectedOwner,
  lastSalePrice,
}: OffersTableProps) => {
  const { t } = useTranslation();
  const [columnsToHide, setColumnsToHide] = useState<Array<string>>(
    [],
  );

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

  const columns = useMemo(
    () => [
      {
        id: 'price',
        Header: t('translation:tables.titles.price'),
        accessor: ({ price, formattedPrice }: rowProps) => (
          <PriceDetailsCell
            wicp={`${price} WICP`}
            price={`$${formattedPrice}`}
            tableType="offers"
          />
        ),
      },
      {
        id: 'floorDifference',
        Header: t('translation:tables.titles.floorDifference'),
        // TODO: Use lastSalePrice to calculate floor difference
        accessor: ({ floorDifference }: rowProps) => (
          <TextCell text={floorDifference} type="offers" />
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
    [columnsToHide], // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <Container>
      <TableLayout
        columns={columns}
        data={mockTableData}
        tableType="offers"
        columnsToHide={columnsToHide}
      />
    </Container>
  );
};
