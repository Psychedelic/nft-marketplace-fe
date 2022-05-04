import React, { useMemo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PriceDetailsCell, TextCell, TextLinkCell } from '../core';
import { AcceptOfferModal } from '../modals';
import { TableLayout } from './table-layout';
// TODO: Remove mock data after fetching offers table details
import { mockTableData } from './mock-offers-data';
import { Container, ButtonWrapper } from './styles';

import { formatAddress } from '../../integrations/plug';

/* --------------------------------------------------------------------------
 * NFT Offers Table Component
 * --------------------------------------------------------------------------*/

export type NFTOffersTableProps = {
  isConnectedOwner?: boolean;
  lastSalePrice?: string;
};

interface RowProps {
  price: string;
  floorDifference: string;
  offerFrom: string;
  formattedPrice: string;
}

export const NFTOffersTable = ({
  isConnectedOwner,
}: NFTOffersTableProps) => {
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
        accessor: ({ price, formattedPrice }: RowProps) => (
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
        accessor: ({ floorDifference }: RowProps) => (
          <TextCell text={floorDifference} type="offers" />
        ),
      },
      {
        id: 'from',
        Header: t('translation:tables.titles.from'),
        accessor: ({ offerFrom }: RowProps) => (
          <TextLinkCell
            text={formatAddress(offerFrom)}
            url=""
            type="offers"
          />
        ),
      },
      {
        id: 'action',
        Header: t('translation:tables.titles.action'),
        accessor: ({ price, formattedPrice, offerFrom }) => (
          <ButtonWrapper>
            <AcceptOfferModal
              price={price}
              formattedPrice={formattedPrice}
              offerFrom={offerFrom}
            />
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
