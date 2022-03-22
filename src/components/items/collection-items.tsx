import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useFilterStore,
  filterActions,
  useAppDispatch,
  useNFTSStore,
  settingsActions,
} from '../../store';
import { useNFTSFetcher } from '../../integrations/kyasshu';
import { NftList } from '../nft-list';
import { NftSkeletonList } from '../nft-skeleton-list';
import {
  FilteredCountChip,
  FilteredTraitsChip,
  SortByFilterDropdown,
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

  useNFTSFetcher();

  // TODO: move applied filters to seperate component
  const handleRemoveFilter = (appliedFilter: any) => {
    // TODO: apply sorting to fetch kyasshu API
    // eslint-disable-next-line no-console
    if (appliedFilter.filterCategory === 'Price Range') {
      dispatch(
        filterActions.removePriceFilter(appliedFilter.filterCategory),
      );
      dispatch(settingsActions.setPriceApplyButton(false));
    } else {
      dispatch(filterActions.removeFilter(appliedFilter.filterName));
      dispatch(filterActions.removeTraitsFilter(appliedFilter.filterName));
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
              <SortByFilterDropdown />
            </ContentFlex>
          </Flex>
          <Flex>
            <ContentFlex>
              {appliedFilters.defaultFilters.map((appliedFilter) => {
                if (Array.isArray(appliedFilter.filterName)) {
                  return appliedFilter.filterName.map((value) => {
                    console.log('');
                    return (
                      <FilteredTraitsChip
                        name={value}
                        rim={`${appliedFilter.filterCategory}`}
                        appliedFilterValue={appliedFilter}
                        removeFilter={() => {
                          dispatch(
                            filterActions.removeTraitsFilter(value),
                          );
                        }}
                      />
                    );
                  });
                }
                return (
                  <FilteredTraitsChip
                    name={
                      appliedFilter.filterCategory !== 'Price Range'
                        ? appliedFilter.filterName
                        : `WICP: ${appliedFilter.filterName.min} - ${appliedFilter.filterName.max}`
                    }
                    rim={`${appliedFilter.filterCategory}`}
                    appliedFilterValue={appliedFilter}
                    removeFilter={() => {
                      if (appliedFilter.filterName === `${t('translation:buttons.action.myNfts')}`) {
                        dispatch(filterActions.setMyNfts(false));
                      } else if (appliedFilter.filterName === `${t('translation:buttons.action.buyNow')}`) {
                        dispatch(filterActions.setStatusFilter(''));
                      } else if (appliedFilter.filterName === `${t('translation:buttons.action.hasOffers')}`) {
                        dispatch(filterActions.setStatusFilter(''));
                      } handleRemoveFilter(appliedFilter);
                    }}
                  />
                );
              })}
            </ContentFlex>
          </Flex>
        </ContentWrapper>
        {loadingNFTs ? (
          <SkeletonListWrapper>
            <NftSkeletonList />
          </SkeletonListWrapper>
        ) : (
          <NftList />
        )}
      </FilteredContainer>
    </Container>
  );
};
