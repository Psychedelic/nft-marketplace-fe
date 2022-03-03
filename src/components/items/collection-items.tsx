import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
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
} from './styles';

export interface CollectionItemsProps {
  selectedFilters: Array<{
    filterName: string;
    filterCategory: string;
  }>;
  statusFilter: string;
  displayChip: boolean;
}

export const CollectionItems = ({
  selectedFilters,
  statusFilter,
  displayChip,
}: CollectionItemsProps) => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState<boolean>(true);

  const dropDownContent = [
    `${t('translation:dropdown.priceFilter.recentlyListed')}`,
    `${t('translation:dropdown.priceFilter.recentlySold')}`,
    `${t('translation:dropdown.priceFilter.lowToHigh')}`,
    `${t('translation:dropdown.priceFilter.highToHigh')}`,
    `${t('translation:dropdown.priceFilter.highestLastSale')}`,
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

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
              {displayChip && selectedFilters.map((selectedFilter) => (
                <FilteredTraitsChip
                  name={`${selectedFilter.filterName}`}
                  rim={`${selectedFilter.filterCategory}`}
                  removeFilter={() => {
                    // eslint-disable-next-line no-console
                    console.log('callback');
                  }}
                />
              ))}
            </ContentFlex>
          </Flex>
        </ContentWrapper>
        {loading ? <NftSkeletonList /> : <NftList />}
      </FilteredContainer>
    </Container>
  );
};
