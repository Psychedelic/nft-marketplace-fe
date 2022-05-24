import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useFilterStore,
  filterActions,
  useAppDispatch,
  useNFTSStore,
  settingsActions,
  nftsActions,
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

  const {
    loadingNFTs,
    loadingCollectionData,
    totalNFTSCount,
    totalOwnersCount,
    floorPrice,
    loadedNFTS,
    totalVolume,
  } = useNFTSStore();

  const appliedFiltersCount =
    appliedFilters?.defaultFilters.length || 0;

  useEffect(() => {
    if (appliedFiltersCount > 0) return;

    dispatch(nftsActions.getCollectionData());
  }, [appliedFiltersCount]);

  useNFTSFetcher();

  // TODO: move applied filters to seperate component
  const handleRemoveFilter = (appliedFilter: any) => {
    // TODO: apply sorting to fetch kyasshu API
    // eslint-disable-next-line no-console
    if (
      appliedFilter.filterCategory ===
      `${t('translation:filters.priceRange')}`
    ) {
      dispatch(
        filterActions.removePriceFilter(appliedFilter.filterCategory),
      );
      dispatch(settingsActions.setPriceApplyButton(false));
    } else {
      dispatch(filterActions.removeFilter(appliedFilter.filterName));
      dispatch(
        filterActions.removeTraitsFilter({
          value: appliedFilter.filterName,
          key: appliedFilter.filterCategory,
        }),
      );
    }
  };

  // TODO: Add loader when collection data or floor price
  // details are loading

  return (
    <Container>
      <FilteredContainer>
        <ContentWrapper>
          <Flex withMargin justifyContent>
            <ContentFlex>
              {!loadingCollectionData && totalNFTSCount > 0 && (
                <FilteredCountChip
                  label={t('translation:chips.labels.itemsLabel')}
                  count={totalNFTSCount}
                  showLogo={false}
                />
              )}
              {!loadingCollectionData && totalOwnersCount > 0 && (
                <FilteredCountChip
                  label={t('translation:chips.labels.OwnersLabel')}
                  count={totalOwnersCount}
                  showLogo={false}
                />
              )}
              {!loadingCollectionData && floorPrice > 0 && (
                <FilteredCountChip
                  label={t(
                    'translation:chips.labels.FloorPriceLabel',
                  )}
                  count={floorPrice}
                  showLogo
                />
              )}
              {!loadingCollectionData && totalVolume > 0 && (
                <FilteredCountChip
                  label={t('translation:chips.labels.totalVolume')}
                  count={totalVolume}
                  showLogo
                />
              )}
            </ContentFlex>
            <ContentFlex>
              <SortByFilterDropdown />
            </ContentFlex>
          </Flex>
          <Flex>
            <ContentFlex>
              {appliedFilters.defaultFilters.map((appliedFilter) => {
                if (!Array.isArray(appliedFilter.filterName)) {
                  return (
                    <FilteredTraitsChip
                      key={appliedFilter.filterName}
                      name={
                        appliedFilter.filterCategory !==
                        `${t('translation:filters.priceRange')}`
                          ? appliedFilter.filterName
                          : `WICP: ${appliedFilter.filterName.min} - ${appliedFilter.filterName.max}`
                      }
                      rim={`${appliedFilter.filterCategory}`}
                      appliedFilterValue={appliedFilter}
                      removeFilter={() => {
                        if (
                          appliedFilter.filterName ===
                          `${t('translation:buttons.action.myNfts')}`
                        ) {
                          dispatch(filterActions.setMyNfts(false));
                        } else if (
                          appliedFilter.filterName ===
                          `${t('translation:buttons.action.buyNow')}`
                        ) {
                          dispatch(filterActions.setStatusFilter(''));
                        } else if (
                          appliedFilter.filterName ===
                          `${t(
                            'translation:buttons.action.hasOffers',
                          )}`
                        ) {
                          dispatch(filterActions.setStatusFilter(''));
                        }
                        handleRemoveFilter(appliedFilter);
                      }}
                    />
                  );
                }
                return appliedFilter.filterName.map((value) => (
                  <FilteredTraitsChip
                    key={value}
                    name={value}
                    rim={`${appliedFilter.filterCategory}`}
                    appliedFilterValue={appliedFilter}
                    removeFilter={() => {
                      dispatch(
                        filterActions.removeTraitsFilter({
                          value,
                          key: appliedFilter.filterCategory,
                        }),
                      );
                    }}
                  />
                ));
              })}
            </ContentFlex>
          </Flex>
        </ContentWrapper>
        {loadingNFTs && loadedNFTS.length === 0 ? (
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
