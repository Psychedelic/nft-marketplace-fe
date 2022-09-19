import React, { useEffect } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  tableActions,
  useAppDispatch,
  RootState,
} from '../../../store';
import {
  isTokenId,
  getTokenMetadataThumbnail,
} from '../../../utils/nfts';
import {
  ItemDetails,
  ItemLogo,
  ItemName,
  ThumbnailSkeleton,
  ItemTokenId,
} from './styles';
import useMediaQuery from '../../../hooks/use-media-query';
import config from '../../../config/env';

export interface ItemDetailsCellProps {
  name?: string;
  logo?: string;
  id?: string;
}

export const ItemDetailsCell = ({
  name,
  id,
  logo,
}: ItemDetailsCellProps) => {
  const { collectionId } = useParams();
  const dispatch = useAppDispatch();
  const isMobileScreen = useMediaQuery('(max-width: 640px');
  const tokenMetadataById = useSelector(
    (state: RootState) => state.table.tokenMetadataById,
  );
  const hasThumbnail =
    isTokenId(id) &&
    getTokenMetadataThumbnail({
      tokenMetadataById,
      tokendId: id as string | number,
    });

  useEffect(() => {
    if (!isTokenId(id) || hasThumbnail || !collectionId) return;

    // Only request metadata if NOT hasThumbnail as we cache
    dispatch(
      tableActions.getTokenMetadata({
        id,
        // TODO: remove config.nftCollectionId if user offers table data contains collectionId
        collectionId: collectionId || config.nftCollectionId,
      } as {
        id: number | string;
        collectionId: string;
      }),
    );
  }, [dispatch, id, hasThumbnail, collectionId]);

  return (
    <RouterLink
      to={`/${collectionId || config.nftCollectionId}/nft/${id}`}
    >
      <ItemDetails>
        {!logo ? (
          <ThumbnailSkeleton />
        ) : (
          <ItemLogo src={logo} alt="crowns" />
        )}
        <ItemName className="item-name">
          {isMobileScreen ? 'Cap Crowns' : name}
          <ItemTokenId className="item-name">
            {isMobileScreen && `#${id}`}
          </ItemTokenId>
        </ItemName>
      </ItemDetails>
    </RouterLink>
  );
};
