import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import {
  SearchResultsContainer,
  ItemsEmptyContainer,
  ItemsListContainer,
  ItemDetailsWrapper,
  ItemDetails,
  ItemLogo,
  ItemNameContainer,
  ItemName,
  ItemDescription,
  PriceDetails,
  WICPContainer,
  WICPText,
  WICPLogo,
  PriceText,
  SubText,
  LoadingWrapper,
  ItemDetailsContainer,
  StyledRouterLink,
  ItemSpan,
  MediaWrapper,
  PreviewDetails,
  NameCardBg,
  NameCardContainer,
  NameCardCollection,
  NameCardTitle,
} from './styles';
import { RootState, useFilterStore } from '../../store';
import { formatPriceValue } from '../../utils/formatters';
import wicpIcon from '../../assets/wicp.svg';
import { SpinnerIcon } from '../icons/custom';
import { useSelector } from 'react-redux';
import { isICNSCollection } from '../../utils/collections';
import config from '../../config/env';

type NFTsSearchResultsTypes = {
  searchText: string;
  closeDropDown: () => void;
};

const NFTsSearchResults = ({
  searchText,
  closeDropDown,
}: NFTsSearchResultsTypes) => {
  const { t } = useTranslation();
  const { searchResults, loadingSearch } = useFilterStore();
  const { collectionId } = useParams();
  const collectionDetails = useSelector(
    (state: RootState) => state.marketplace.currentCollectionDetails,
  );
  const { collectionName, collectionThumbnail } = collectionDetails;

  return (
    <SearchResultsContainer>
      {searchText &&
        !loadingSearch &&
        (searchResults.length ? (
          <ItemsListContainer>
            {searchResults?.map((nft) => (
              <StyledRouterLink
                to={`/${
                  nft.canister
                    ? nft.canister
                    : config.icnsCollectionId
                }/nft/${nft.id}`}
                onClick={closeDropDown}
                key={nft.id}
              >
                <ItemDetailsContainer>
                  <ItemDetailsWrapper>
                    <ItemDetails>
                      {isICNSCollection(collectionName) ||
                      !nft.preview ? (
                        <MediaWrapper>
                          <PreviewDetails>
                            <NameCardBg>
                              <NameCardContainer>
                                <NameCardCollection
                                  src={collectionThumbnail}
                                  alt="collection-logo"
                                />
                                <NameCardTitle>{`${nft.traitThumbnailName}`}</NameCardTitle>
                              </NameCardContainer>
                            </NameCardBg>
                          </PreviewDetails>
                        </MediaWrapper>
                      ) : (
                        <ItemLogo src={nft.preview} alt="crowns" />
                      )}
                      <ItemNameContainer>
                        <ItemName>{`#${nft.id}`}</ItemName>
                        {isICNSCollection(nft?.name) ? (
                          <ItemDescription>
                            {nft.traitName}
                            <ItemSpan>
                              {`(${nft.name.replace(' (test)', '')})`}
                            </ItemSpan>
                          </ItemDescription>
                        ) : (
                          <ItemDescription>
                            {nft.name}
                          </ItemDescription>
                        )}
                      </ItemNameContainer>
                    </ItemDetails>
                    <PriceDetails>
                      {Boolean(nft?.wicpPrice) && (
                        <WICPContainer size="small">
                          <WICPLogo src={wicpIcon} alt="wicp" />
                          <WICPText size="small">
                            {nft.wicpPrice}
                            WICP
                          </WICPText>
                        </WICPContainer>
                      )}
                      {Boolean(nft?.price) && (
                        <PriceText>
                          <SubText>$</SubText>
                          <SubText>{`${formatPriceValue(
                            nft.price.toString(),
                          )}`}</SubText>
                        </PriceText>
                      )}
                    </PriceDetails>
                  </ItemDetailsWrapper>
                </ItemDetailsContainer>
              </StyledRouterLink>
            ))}
          </ItemsListContainer>
        ) : (
          <ItemsEmptyContainer>
            {t('translation:emptyStates.noNFTsFound')}
          </ItemsEmptyContainer>
        ))}
      {!searchText && !loadingSearch && (
        <ItemsEmptyContainer>
          {t('translation:common.noRecentSearch')}
        </ItemsEmptyContainer>
      )}
      {loadingSearch && (
        <LoadingWrapper>
          <SpinnerIcon />
        </LoadingWrapper>
      )}
    </SearchResultsContainer>
  );
};

export default NFTsSearchResults;
