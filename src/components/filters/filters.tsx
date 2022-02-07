import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActionButton,
  CheckboxFilterAccordion,
  FilterInput,
  LinkButton,
} from '../core';
import {
  Container,
  Flex,
  Heading,
  Subtext,
  Subheadings,
  CheckboxFilters,
} from './styles';
import closeFilters from '../../assets/buttons/close-filters.svg';

export const Filters = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Flex>
        <Heading>Filters</Heading>
        <Subtext margin="left">Clear All</Subtext>
        <LinkButton>
          <img src={closeFilters} alt="close-tab" />
        </LinkButton>
      </Flex>
      <div>
        <Subheadings>Display</Subheadings>
        <Flex justify="spaceBetween">
          <ActionButton
            type="outline"
            text={t('translation:buttons.action.allNfts')}
            handleClick={() => {
              // eslint-disable-next-line no-console
              console.log('callback');
            }}
          />
          <Subtext margin="rightAndLeft" color="secondary">
            or
          </Subtext>
          <ActionButton
            type="secondary"
            text={t('translation:buttons.action.myNfts')}
            handleClick={() => {
              // eslint-disable-next-line no-console
              console.log('callback');
            }}
          />
        </Flex>
      </div>
      <div>
        <Subheadings>Status</Subheadings>
        <Flex justify="spaceBetween">
          <ActionButton
            type="secondary"
            text={t('translation:buttons.action.buyNow')}
            handleClick={() => {
              // eslint-disable-next-line no-console
              console.log('callback');
            }}
          />
          <Subtext margin="rightAndLeft" color="secondary">
            or
          </Subtext>
          <ActionButton
            type="secondary"
            text={t('translation:buttons.action.hasOffers')}
            handleClick={() => {
              // eslint-disable-next-line no-console
              console.log('callback');
            }}
          />
        </Flex>
      </div>
      <div>
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
      </div>
      <Heading>Traits</Heading>
      <CheckboxFilters>
        <CheckboxFilterAccordion
          title={`${t(
            'translation:accordions.checkbox.smallGem.smallGem',
          )}`}
        />
      </CheckboxFilters>
      <CheckboxFilters>
        <CheckboxFilterAccordion
          title={`${t(
            'translation:accordions.checkbox.bigGem.bigGem',
          )}`}
        />
      </CheckboxFilters>
      <CheckboxFilters>
        <CheckboxFilterAccordion
          title={`${t('translation:accordions.checkbox.base.base')}`}
        />
      </CheckboxFilters>
      <CheckboxFilters>
        <CheckboxFilterAccordion
          title={`${t('translation:accordions.checkbox.rim.rim')}`}
        />
      </CheckboxFilters>
    </Container>
  );
};
