import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  useFilterStore,
  filterActions,
  useAppDispatch,
  useNFTSStore,
  settingsActions,
  usePlugStore,
  nftsActions,
  RootState,
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

  const collectionDetails = useSelector(
    (state: RootState) => state.marketplace.currentCollectionDetails,
  );

  // TODO: move applied filters to seperate component
  const handleRemoveFilter = (appliedFilter: any) => {
    // TODO: apply sorting to fetch kyasshu API
    // eslint-disable-next-line no-console
    dispatch(nftsActions.setLastIndex(undefined));
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
            dispatch(
              filterActions.setSortingFilter(
                `${t('translation:dropdown.priceFilter.all')}`,
              ),
            );
          }}
        >{`${t('translation:filters.clearAll')}`}</ClearButton>
      );
    }
  };

  const displayOwners = () => {
    if (appliedFilters.defaultFilters.length) return;

    if (!appliedFilters?.defaultFilters?.length) {
      return (
        <>
          {!loadingCollectionData && totalOwnersCount > 0 && (
            <FilteredCountChip
              label={t('translation:chips.labels.OwnersLabel')}
              count={totalOwnersCount}
              showLogo={false}
            />
          )}
        </>
      );
    }
  };

  // TODO: owners count value is returning wrong value for ICNS collection

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
                {displayOwners()}
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
              <ContentFlex mobileBtns>
                {loadingNFTs && loadedNFTS.length === 0 ? (
                  <FiltersButtonSkeleton />
                ) : (
                  <ActionButton
                    type={
                      appliedFilters.defaultFilters.length > 0
                        ? 'active'
                        : 'secondary'
                    }
                    active={Boolean(
                      appliedFilters.defaultFilters.length > 0,
                    )}
                    size="wide"
                    onClick={() => {
                      setIsOpenFiltersMenu(true);
                    }}
                  >
                    Filter
                    {appliedFilters.defaultFilters.length > 0 &&
                    !appliedFilters.isMyNfts ? (
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
            {!appliedFilters.isMyNfts && (
              <ContentFlex mobileBtns>
                {loadingNFTs && loadedNFTS.length === 0 ? (
                  <SortButtonSkeleton />
                ) : (
                  <SortByFilterDropdown />
                )}
              </ContentFlex>
            )}
          </Flex>
          {!isMobileScreen && !appliedFilters.isMyNfts && (
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
                            dispatch(
                              filterActions.setSortingFilter(
                                `${t(
                                  'translation:dropdown.priceFilter.all',
                                )}`,
                              ),
                            );
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
