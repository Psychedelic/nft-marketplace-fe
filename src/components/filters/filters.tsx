import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchFilterTraits } from '../../integrations/kyasshu/utils';
import {
  useFilterStore,
  useThemeStore,
  filterActions,
  useAppDispatch,
  settingsActions,
  useSettingsStore,
  notificationActions,
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
import CheckboxAccordionSkeleton from '../core/accordions/checkbox-accordion-skeleton';

/* --------------------------------------------------------------------------
 * Filters Component
 * --------------------------------------------------------------------------*/

export const Filters = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { defaultFilters, loadedFiltersList, status, loadingFilterList } = useFilterStore();
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

  useEffect(() => {
    fetchFilterTraits({
      dispatch,
    });
  }, []);

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

  const handlePriceFilter = () => {
    if (priceFilterValue.min === '' && priceFilterValue.max === '') {
      dispatch(filterActions.removePriceFilter(`${t('translation:filters.priceRange')}`));
    } else if (priceFilterValue.min === '' || priceFilterValue.max === '') {
      dispatch(notificationActions.setErrorMessage(`${t('translation:errorMessages.priceEmptyField')}`));
    } else {
      // eslint-disable-next-line no-lonely-if
      if (priceFilterValue.min !== '0' && priceFilterValue.max !== '0') {
        applyFilter(`${t('translation:filters.priceRange')}`, priceFilterValue);
      }
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
              {defaultFilters.length
                ? (
                  <ClearButton
                    onClick={() => {
                      dispatch(filterActions.clearAllFilters());
                      dispatch(settingsActions.setPriceApplyButton(false));
                      dispatch(filterActions.setMyNfts(false));
                    }}
                  >
                    {`${t('translation:filters.clearAll')}`}
                  </ClearButton>
                ) : ''}
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
                        if (status !== `${t('translation:filters.forSale')}`) {
                          dispatch(filterActions.setStatusFilter(`${t('translation:filters.forSale')}`));
                        } else {
                          dispatch(filterActions.setStatusFilter(''));
                        }
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
                        if (status !== `${t('translation:filters.forOffer')}`) {
                          dispatch(filterActions.setStatusFilter(`${t('translation:filters.forOffer')}`));
                        } else {
                          dispatch(filterActions.setStatusFilter(''));
                        }
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
                    handleClick={handlePriceFilter}
                  />
                )}
              </FilterGroup>
            </FilterSection>
            <Heading>Traits</Heading>
            <FilterSection>
              <CheckboxFilters>
                {/* TO-DO: Refactor */}
                {loadingFilterList ? (
                  <CheckboxAccordionSkeleton />
                ) : (
                  loadedFiltersList[0]?.map((checkboxData) => (
                    <CheckboxFilterAccordion
                      checkboxData={checkboxData}
                      id={checkboxData.name}
                    />
                  ))
                )}
              </CheckboxFilters>
            </FilterSection>
          </FiltersWrapper>
        </FiltersContainer>
      )}
    </Container>
  );
};
