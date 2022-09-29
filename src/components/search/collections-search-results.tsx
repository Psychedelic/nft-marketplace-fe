import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
  ItemMetaDataContainer,
  ItemMetaTitle,
  LoadingWrapper,
  ItemDetailsContainer,
  StyledRouterLink,
  ThumbnailSkeleton,
} from './styles';
import { SpinnerIcon } from '../icons/custom';
import { mockCollectionsList } from './mock-data';

type CollectionsSearchResultsTypes = {
  searchText: string;
  closeDropDown: () => void;
};

const CollectionsSearchResults = ({
  searchText,
  closeDropDown,
}: CollectionsSearchResultsTypes) => {
  const { t } = useTranslation();
  const [searchResults, setSearchResults] = useState(
    mockCollectionsList,
  );
  const [loadingSearch, setLoadingSearch] = useState(false);

  useEffect(() => {
    // TODO: integrate with API to search for collections
    setLoadingSearch(true);
    const newSearchResults = mockCollectionsList.filter(
      (collection) => {
        return collection.name
          .toLowerCase()
          .includes(searchText.toLowerCase());
      },
    );
    setSearchResults(newSearchResults);
    setLoadingSearch(false);
  }, [searchText]);

  return (
    <SearchResultsContainer>
      {searchText &&
        !loadingSearch &&
        (searchResults.length ? (
          <ItemsListContainer>
            {searchResults?.map((collection) => (
              <StyledRouterLink
                to={`/${collection.canisterId}`}
                onClick={closeDropDown}
                key={collection.id}
              >
                <ItemDetailsContainer>
                  <ItemDetailsWrapper>
                    <ItemDetails>
                      {!collection.logo ? (
                        <ThumbnailSkeleton />
                      ) : (
                        <ItemLogo
                          src={collection.logo}
                          alt="crowns"
                        />
                      )}
                      <ItemNameContainer>
                        <ItemName>{collection.name}</ItemName>
                        <ItemDescription>
                          {collection.creator}
                        </ItemDescription>
                      </ItemNameContainer>
                    </ItemDetails>
                    <ItemMetaDataContainer>
                      <ItemMetaTitle>{`${collection.items} items`}</ItemMetaTitle>
                    </ItemMetaDataContainer>
                  </ItemDetailsWrapper>
                </ItemDetailsContainer>
              </StyledRouterLink>
            ))}
          </ItemsListContainer>
        ) : (
          <ItemsEmptyContainer>
            {t('translation:emptyStates.noCollectionsFound')}
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

export default CollectionsSearchResults;
