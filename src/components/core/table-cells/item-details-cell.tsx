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
  MediaWrapper,
  PreviewDetails,
  NameCardBg,
  NameCardContainer,
  NameCardCollection,
  NameCardTitle,
} from './styles';
import useMediaQuery from '../../../hooks/use-media-query';

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
        collectionId,
      } as {
        id: number | string;
        collectionId: string;
      }),
    );
  }, [dispatch, id, hasThumbnail, collectionId]);

  const displayThumbnail = () => {
    if (collectionName?.includes('ICNS') && !logo) {
      return (
        <MediaWrapper>
          <PreviewDetails>
            <NameCardBg>
              <NameCardContainer>
                <NameCardCollection
                  src={collectionThumbnail}
                  alt="collection-logo"
                />
                <NameCardTitle>{`#${id}`}</NameCardTitle>
              </NameCardContainer>
            </NameCardBg>
          </PreviewDetails>
        </MediaWrapper>
      );
    }
    if (!logo && !collectionName?.includes('ICNS')) {
      return <ThumbnailSkeleton />;
    }
    return <ItemLogo src={logo} alt="crowns" />;
  };

  return (
    <RouterLink to={`/${collectionId}/nft/${id}`}>
      <ItemDetails>
        {displayThumbnail()}
        <ItemName className="item-name">
          {isMobileScreen ? 'Cap Crowns' : name?.replace(' (test)','')}
          <ItemTokenId className="item-name">
            {isMobileScreen && `#${id}`}
          </ItemTokenId>
        </ItemName>
      </ItemDetails>
    </RouterLink>
  );
};
