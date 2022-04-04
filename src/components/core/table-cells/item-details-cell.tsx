import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ItemDetails, ItemLogo, ItemName } from './styles';

export interface ItemDetailsCellProps {
  name?: string;
  logo?: string;
}

export const ItemDetailsCell = ({
  name,
  logo,
}: ItemDetailsCellProps) => (
  <RouterLink to={`/nft/${name}`}>
    <ItemDetails>
      <ItemLogo src={logo} alt="crowns" />
      <ItemName className="item-name">{name}</ItemName>
    </ItemDetails>
  </RouterLink>
);
