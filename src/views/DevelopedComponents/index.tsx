import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Title, ComponentWrapper, ComponentTitle } from './styles';
import {
  ActionButton,
  SearchInput,
  FilterInput,
  ModalInput,
  FilteredCountChip,
  FilteredTraitsChip,
  NFTTraitsChip,
} from '../../components';

const DevelopedComponents = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Title>Developed Components</Title>
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
      <ComponentWrapper>
        <ComponentTitle>FilteredCountChip</ComponentTitle>
        <FilteredCountChip />
      </ComponentWrapper>
      <ComponentWrapper>
        <ComponentTitle>FilteredTraitsChip</ComponentTitle>
        <FilteredTraitsChip />
      </ComponentWrapper>
      <ComponentWrapper>
        <ComponentTitle>NFTTraitsChip</ComponentTitle>
        <NFTTraitsChip />
      </ComponentWrapper>
    </Container>
  );
};

export default DevelopedComponents;
