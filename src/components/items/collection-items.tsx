import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useFilterStore,
  filterActions,
  useAppDispatch,
  useNFTSStore,
  settingsActions,
  usePlugStore,
} from '../../store';
import { useNFTSFetcher } from '../../integrations/kyasshu';
import { NftList } from '../nft-list';
import { NftSkeletonList } from '../nft-skeleton-list';
import {
  ActionButton,
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
  ClearButton,
  AppliedFilters,
  FiltersButtonSkeleton,
  SortButtonSkeleton,
} from './styles';
import useMediaQuery from '../../hooks/use-media-query';
import { Icon } from '../icons';
import { Filters } from '../filters';

export const CollectionItems = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const appliedFilters = useFilterStore();
  const isMobileScreen = useMediaQuery('(max-width: 850px)');
  const [isOpenFiltersMenu, setIsOpenFiltersMenu] = useState(false);

  const {
    loadingNFTs,
    loadingCollectionData,
    totalNFTSCount,
    totalOwnersCount,
    floorPrice,
    loadedNFTS,
    totalVolume,
  } = useNFTSStore();

  const { isConnected } = usePlugStore();

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

  const displayClearButton = () => {
    if (
      appliedFilters.isMyNfts &&
      isConnected &&
      !loadedNFTS.length &&
      appliedFilters.defaultFilters.length === 1
    )
      return;

    if (appliedFilters?.defaultFilters?.length) {
      return (
        <ClearButton
          onClick={() => {
            dispatch(filterActions.clearAllFilters());
            dispatch(settingsActions.setPriceApplyButton(false));
            dispatch(filterActions.setMyNfts(false));
          }}
        >{`${t('translation:filters.clearAll')}`}</ClearButton>
      );
    }
  };

  return (
    <Container>
      {isMobileScreen && (
        <Filters
          setIsOpenFiltersMenu={setIsOpenFiltersMenu}
          isOpenFiltersMenu={isOpenFiltersMenu}
        />
      )}
      <FilteredContainer>
        <ContentWrapper>
          <Flex withMargin justifyContent="spaceBetween">
            {!isMobileScreen ? (
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
                    count={Number(totalVolume.toFixed(2))}
                    showLogo
                  />
                )}
              </ContentFlex>
            ) : (
              <ContentFlex>
                {loadingNFTs && loadedNFTS.length === 0 ? (
                  <FiltersButtonSkeleton />
                ) : (
                  <ActionButton
                    type="secondary"
                    size="wide"
                    onClick={() => {
                      setIsOpenFiltersMenu(true);
                    }}
                  >
                    Filter
                    {appliedFilters.defaultFilters.length > 0 ? (
                      <AppliedFilters>
                        {appliedFilters.defaultFilters.length}
                      </AppliedFilters>
                    ) : (
                      <Icon icon="filter" paddingLeft />
                    )}
                  </ActionButton>
                )}
              </ContentFlex>
            )}
            <ContentFlex>
              {loadingNFTs && loadedNFTS.length === 0 ? (
                <SortButtonSkeleton />
              ) : (
                <SortByFilterDropdown />
              )}
            </ContentFlex>
          </Flex>
          {!isMobileScreen && (
            <Flex>
              <ContentFlex>
                {appliedFilters.defaultFilters.map(
                  (appliedFilter) => {
                    if (!Array.isArray(appliedFilter.filterName)) {
                      if (
                        appliedFilters.isMyNfts &&
                        isConnected &&
                        !loadedNFTS.length &&
                        appliedFilter?.filterName ===
                          t('translation:buttons.action.myNfts')
                      )
                        return;
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
                              `${t(
                                'translation:buttons.action.myNfts',
                              )}`
                            ) {
                              dispatch(
                                filterActions.setMyNfts(false),
                              );
                            } else if (
                              appliedFilter.filterName ===
                              `${t(
                                'translation:buttons.action.buyNow',
                              )}`
                            ) {
                              dispatch(
                                filterActions.setStatusFilter(''),
                              );
                            } else if (
                              appliedFilter.filterName ===
                              `${t(
                                'translation:buttons.action.hasOffers',
                              )}`
                            ) {
                              dispatch(
                                filterActions.setStatusFilter(''),
                              );
                            }
                            handleRemoveFilter(appliedFilter);
                          }}
                        />
                      );
                    }
                    return appliedFilter.filterName.map((value) => {
                      return (
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
                      );
                    });
                  },
                )}
                {displayClearButton()}
              </ContentFlex>
            </Flex>
          )}
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
