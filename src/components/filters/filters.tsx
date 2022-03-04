import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useFilterStore,
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
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [filtersOpened, setFiltersOpened] = useState<boolean>(true);
  // eslint-disable-next-line
  const [displayFilter, setDisplayFilter] =
    useState<string>('All Nfts');

  const [theme, setTheme] = useState('lightTheme');

  useEffect(() => {
    const getTheme = localStorage.getItem('theme');
    if (getTheme) {
      setTheme(getTheme);
    }
  });

  const closeFiltersIconTheme = theme === 'lightTheme' ? closeFiltersIcon : closeFiltersIconDark;
  const openFiltersIconTheme = theme === 'lightTheme' ? openFiltersIcon : openFiltersIconDark;

  const applyFilter = (
    filterCategory: string,
    filterName: string,
  ) => {
    const filterCategoryExists = appliedFilters.some(
      (appliedFilter) => appliedFilter.filterCategory === filterCategory,
    );

    const filterNameExists = appliedFilters.some(
      (appliedFilter) => appliedFilter.filterName === filterName,
    );

    switch (true) {
      case filterCategoryExists && filterNameExists:
        dispatch(filterActions.removeFilter(filterName));
        console.log('this filter has already been applied');
        break;
      case filterCategoryExists && !filterNameExists:
        // eslint-disable-next-line
        filterCategory === 'Status' && setStatusFilter(filterName);
        // eslint-disable-next-line
        filterCategory === 'Display' && setDisplayFilter(filterName);
        dispatch(
          filterActions.updateFilter({
            filterCategory,
            filterName,
          }),
        );
        break;
      default:
        // eslint-disable-next-line
        filterCategory === 'Status' && setStatusFilter(filterName);
        // eslint-disable-next-line
        filterCategory === 'Display' && setDisplayFilter(filterName);
        dispatch(
          filterActions.applyFilter({
            filterName,
            filterCategory,
          }),
        );
        break;
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
                  setDisplayFilter('All Nfts');
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
                        displayFilter === 'All Nfts'
                          ? 'outline'
                          : 'secondary'
                      }
                      text={t('translation:buttons.action.allNfts')}
                      handleClick={() => {
                        setDisplayFilter('All Nfts');
                      }}
                    />
                  </FilterButtonWrapper>
                  <Subtext margin="rightAndLeft" color="secondary">
                    or
                  </Subtext>
                  <FilterButtonWrapper>
                    <ActionButton
                      type={
                        displayFilter === 'My Nfts'
                          ? 'outline'
                          : 'secondary'
                      }
                      text={t('translation:buttons.action.myNfts')}
                      handleClick={() => {
                        // eslint-disable-next-line
                        displayFilter !== '' && setDisplayFilter('');
                        applyFilter('Display', 'My Nfts');
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
                        statusFilter === 'Buy Now'
                          ? 'outline'
                          : 'secondary'
                      }
                      text={t('translation:buttons.action.buyNow')}
                      handleClick={() => {
                        // eslint-disable-next-line
                        statusFilter !== '' && setStatusFilter('');
                        applyFilter('Status', 'Buy Now');
                      }}
                    />
                  </FilterButtonWrapper>
                  <Subtext margin="rightAndLeft" color="secondary">
                    or
                  </Subtext>
                  <FilterButtonWrapper>
                    <ActionButton
                      type={
                        statusFilter === 'Has Offers'
                          ? 'outline'
                          : 'secondary'
                      }
                      text={t('translation:buttons.action.hasOffers')}
                      handleClick={() => {
                        // eslint-disable-next-line
                        statusFilter !== '' && setStatusFilter('');
                        applyFilter('Status', 'Has Offers');
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
                  />
                  <Subtext margin="rightAndLeft" color="secondary">
                    or
                  </Subtext>
                  <FilterInput
                    placeholder={t(
                      'translation:inputField.placeholder.priceMax',
                    )}
                  />
                </Flex>
              </FilterGroup>
            </FilterSection>
            <Heading>Traits</Heading>
            <FilterSection>
              <CheckboxFilters>
                <CheckboxFilterAccordion
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
