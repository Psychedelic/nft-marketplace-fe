import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ItemDetails, ItemLogo, ItemName } from './styles';

export interface ItemDetailsCellProps {
  name?: string;
  logo?: string;
  id?: string;
}

export const ItemDetailsCell = ({
  name,
  logo,
  id,
}: ItemDetailsCellProps) => (
  <RouterLink to={`/nft/${id}`}>
    <ItemDetails>
      <ItemLogo src={logo} alt="crowns" />
      <ItemName className="item-name">{name}</ItemName>
    </ItemDetails>
  </RouterLink>
);
