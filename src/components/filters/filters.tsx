import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useFilterStore,
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
  CollapseIcon,
} from './styles';
import CheckboxAccordionSkeleton from '../core/accordions/checkbox-accordion-skeleton';

/* --------------------------------------------------------------------------
 * Filters Component
 * --------------------------------------------------------------------------*/

export const Filters = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const {
    defaultFilters,
    loadedFiltersList,
    status,
    loadingFilterList,
    isMyNfts,
    isAlreadyFetched,
  } = useFilterStore();
  const { collapsed, displayPriceApplyButton } = useSettingsStore();
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [priceFilterValue, setPriceFilterValue] = useState({
    min: '',
    max: '',
  });
  const myNfts = `${t('translation:buttons.action.myNfts')}`;

  useEffect(() => {
    if (!isAlreadyFetched) {
      dispatch(filterActions.getFilterTraits());
    }
  }, [dispatch, isAlreadyFetched]);

  useEffect(() => {
    if (!displayPriceApplyButton) {
      setPriceFilterValue({
        min: '',
        max: '',
      });
    }
  }, [displayPriceApplyButton]);

  const filterExists = (filterName: string) =>
    defaultFilters.some(
      (appliedFilter) => appliedFilter.filterName === filterName,
    );

  const applyFilter = (filterCategory: string, filterName: any) => {
    const filterCategoryExists = defaultFilters.some(
      (appliedFilter) =>
        appliedFilter.filterCategory === filterCategory,
    );

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

  const applyPriceFilter = (value: string, isMax: boolean) => {
    const key = isMax ? 'max' : 'min';
    const altKey = isMax ? 'min' : 'max';
    if (value === '' && priceFilterValue[altKey] === '') {
      dispatch(settingsActions.setPriceApplyButton(false));
    } else {
      dispatch(settingsActions.setPriceApplyButton(true));
    }
    setPriceFilterValue((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handlePriceFilter = () => {
    if (priceFilterValue.min === '' && priceFilterValue.max === '') {
      dispatch(
        filterActions.removePriceFilter(
          `${t('translation:filters.priceRange')}`,
        ),
      );
    }
    if (priceFilterValue.max === '') {
      dispatch(
        notificationActions.setErrorMessage(
          `${t('translation:errorMessages.priceEmptyField')}`,
        ),
      );
    }
    if (priceFilterValue.min === '' && priceFilterValue.max !== '') {
      setPriceFilterValue((prevState) => ({
        ...prevState,
        min: '0',
      }));
      applyFilter(`${t('translation:filters.priceRange')}`, {
        ...priceFilterValue,
        min: '0',
      });
    }
    // eslint-disable-next-line no-lonely-if
    if (priceFilterValue.min !== '' && priceFilterValue.max !== '') {
      applyFilter(
        `${t('translation:filters.priceRange')}`,
        priceFilterValue,
      );
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
          <CollapseIcon icon="arrow-left" rotate={!collapsed} />
        </IconActionButton>
      </CloseFilterContainer>
      {collapsed && (
        <FiltersContainer>
          <FiltersWrapper>
            <Flex>
              <Heading>Filters</Heading>
              {defaultFilters.length ? (
                <ClearButton
                  onClick={() => {
                    dispatch(filterActions.clearAllFilters());
                    dispatch(
                      settingsActions.setPriceApplyButton(false),
                    );
                    dispatch(filterActions.setMyNfts(false));
                    setPriceFilterValue({
                      min: '',
                      max: '',
                    });
                  }}
                >
                  {`${t('translation:filters.clearAll')}`}
                </ClearButton>
              ) : (
                ''
              )}
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
                      onClick={() => {
                        dispatch(filterActions.removeFilter(myNfts));
                        dispatch(filterActions.setMyNfts(false));
                      }}
                    >
                      {t('translation:buttons.action.allNfts')}
                    </ActionButton>
                  </FilterButtonWrapper>
                  <Subtext margin="rightAndLeft" color="secondary">
                    or
                  </Subtext>
                  <FilterButtonWrapper>
                    <ActionButton
                      type={
                        filterExists(myNfts) ? 'outline' : 'secondary'
                      }
                      onClick={() => {
                        applyFilter('Display', myNfts);
                        dispatch(filterActions.setMyNfts(!isMyNfts));
                      }}
                    >
                      {t('translation:buttons.action.myNfts')}
                    </ActionButton>
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
                      onClick={() => {
                        if (statusFilter !== '') setStatusFilter('');
                        applyFilter(
                          'Status',
                          `${t('translation:buttons.action.buyNow')}`,
                        );
                        if (
                          status !==
                          `${t('translation:filters.forSale')}`
                        ) {
                          dispatch(
                            filterActions.setStatusFilter(
                              `${t('translation:filters.forSale')}`,
                            ),
                          );
                        } else {
                          dispatch(filterActions.setStatusFilter(''));
                        }
                      }}
                    >
                      {t('translation:buttons.action.buyNow')}
                    </ActionButton>
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
                      onClick={() => {
                        if (statusFilter !== '') setStatusFilter('');
                        applyFilter(
                          'Status',
                          `${t(
                            'translation:buttons.action.hasOffers',
                          )}`,
                        );
                        if (
                          status !==
                          `${t('translation:filters.forOffer')}`
                        ) {
                          dispatch(
                            filterActions.setStatusFilter(
                              `${t('translation:filters.forOffer')}`,
                            ),
                          );
                        } else {
                          dispatch(filterActions.setStatusFilter(''));
                        }
                      }}
                    >
                      {t('translation:buttons.action.hasOffers')}
                    </ActionButton>
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
                      applyPriceFilter(value, false);
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
                      applyPriceFilter(value, true);
                    }}
                  />
                </Flex>
                <br />
                {displayPriceApplyButton && (
                  <ActionButton
                    type="secondary"
                    onClick={handlePriceFilter}
                  >
                    {t('translation:buttons.action.apply')}
                  </ActionButton>
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
                  (loadedFiltersList[0] as any)?.map(
                    (checkboxData: any) => (
                      <CheckboxFilterAccordion
                        key={checkboxData.name}
                        checkboxData={checkboxData}
                        id={checkboxData.name}
                      />
                    ),
                  )
                )}
              </CheckboxFilters>
            </FilterSection>
          </FiltersWrapper>
        </FiltersContainer>
      )}
    </Container>
  );
};
