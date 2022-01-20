import React from 'react';
import { Container, Title, ComponentWrapper, ComponentTitle } from './styles';
import { ActionButton, SearchInput } from '../../components';

const DevelopedComponents = () => (
  <Container>
    <Title>Developed Components</Title>
    <ComponentWrapper>
      <ComponentTitle>Buttons:</ComponentTitle>
      <ActionButton />
    </ComponentWrapper>
    <ComponentWrapper>
      <ComponentTitle>Input Field Set:</ComponentTitle>
      <SearchInput />
    </ComponentWrapper>
  </Container>
);

export default DevelopedComponents;
