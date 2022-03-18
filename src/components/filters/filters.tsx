import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useFilterStore,
  useThemeStore,
  filterActions,
  useAppDispatch,
  settingsActions,
  useSettingsStore,
} from '../../store';
import {
  ActionButton,
  CheckboxFilterAccordion,
  FilterInput,
  IconActionButton,
} from '../core';
import closeFiltersIcon from '../../assets/buttons/close-filters.svg';
import closeFiltersIconDark from '../../assets/buttons/close-filters-dark.svg';
import openFiltersIcon from '../../assets/buttons/open-filters.svg';
import openFiltersIconDark from '../../assets/buttons/open-filters-dark.svg';
import {
  Container,
  CloseFilterContainer,
  FiltersContainer,
  FiltersWrapper,
  Flex,
  FilterSection,
  FilterGroup,
  Heading,
  Subtext,
  ClearButton,
  Subheadings,
  CheckboxFilters,
  FilterButtonWrapper,
} from './styles';
import { refinedCheckboxDummyData } from '../mock-data/accordion-data';

/* --------------------------------------------------------------------------
 * Filters Component
 * --------------------------------------------------------------------------*/

export const Filters = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { defaultFilters, loadedFiltersList } = useFilterStore();
  const { theme } = useThemeStore();
  const { collapsed, displayPriceApplyButton } = useSettingsStore();
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [priceFilterValue, setPriceFilterValue] = useState({
    min: '',
    max: '',
  });
  const myNfts = `${t('translation:buttons.action.myNfts')}`;
  const isLightTheme = theme === 'lightTheme';

  const closeFiltersIconTheme = isLightTheme
    ? closeFiltersIcon
    : closeFiltersIconDark;
  const openFiltersIconTheme = isLightTheme
    ? openFiltersIcon
    : openFiltersIconDark;

  const filterExists = (filterName: string) => defaultFilters.some((appliedFilter) => appliedFilter.filterName === filterName);

  const applyFilter = (filterCategory: string, filterName: any) => {
    const filterCategoryExists = defaultFilters.some((appliedFilter) => appliedFilter.filterCategory === filterCategory);

    const filterNameExists = defaultFilters.some(
      (appliedFilter) => appliedFilter.filterName === filterName,
    );

    // TODO: do something about the switch statement atm hardtyped
    switch (true) {
      case filterCategoryExists && filterNameExists:
        dispatch(filterActions.removeFilter(filterName));
        break;
      case filterCategoryExists && !filterNameExists:
        dispatch(
          filterActions.updateFilter({
            filterCategory,
            filterName,
          }),
        );
        break;
      default:
        dispatch(
          filterActions.applyFilter({
            filterName,
            filterCategory,
          }),
        );
        break;
    }
  };

  const applyPriceFilter = () => {
    if (priceFilterValue.min !== '0' && priceFilterValue.max !== '0') {
      dispatch(settingsActions.setPriceApplyButton(true));
    }
  };

  return (
    <Container>
      <CloseFilterContainer opened={!collapsed}>
        <IconActionButton
          handleClick={() => {
            dispatch(settingsActions.setFilterCollapsed(!collapsed));
          }}
        >
          <img
            src={
              collapsed ? closeFiltersIconTheme : openFiltersIconTheme
            }
            alt="filter-icon"
          />
        </IconActionButton>
      </CloseFilterContainer>
      {collapsed && (
        <FiltersContainer>
          <FiltersWrapper>
            <Flex>
              <Heading>Filters</Heading>
              <ClearButton
                onClick={() => {
                  dispatch(filterActions.clearAllFilters());
                  dispatch(settingsActions.setPriceApplyButton(false));
                }}
              >
                Clear All
              </ClearButton>
              {/* should remove all filters on click */}
            </Flex>
            <FilterSection>
              <FilterGroup>
                <Subheadings>Display</Subheadings>
                <Flex justify="spaceBetween">
                  <FilterButtonWrapper>
                    <ActionButton
                      type={
                        !filterExists(myNfts)
                          ? 'outline'
                          : 'secondary'
                      }
                      text={t('translation:buttons.action.allNfts')}
                      handleClick={() => {
                        dispatch(filterActions.removeFilter(myNfts));
                        dispatch(filterActions.setMyNfts(false));
                      }}
                    />
                  </FilterButtonWrapper>
                  <Subtext margin="rightAndLeft" color="secondary">
                    or
                  </Subtext>
                  <FilterButtonWrapper>
                    <ActionButton
                      type={
                        filterExists(myNfts) ? 'outline' : 'secondary'
                      }
                      text={t('translation:buttons.action.myNfts')}
                      handleClick={() => {
                        applyFilter('Display', myNfts);
                        dispatch(filterActions.setMyNfts(true));
                      }}
                    />
                  </FilterButtonWrapper>
                </Flex>
              </FilterGroup>
              <FilterGroup>
                <Subheadings>Status</Subheadings>
                <Flex justify="spaceBetween">
                  <FilterButtonWrapper>
                    <ActionButton
                      type={
                        filterExists(
                          `${t('translation:buttons.action.buyNow')}`,
                        )
                          ? 'outline'
                          : 'secondary'
                      }
                      text={t('translation:buttons.action.buyNow')}
                      handleClick={() => {
                        if (statusFilter !== '') setStatusFilter('');
                        applyFilter(
                          'Status',
                          `${t('translation:buttons.action.buyNow')}`,
                        );
                      }}
                    />
                  </FilterButtonWrapper>
                  <Subtext margin="rightAndLeft" color="secondary">
                    or
                  </Subtext>
                  <FilterButtonWrapper>
                    <ActionButton
                      type={
                        filterExists(
                          `${t(
                            'translation:buttons.action.hasOffers',
                          )}`,
                        )
                          ? 'outline'
                          : 'secondary'
                      }
                      text={t('translation:buttons.action.hasOffers')}
                      handleClick={() => {
                        if (statusFilter !== '') setStatusFilter('');
                        applyFilter(
                          'Status',
                          `${t(
                            'translation:buttons.action.hasOffers',
                          )}`,
                        );
                      }}
                    />
                  </FilterButtonWrapper>
                </Flex>
              </FilterGroup>
              <FilterGroup>
                <Subheadings>Price Range</Subheadings>
                <Flex justify="spaceBetween">
                  <FilterInput
                    placeholder={t(
                      'translation:inputField.placeholder.priceMin',
                    )}
                    inputValue={priceFilterValue.min}
                    setValue={(value) => {
                      setPriceFilterValue({
                        ...priceFilterValue,
                        min: value,
                      });
                      applyPriceFilter();
                    }}
                  />
                  <Subtext margin="rightAndLeft" color="secondary">
                    to
                  </Subtext>
                  <FilterInput
                    placeholder={t(
                      'translation:inputField.placeholder.priceMax',
                    )}
                    inputValue={priceFilterValue.max}
                    setValue={(value) => {
                      setPriceFilterValue({
                        ...priceFilterValue,
                        max: value,
                      });
                      applyPriceFilter();
                    }}
                  />
                </Flex>
                <br />
                {displayPriceApplyButton && (
                  <ActionButton
                    type="secondary"
                    text="Apply"
                    handleClick={() => {
                      if (priceFilterValue.min !== '0' && priceFilterValue.max !== '0') {
                        applyFilter('Price Range', priceFilterValue);
                      }
                      setPriceFilterValue({
                        min: '',
                        max: '',
                      });
                    }}
                  />
                )}
              </FilterGroup>
            </FilterSection>
            <Heading>Traits</Heading>
            <FilterSection>
              <CheckboxFilters>
                {/* TO-DO: Refactor */}
                {loadedFiltersList[0]?.map((checkboxData) => {
                  console.log('will be used for debugging');
                  return (
                    <CheckboxFilterAccordion
                      checkboxData={checkboxData}
                      id="small-gem"
                    />
                  );
                })}
              </CheckboxFilters>
            </FilterSection>
          </FiltersWrapper>
        </FiltersContainer>
      )}
    </Container>
  );
};
