import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ItemsEmptyContainer,
  ItemsListContainer,
  ItemDetailsWrapper,
  ItemDetails,
  ItemLogo,
  ItemName,
  PriceDetails,
  WICPContainer,
  WICPText,
  WICPLogo,
  PriceText,
  SubText,
  LoadingWrapper,
  ItemDetailsContainer,
  StyledRouterLink,
} from './styles';
import { useFilterStore } from '../../store';
import { formatPriceValue } from '../../utils/formatters';
import wicpIcon from '../../assets/wicp.svg';
import { SpinnerIcon } from '../icons/custom';

type SearchResultsTypes = {
  searchText: string;
  closeDropDown: () => void;
};

const SearchResults = ({
  searchText,
  closeDropDown,
}: SearchResultsTypes) => {
  const { t } = useTranslation();
  const { searchResults, loadingSearch } = useFilterStore();

  return (
    <>
      {searchText &&
        !loadingSearch &&
        (searchResults.length ? (
          <ItemsListContainer>
            {searchResults?.map((nft) => (
              <StyledRouterLink
                to={`/nft/${nft.id}`}
                onClick={closeDropDown}
                key={nft.id}
              >
                <ItemDetailsContainer>
                  <ItemDetailsWrapper>
                    <ItemDetails>
                      <ItemLogo src={nft.preview} alt="crowns" />
                      <ItemName>{`${nft.name} ${nft.id}`}</ItemName>
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
            {t('translation:emptyStates.noNFTId')}
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
    </>
  );
};

export default SearchResults;
