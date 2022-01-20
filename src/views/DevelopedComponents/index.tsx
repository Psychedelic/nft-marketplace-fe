import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Title, ComponentWrapper, ComponentTitle } from './styles';
import {
  ActionButton,
  SearchInput,
  FilterInput,
  ModalInput,
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
        <FilterInput />
      </ComponentWrapper>
      <ComponentWrapper>
        <ComponentTitle>ModalInput</ComponentTitle>
        <ModalInput />
      </ComponentWrapper>
    </Container>
  );
};

export default DevelopedComponents;
