import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNFTSFetcher } from '../../hooks';
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

import { useNFTSStore } from '../../store';

export const CollectionItems = () => {
  const { t } = useTranslation();

  const { loadingNFTs } = useNFTSStore();

  const dropDownContent = [
    `${t('translation:dropdown.priceFilter.recentlyListed')}`,
    `${t('translation:dropdown.priceFilter.recentlySold')}`,
    `${t('translation:dropdown.priceFilter.lowToHigh')}`,
    `${t('translation:dropdown.priceFilter.highToHigh')}`,
    `${t('translation:dropdown.priceFilter.highestLastSale')}`,
  ];

  useNFTSFetcher();

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
              <FilteredTraitsChip
                name="Red"
                rim="Big Gem"
                removeFilter={() => {
                  // eslint-disable-next-line no-console
                  console.log('callback');
                }}
              />
              <FilteredTraitsChip
                name="Psychedelic"
                rim="Rim"
                removeFilter={() => {
                  // eslint-disable-next-line no-console
                  console.log('callback');
                }}
              />
            </ContentFlex>
          </Flex>
        </ContentWrapper>
        {loadingNFTs ? <NftSkeletonList /> : <NftList />}
      </FilteredContainer>
    </Container>
  );
};
