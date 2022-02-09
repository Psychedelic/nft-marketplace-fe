import React from 'react';
import { ItemDetails, ItemLogo, ItemName } from './styles';

export interface ItemDetailsCellProps {
  name?: string;
  logo?: string;
}

export const ItemDetailsCell = ({
  name,
  logo,
}: ItemDetailsCellProps) => (
  <ItemDetails>
    <ItemLogo src={logo} alt="crowns" />
    <ItemName className="item-name">{name}</ItemName>
  </ItemDetails>
);
