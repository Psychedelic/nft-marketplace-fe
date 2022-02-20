import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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

export const Filters = () => {
  const { t } = useTranslation();

  const [theme, setTheme] = useState('lightTheme');

  useEffect(() => {
    const getTheme = localStorage.getItem('theme');
    setTheme(getTheme);
  });

  const [filtersOpened, setFiltersOpened] = useState<boolean>(false);
  // eslint-disable-next-line
  const [displayFilter, setDisplayFilter] =
    useState<string>('allNfts');
  const [statusFilter, setStatusFilter] = useState<string>('');

  const closeFiltersIconTheme = theme === 'lightTheme' ? closeFiltersIcon : closeFiltersIconDark;
  const openFiltersIconTheme = theme === 'lightTheme' ? openFiltersIcon : openFiltersIconDark;

  return (
    <Container>
      <CloseFilterContainer opened={!filtersOpened}>
        <IconActionButton
          handleClick={() => {
            setFiltersOpened(!filtersOpened);
          }}
        >
          <img
            src={filtersOpened ? closeFiltersIconTheme : openFiltersIconTheme}
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
                  setDisplayFilter('allNfts');
                }}
              >
                Clear All
              </ClearButton>
            </Flex>
            <FilterSection>
              <FilterGroup>
                <Subheadings>Display</Subheadings>
                <Flex justify="spaceBetween">
                  <FilterButtonWrapper>
                    <ActionButton
                      type={
                        displayFilter === 'allNfts'
                          ? 'outline'
                          : 'secondary'
                      }
                      text={t('translation:buttons.action.allNfts')}
                      handleClick={() => {
                        setDisplayFilter('allNfts');
                      }}
                    />
                  </FilterButtonWrapper>

                  <Subtext margin="rightAndLeft" color="secondary">
                    or
                  </Subtext>
                  <FilterButtonWrapper>
                    <ActionButton
                      type={
                        displayFilter === 'myNfts'
                          ? 'outline'
                          : 'secondary'
                      }
                      text={t('translation:buttons.action.myNfts')}
                      handleClick={() => {
                        setDisplayFilter('myNfts');
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
                        statusFilter === 'buyNow'
                          ? 'outline'
                          : 'secondary'
                      }
                      text={t('translation:buttons.action.buyNow')}
                      handleClick={() => {
                        if (statusFilter === 'buyNow') {
                          setStatusFilter('');
                        } else {
                          setStatusFilter('buyNow');
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
                        statusFilter === 'hasOffers'
                          ? 'outline'
                          : 'secondary'
                      }
                      text={t('translation:buttons.action.hasOffers')}
                      handleClick={() => {
                        if (statusFilter === 'hasOffers') {
                          setStatusFilter('');
                        } else {
                          setStatusFilter('hasOffers');
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
