import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { triggerWindowResizeEvent } from '../../utils/window';
import {
  useFilterStore,
  filterActions,
  useAppDispatch,
  settingsActions,
  useSettingsStore,
  notificationActions,
  nftsActions,
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
  FilterHeader,
  FilterMobileActions,
  ButtonWrapper,
  CloseIcon,
} from './styles';
import CheckboxAccordionSkeleton from '../core/accordions/checkbox-accordion-skeleton';
import useMediaQuery from '../../hooks/use-media-query';

/* --------------------------------------------------------------------------
 * Filters Component
 * --------------------------------------------------------------------------*/

type FiltersProps = {
  setIsOpenFiltersMenu?: (value: boolean) => void;
  isOpenFiltersMenu?: boolean;
};

export const Filters = ({
  setIsOpenFiltersMenu,
  isOpenFiltersMenu,
}: FiltersProps) => {
  const { t } = useTranslation();
  const { collectionId } = useParams();
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
  const isMobileScreen = useMediaQuery('(max-width: 850px)');

  useEffect(() => {
    if (!isAlreadyFetched) {
      if (!collectionId) return;

      dispatch(filterActions.getFilterTraits({ collectionId }));
    }
  }, [dispatch, isAlreadyFetched, collectionId]);

  useEffect(() => {
    if (!displayPriceApplyButton) {
      setPriceFilterValue({
        min: '',
        max: '',
      });
    }
  }, [displayPriceApplyButton]);

  useEffect(() => {
    // Triggering the resize event twice
    // is intentional, as required by list view
    // virtualized list when the filter returns from collapsed
    triggerWindowResizeEvent();
    // The second resize call is only required when NOT collapsed
    // this is when going from collapse to NOT collapsed
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !collapsed && triggerWindowResizeEvent();
  }, [collapsed]);

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
        dispatch(nftsActions.setLastIndex(undefined));
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
    if (
      (value === '' && priceFilterValue[altKey] === '') ||
      Number(value) < 0
    ) {
      dispatch(settingsActions.setPriceApplyButton(false));
    } else if (value === '' || Number(value) < 0) {
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

      return;
    }

    if (priceFilterValue.max === '') {
      dispatch(
        notificationActions.setErrorMessage(
          `${t('translation:errorMessages.priceEmptyField')}`,
        ),
      );

      return;
    }

    if (Number(priceFilterValue.min) > Number(priceFilterValue.max)) {
      dispatch(
        notificationActions.setErrorMessage(
          `${t(
            'translation:errorMessages.priceMinShouldBeLessThanMax',
          )}`,
        ),
      );

      return;
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

      return;
    }

    if (priceFilterValue.min !== '' && priceFilterValue.max !== '') {
      applyFilter(
        `${t('translation:filters.priceRange')}`,
        priceFilterValue,
      );
    }
  };

  const clearAll = () => {
    dispatch(filterActions.clearAllFilters());
    dispatch(settingsActions.setPriceApplyButton(false));
    dispatch(filterActions.setMyNfts(false));
    setPriceFilterValue({
      min: '',
      max: '',
    });
  };

  return (
    <Container>
      {!isMobileScreen && (
        <CloseFilterContainer opened={collapsed}>
          <IconActionButton
            handleClick={() => {
              dispatch(
                settingsActions.setFilterCollapsed(!collapsed),
              );
            }}
          >
            <CollapseIcon
              icon="arrow-left"
              rotate={collapsed}
              opened={collapsed}
            />
          </IconActionButton>
        </CloseFilterContainer>
      )}
      {!collapsed && (
        <FiltersContainer isOpenFiltersMenu={isOpenFiltersMenu}>
          <FilterHeader>
            <Heading>Filters</Heading>
            {isMobileScreen ? (
              <CloseIcon
                icon="close"
                size="lg"
                onClick={() =>
                  setIsOpenFiltersMenu && setIsOpenFiltersMenu(false)
                }
              />
            ) : (
              (defaultFilters.length && (
                <ClearButton onClick={clearAll}>
                  {`${t('translation:filters.clearAll')}`}
                </ClearButton>
              )) ||
              null
            )}
          </FilterHeader>
          <FiltersWrapper>
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
                        dispatch(nftsActions.setLastIndex(undefined));
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
              {!isMyNfts && (
                <>
                  <FilterGroup>
                    <Subheadings>Status</Subheadings>
                    <Flex justify="spaceBetween">
                      <FilterButtonWrapper>
                        <ActionButton
                          type={
                            filterExists(
                              `${t(
                                'translation:buttons.action.buyNow',
                              )}`,
                            )
                              ? 'outline'
                              : 'secondary'
                          }
                          onClick={() => {
                            if (statusFilter !== '')
                              setStatusFilter('');
                            applyFilter(
                              'Status',
                              `${t(
                                'translation:buttons.action.buyNow',
                              )}`,
                            );
                            if (
                              status !==
                              `${t('translation:filters.forSale')}`
                            ) {
                              dispatch(
                                filterActions.setStatusFilter(
                                  `${t(
                                    'translation:filters.forSale',
                                  )}`,
                                ),
                              );
                            } else {
                              dispatch(
                                filterActions.setStatusFilter(''),
                              );
                            }
                          }}
                        >
                          {t('translation:buttons.action.buyNow')}
                        </ActionButton>
                      </FilterButtonWrapper>
                      <Subtext
                        margin="rightAndLeft"
                        color="secondary"
                      >
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
                            if (statusFilter !== '')
                              setStatusFilter('');
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
                                  `${t(
                                    'translation:filters.forOffer',
                                  )}`,
                                ),
                              );
                            } else {
                              dispatch(
                                filterActions.setStatusFilter(''),
                              );
                            }
                          }}
                        >
                          {t('translation:buttons.action.hasOffers')}
                        </ActionButton>
                      </FilterButtonWrapper>
                    </Flex>
                  </FilterGroup>
                  {Boolean(status.length) && (
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
                        <Subtext
                          margin="rightAndLeft"
                          color="secondary"
                        >
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
                  )}
                </>
              )}
            </FilterSection>
            {!isMyNfts && (
              <>
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
                            id={checkboxData.key}
                          />
                        ),
                      )
                    )}
                  </CheckboxFilters>
                </FilterSection>
              </>
            )}
          </FiltersWrapper>
          {isMobileScreen && (
            <FilterMobileActions>
              <ButtonWrapper>
                <ActionButton
                  type="secondary"
                  size="wide"
                  onClick={clearAll}
                >
                  Clear All
                </ActionButton>
              </ButtonWrapper>
              <ButtonWrapper>
                <ActionButton
                  type="primary"
                  size="wide"
                  onClick={() =>
                    setIsOpenFiltersMenu &&
                    setIsOpenFiltersMenu(false)
                  }
                >
                  Done
                </ActionButton>
              </ButtonWrapper>
            </FilterMobileActions>
          )}
        </FiltersContainer>
      )}
    </Container>
  );
};
