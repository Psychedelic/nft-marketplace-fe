import React, { useEffect } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  tableActions,
  useAppDispatch,
  RootState,
} from '../../../store';
import { isTokenId, getTokenMetadataName } from '../../../utils/nfts';
import {
  ItemDetails,
  ItemLogo,
  ItemName,
  ThumbnailSkeleton,
  ItemTokenId,
  MediaWrapper,
  PreviewDetails,
  NameCardBg,
  NameCardContainer,
  NameCardCollection,
  NameCardTitle,
} from './styles';
import useMediaQuery from '../../../hooks/use-media-query';
import { isICNSCollection } from '../../../utils/collections';
import { SkeletonBox } from '../skeleton';
import { formatICNSName } from '../../../utils/icns';

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
  const collectionDetails = useSelector(
    (state: RootState) => state.marketplace.currentCollectionDetails,
  );

  const { collectionName, collectionThumbnail } = collectionDetails;

  const hasICNSName =
    isTokenId(id) &&
    getTokenMetadataName({
      tokenMetadataById,
      tokendId: id as string | number,
    });

  useEffect(() => {
    if (!isTokenId(id) || hasICNSName || !collectionId) return;

    // Only request metadata if NOT hasICNSName as we cache
    dispatch(
      tableActions.getTokenMetadata({
        id,
        // TODO: remove config.nftCollectionId if user offers table data contains collectionId
        collectionId,
      } as {
        id: number | string;
        collectionId: string;
      }),
    );
  }, [dispatch, id, hasICNSName, collectionId]);

  const displayThumbnail = () => {
    if (isICNSCollection(collectionName) && !logo) {
      return (
        <MediaWrapper>
          <PreviewDetails>
            <NameCardBg>
              <NameCardContainer>
                <NameCardCollection
                  src={collectionThumbnail}
                  alt="collection-logo"
                />
                {hasICNSName && (
                  <NameCardTitle>
                    {formatICNSName(hasICNSName)}
                  </NameCardTitle>
                )}
              </NameCardContainer>
            </NameCardBg>
          </PreviewDetails>
        </MediaWrapper>
      );
    }
    if (!logo && !isICNSCollection(collectionName)) {
      return <ThumbnailSkeleton />;
    }
    return <ItemLogo src={logo} alt="crowns" />;
  };

  return (
    <RouterLink to={`/${collectionId}/nft/${id}`}>
      <ItemDetails>
        {displayThumbnail()}
        <ItemName className="item-name">
          {hasICNSName ? (
            <ItemTokenId className="item-name">
              {isMobileScreen
                ? hasICNSName
                : `${collectionName} - ${hasICNSName}`}
            </ItemTokenId>
          ) : (
            <SkeletonBox />
          )}
        </ItemName>
      </ItemDetails>
    </RouterLink>
  );
};
