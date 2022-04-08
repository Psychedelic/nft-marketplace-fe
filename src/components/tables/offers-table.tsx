import React, { useMemo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PriceDetailsCell, TextCell, TextLinkCell } from '../core';
import { AcceptOfferModal } from '../modals';
import { TableLayout } from './table-layout';
import { mockTableData } from './mock-offers-data';
import { Container, ButtonWrapper } from './styles';

import { usePlugStore } from '../../store';

export interface rowProps {
  price: string;
  floorDifference: string;
  offerFrom: string;
  expiration: string;
}

// TODO: Update offers table data and add
// logic to show accept offer button based on
// connection status and owner details

export const OffersTable = () => {
  const { t } = useTranslation();
  const [columnsToHide, setColumnsToHide] = useState<Array<string>>(
    [],
  );

  const { isConnected } = usePlugStore();

  useEffect(() => {
    if (!isConnected && !columnsToHide.includes('action')) {
      setColumnsToHide((oldColumns) => [...oldColumns, 'action']);

      return;
    }

    const newColumnsToHide = columnsToHide.filter(
      (header) => header !== 'action',
    );

    setColumnsToHide(newColumnsToHide);
  }, [isConnected]);

  const columns = useMemo(
    () => [
      {
        id: 'price',
        Header: t('translation:tables.titles.price'),
        accessor: ({ price }: rowProps) => (
          <PriceDetailsCell
            wicp={`${price} WICP`}
            price={`$${price}`}
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
