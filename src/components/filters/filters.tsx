import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useFilterStore,
  useThemeStore,
  filterActions,
  useAppDispatch,
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

/* --------------------------------------------------------------------------
 * Filters Component
 * --------------------------------------------------------------------------*/

// check if category has been selected with different filter name = update filter name
// check if category and filter name has been selected = removed chip

export const Filters = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const appliedFilters = useFilterStore();
  const { theme } = useThemeStore();
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [filtersOpened, setFiltersOpened] = useState<boolean>(true);
  const [priceFilterValue, setPriceFilterValue] = useState<object>({
    min: 0,
    max: 0,
  });
  const [displayButton, setDisplayButton] = useState<boolean>(false);
  const allNfts = `${t('translation:buttons.action.allNfts')}`;
  // eslint-disable-next-line
  const [displayFilter, setDisplayFilter] =
    useState<string>(allNfts);
  const isLightTheme = theme === 'lightTheme';

  const closeFiltersIconTheme = isLightTheme ? closeFiltersIcon : closeFiltersIconDark;
  const openFiltersIconTheme = isLightTheme ? openFiltersIcon : openFiltersIconDark;

  const filterExists = (filterName: string) => appliedFilters.some(
    (appliedFilter) => appliedFilter.filterName === filterName,
  );

  const applyFilter = (
    filterCategory: string,
    filterName: any,
  ) => {
    const filterCategoryExists = appliedFilters.some(
      (appliedFilter) => appliedFilter.filterCategory === filterCategory,
    );

    const filterNameExists = appliedFilters.some(
      (appliedFilter) => appliedFilter.filterName === filterName,
    );

    const selectStatusFilter = filterCategory === 'Status' && setStatusFilter(filterName);
    // eslint-disable-next-line
    const selectDisplayFilter = filterCategory === 'Display' && setDisplayFilter(filterName);

    switch (true) {
      case filterCategoryExists && filterNameExists:
        dispatch(filterActions.removeFilter(filterName));
        break;
      case filterCategoryExists && !filterNameExists:
        // eslint-disable-next-line
        selectStatusFilter;
        // eslint-disable-next-line
        selectDisplayFilter;
        dispatch(
          filterActions.updateFilter({
            filterCategory,
            filterName,
          }),
        );
        break;
      default:
        // eslint-disable-next-line
        selectStatusFilter;
        // eslint-disable-next-line
        selectDisplayFilter;
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
    if (priceFilterValue.min.length && priceFilterValue.max.length) {
      setDisplayButton(true);
    } else {
      setDisplayButton(false);
    }
  };

  return (
    <Container>
      <CloseFilterContainer opened={!filtersOpened}>
        <IconActionButton
          handleClick={() => {
            setFiltersOpened(!filtersOpened);
          }}
        >
          <img
            src={
              filtersOpened
                ? closeFiltersIconTheme
                : openFiltersIconTheme
            }
            alt="filter-icon"
          />
        </IconActionButton>
      </CloseFilterContainer>
      {filtersOpened && (
        <FiltersContainer>
          <FiltersWrapper>
            <Flex>
              <Heading>Filters</Heading>
              <ClearButton
                onClick={() => {
                  setStatusFilter('');
                  setDisplayFilter(allNfts);
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
                        displayFilter === allNfts
                          ? 'outline'
                          : 'secondary'
                      }
                      text={t('translation:buttons.action.allNfts')}
                      handleClick={() => {
                        setDisplayFilter(allNfts);
                        dispatch(filterActions.removeFilter(allNfts));
                      }}
                    />
                  </FilterButtonWrapper>
                  <Subtext margin="rightAndLeft" color="secondary">
                    or
                  </Subtext>
                  <FilterButtonWrapper>
                    <ActionButton
                      type={
                        filterExists(`${t('translation:buttons.action.myNfts')}`)
                          ? 'outline'
                          : 'secondary'
                      }
                      text={t('translation:buttons.action.myNfts')}
                      handleClick={() => {
                        // eslint-disable-next-line
                        displayFilter !== '' && setDisplayFilter('');
                        applyFilter('Display', `${t('translation:buttons.action.myNfts')}`);
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
                        filterExists(`${t('translation:buttons.action.buyNow')}`)
                          ? 'outline'
                          : 'secondary'
                      }
                      text={t('translation:buttons.action.buyNow')}
                      handleClick={() => {
                        // eslint-disable-next-line
                        statusFilter !== '' && setStatusFilter('');
                        applyFilter('Status', `${t('translation:buttons.action.buyNow')}`);
                      }}
                    />
                  </FilterButtonWrapper>
                  <Subtext margin="rightAndLeft" color="secondary">
                    or
                  </Subtext>
                  <FilterButtonWrapper>
                    <ActionButton
                      type={
                        filterExists(`${t('translation:buttons.action.hasOffers')}`)
                          ? 'outline'
                          : 'secondary'
                      }
                      text={t('translation:buttons.action.hasOffers')}
                      handleClick={() => {
                        // eslint-disable-next-line
                        statusFilter !== '' && setStatusFilter('');
                        applyFilter('Status', `${t('translation:buttons.action.hasOffers')}`);
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
                {displayButton
                && (
                  <ActionButton
                    type="secondary"
                    text="Apply"
                    handleClick={() => {
                      applyFilter('Price Range', priceFilterValue);
                    }}
                  />
                )}
              </FilterGroup>
            </FilterSection>
            <Heading>Traits</Heading>
            <FilterSection>
              <CheckboxFilters>
                <CheckboxFilterAccordion
                // we need the type of gem it is
                // we need the values selected
                // call apply filter
                  title={`${t(
                    'translation:accordions.checkbox.smallGem.smallGem',
                  )}`}
                  id="small-gem"
                />
              </CheckboxFilters>
              <CheckboxFilters>
                <CheckboxFilterAccordion
                  title={`${t(
                    'translation:accordions.checkbox.bigGem.bigGem',
                  )}`}
                  id="big-gem"
                />
              </CheckboxFilters>
              <CheckboxFilters>
                <CheckboxFilterAccordion
                  title={`${t(
                    'translation:accordions.checkbox.base.base',
                  )}`}
                  id="base"
                />
              </CheckboxFilters>
              <CheckboxFilters>
                <CheckboxFilterAccordion
                  title={`${t(
                    'translation:accordions.checkbox.rim.rim',
                  )}`}
                  id="rim"
                />
              </CheckboxFilters>
            </FilterSection>
          </FiltersWrapper>
        </FiltersContainer>
      )}
    </Container>
  );
};
