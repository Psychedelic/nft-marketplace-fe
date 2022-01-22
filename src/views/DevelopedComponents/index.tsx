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
    'Recently Listed',
    'Recently Sold',
    'Price: Low to High',
    'Price: High to High',
    'Highest Last Sale',
  ];

  return (
    <Container>
      <Title>Developed Components</Title>
      <ComponentWrapper>
        <ComponentTitle>Dropdown</ComponentTitle>
        <PriceFilter trigger="Price: Low to High" content={dropDownContent} />
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
