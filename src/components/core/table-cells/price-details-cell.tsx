import React from 'react';
import wicpIcon from '../../../assets/wicpIcon.png';
import {
  PriceDetails,
  WICPContainer,
  WICPText,
  WICPLogo,
  PriceText,
} from './styles';

export interface PriceDetailsCellProps {
  wicp?: string;
  price?: string;
}

export const PriceDetailsCell = ({
  wicp,
  price,
}: PriceDetailsCellProps) => (
  <PriceDetails>
    <WICPContainer>
      <WICPText>{wicp}</WICPText>
      <WICPLogo src={wicpIcon} alt="wicp" />
    </WICPContainer>
    <PriceText>{price}</PriceText>
  </PriceDetails>
);
