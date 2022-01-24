import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Title, ComponentWrapper, ComponentTitle } from './styles';
import {
  ActionButton,
  SearchInput,
  FilterInput,
  ModalInput,
  PriceFilter,
} from '../../components';

const DevelopedComponents = () => {
  const { t } = useTranslation();

  // dropdown content
  const dropDownContent = [
    `${t('translation:dropdown.priceFilter.recentlyListed')}`,
    `${t('translation:dropdown.priceFilter.recentlySold')}`,
    `${t('translation:dropdown.priceFilter.lowToHigh')}`,
    `${t('translation:dropdown.priceFilter.highToHigh')}`,
    `${t('translation:dropdown.priceFilter.highestLastSale')}`,
  ];

  return (
    <Container>
      <Title>Developed Components</Title>
      <ComponentWrapper>
        <ComponentTitle>Dropdown</ComponentTitle>
        <PriceFilter
          trigger={`${t('translation:dropdown.priceFilter.lowToHigh')}`}
          options={dropDownContent}
        />
      </ComponentWrapper>
      <ComponentWrapper>
        <ComponentTitle>Buttons</ComponentTitle>
        <ActionButton />
      </ComponentWrapper>
      <ComponentWrapper>
        <ComponentTitle>SearchInput</ComponentTitle>
        <SearchInput
          placeholder={t('translation:inputField.placeholder.searchCollection')}
        />
      </ComponentWrapper>
      <ComponentWrapper>
        <ComponentTitle>FilterInput</ComponentTitle>
        <FilterInput
          placeholder={t('translation:inputField.placeholder.priceMin')}
        />
      </ComponentWrapper>
      <ComponentWrapper>
        <ComponentTitle>ModalInput</ComponentTitle>
        <ModalInput
          placeholder={t('translation:inputField.placeholder.amount')}
        />
      </ComponentWrapper>
    </Container>
  );
};

export default DevelopedComponents;
