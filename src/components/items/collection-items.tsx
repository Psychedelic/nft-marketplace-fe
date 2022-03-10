import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useFilterStore,
  filterActions,
  useAppDispatch,
  useNFTSStore,
} from '../../store';
import { useNFTSFetcher } from '../../integrations/kyasshu';
import { NftList } from '../nft-list';
import { NftSkeletonList } from '../nft-skeleton-list';
import {
  FilteredCountChip,
  FilteredTraitsChip,
  PriceFilterDropdown,
} from '../core';
import {
  Container,
  FilteredContainer,
  ContentWrapper,
  Flex,
  ContentFlex,
  SkeletonListWrapper,
} from './styles';

export const CollectionItems = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const appliedFilters = useFilterStore();

  const { loadingNFTs } = useNFTSStore();

  const dropDownContent = [
    `${t('translation:dropdown.priceFilter.recentlyListed')}`,
    `${t('translation:dropdown.priceFilter.recentlySold')}`,
    `${t('translation:dropdown.priceFilter.lowToHigh')}`,
    `${t('translation:dropdown.priceFilter.highToHigh')}`,
    `${t('translation:dropdown.priceFilter.highestLastSale')}`,
  ];

  useNFTSFetcher();
  // TODO: use infinite loader to do pagination

  // TODO: move applied filters to seperate component
  const handleRemoveFilter = (appliedFilter: object) => {
    // eslint-disable-next-line no-console
    if (appliedFilter.filterCategory === 'Price Range') {
      dispatch(
        filterActions.removePriceFilter(appliedFilter.filterCategory),
      );
    } else {
      dispatch(filterActions.removeFilter(appliedFilter.filterName));
    }
  };

  return (
    <Container>
      <FilteredContainer>
        <ContentWrapper>
          <Flex withMargin justifyContent>
            <ContentFlex>
              <FilteredCountChip
                label={t('translation:chips.labels.itemsLabel')}
                count="10.0k"
                showLogo={false}
              />
              <FilteredCountChip
                label={t('translation:chips.labels.OwnersLabel')}
                count="5.9k"
                showLogo={false}
              />
              <FilteredCountChip
                label={t('translation:chips.labels.FloorPriceLabel')}
                count="22.12"
                showLogo
              />
            </ContentFlex>
            <ContentFlex>
              <PriceFilterDropdown
                defaultValue={`${t(
                  'translation:dropdown.priceFilter.lowToHigh',
                )}`}
                options={dropDownContent}
              />
            </ContentFlex>
          </Flex>
          <Flex>
            <ContentFlex>
              {/* Create state to control display for these chips */}
              {/* We need an array to store the selected filters */}
              {appliedFilters.map((appliedFilter) => (
                <FilteredTraitsChip
                  name={
                    appliedFilter.filterCategory !== 'Price Range'
                      ? appliedFilter.filterName
                      : `WICP: ${appliedFilter.filterName.min} - ${appliedFilter.filterName.max}`
                  }
                  rim={`${appliedFilter.filterCategory}`}
                  appliedFilterValue={appliedFilter}
                  removeFilter={() => handleRemoveFilter(appliedFilter)}
                />
              ))}
            </ContentFlex>
          </Flex>
        </ContentWrapper>
        {loadingNFTs ? <SkeletonListWrapper><NftSkeletonList /></SkeletonListWrapper> : <NftList />}
      </FilteredContainer>
    </Container>
  );
};
