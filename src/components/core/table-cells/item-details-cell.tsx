import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { getTokenMetadata } from '../../../integrations/kyasshu/utils';
import { useAppDispatch, useTableStore } from '../../../store';
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
}: ItemDetailsCellProps) => {
  const dispatch = useAppDispatch();
  const { loadedTableMetaData } = useTableStore();

  useEffect(() => {
    getTokenMetadata({
      tokenId: id,
      dispatch,
    });
  }, []);

  console.log(loadedTableMetaData.media);

  return (
    <RouterLink to={`/nft/${id}`}>
      <ItemDetails>
        <ItemLogo src={loadedTableMetaData.media ? loadedTableMetaData.media : logo} alt="crowns" />
        <ItemName className="item-name">{name}</ItemName>
      </ItemDetails>
    </RouterLink>
  );
};
