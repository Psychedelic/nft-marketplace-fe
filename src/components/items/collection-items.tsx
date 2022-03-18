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
import { fetchFilterTraits } from '../../integrations/kyasshu/utils';
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

  useEffect(() => {
    fetchFilterTraits({
      dispatch,
    });
  }, []);

  // TODO: move applied filters to seperate component
  const handleRemoveFilter = (appliedFilter: any) => {
    // eslint-disable-next-line no-console
    if (appliedFilter.filterCategory === 'Price Range') {
      dispatch(
        filterActions.removePriceFilter(appliedFilter.filterCategory),
      );
      dispatch(settingsActions.setPriceApplyButton(false));
    } else {
      dispatch(filterActions.removeFilter(appliedFilter.filterName));
    }
  };

  const modifyName = (name: string) => {
    if (name === 'smallgem') {
      return 'Small Gem';
      // eslint-disable-next-line no-else-return
    } else if (name === 'biggem') {
      return 'Big Gem';
      // eslint-disable-next-line no-else-return
    } else if (name === 'base') {
      return 'Base';
    }
    return 'Rim';
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
              {appliedFilters.defaultFilters.map((appliedFilter) => {
                if (Array.isArray(appliedFilter.filterName)) {
                  return appliedFilter.filterName.map((value) => {
                    console.log(appliedFilter);
                    return (
                      <FilteredTraitsChip
                        name={value}
                        rim={modifyName(`${appliedFilter.filterCategory}`)}
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
                      handleRemoveFilter(appliedFilter);
                      if (appliedFilter.filterName === `${t('translation:buttons.action.myNfts')}`) {
                        dispatch(filterActions.setMyNfts(false));
                      }
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
