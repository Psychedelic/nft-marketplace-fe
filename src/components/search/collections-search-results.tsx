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
} from './styles';
import { SpinnerIcon } from '../icons/custom';
import { Collection } from '@psychedelic/jelly-js';
import { useSelector } from 'react-redux';
import {
  marketplaceActions,
  RootState,
  useAppDispatch,
} from '../../store';
import { useNavigate } from 'react-router';

type CollectionsSearchResultsTypes = {
  searchText: string;
  closeDropDown: () => void;
};

const CollectionsSearchResults = ({
  searchText,
  closeDropDown,
}: CollectionsSearchResultsTypes) => {
  const { t } = useTranslation();
  const [searchResults, setSearchResults] = useState<Collection[]>();
  const [loadingSearch, setLoadingSearch] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const collections = useSelector(
    (state: RootState) => state.marketplace.collections,
  );

  useEffect(() => {
    dispatch(marketplaceActions.getAllCollections());
  }, []);

  useEffect(() => {
    // TODO: integrate with API to search for collections
    setLoadingSearch(true);
    const newSearchResults = collections.filter((collection) => {
      return collection.name
        .toLowerCase()
        .includes(searchText.toLowerCase());
    });
    setSearchResults(newSearchResults);
    setLoadingSearch(false);
  }, [searchText]);

  return (
    <SearchResultsContainer>
      {searchText &&
        !loadingSearch &&
        (searchResults?.length ? (
          <ItemsListContainer>
            {searchResults?.map((collection) => (
              <StyledRouterLink
                to={`/${collection.id.toText()}`}
                onClick={() => {
                  closeDropDown();
                  navigate(`/${collection.id.toText()}`);
                }}
                key={collection.id.toText()}
              >
                <ItemDetailsContainer>
                  <ItemDetailsWrapper>
                    <ItemDetails>
                      <ItemLogo
                        src={collection.thumbnail}
                        alt="crowns"
                      />
                      <ItemNameContainer>
                        <ItemName>{collection.name}</ItemName>
                        <ItemDescription>
                          {collection.name}
                        </ItemDescription>
                      </ItemNameContainer>
                    </ItemDetails>
                    <ItemMetaDataContainer>
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
