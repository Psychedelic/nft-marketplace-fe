import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { getTokenMetadata } from '../../../integrations/kyasshu/utils';
import { useAppDispatch, useTableStore } from '../../../store';
import { ItemDetails, ItemLogo, ItemName } from './styles';
import { ImageSkeleton } from '../../tables/styles';

export interface ItemDetailsCellProps {
  name?: string;
  logo?: string;
  id?: string;
}

export const ItemDetailsCell = ({
  name,
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

  return (
    <RouterLink to={`/nft/${id}`}>
      <ItemDetails>
        {!loadedTableMetaData.media ? (
          <ImageSkeleton />
        ) : (
          <ItemLogo src={loadedTableMetaData.media} alt="crowns" />
        )}
        <ItemName className="item-name">{name}</ItemName>
      </ItemDetails>
    </RouterLink>
  );
};
