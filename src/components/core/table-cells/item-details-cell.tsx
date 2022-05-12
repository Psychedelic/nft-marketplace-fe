import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  tableActions,
  useAppDispatch,
  RootState,
} from '../../../store';
import { isTokenId, getTokenMetadataThumbnail } from '../../../utils/nfts';
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
  const tokenMetadataById = useSelector(
    (state: RootState) => state.table.tokenMetadataById,
  );
  const hasThumbnail = isTokenId(id) && getTokenMetadataThumbnail({
    tokenMetadataById,
    tokendId: id as string | number,
  });

  useEffect(() => {
    if (!isTokenId(id) || hasThumbnail) return;

    // Only request metadata if NOT hasThumbnail as we cache
    dispatch(tableActions.getTokenMetadata({ id } as { id: number | string }));
  }, [dispatch, id, hasThumbnail]);


  return (
    <RouterLink to={`/nft/${id}`}>
      <ItemDetails>
        {!hasThumbnail ? (
          <ImageSkeleton />
        ) : (
          <ItemLogo src={hasThumbnail} alt="crowns" />
        )}
        <ItemName className="item-name">{name}</ItemName>
      </ItemDetails>
    </RouterLink>
  );
};
