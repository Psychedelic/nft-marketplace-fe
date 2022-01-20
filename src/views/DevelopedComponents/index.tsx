import React from 'react';
import { Container, Title, ComponentWrapper, ComponentTitle } from './styles';
import {
  ActionButton,
  SearchInput,
  FilterInput,
  ModalInput,
} from '../../components';

const DevelopedComponents = () => (
  <Container>
    <Title>Developed Components</Title>
    <ComponentWrapper>
      <ComponentTitle>Buttons</ComponentTitle>
      <ActionButton />
    </ComponentWrapper>
    <ComponentWrapper>
      <ComponentTitle>SearchInput</ComponentTitle>
      <SearchInput />
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

export default DevelopedComponents;
