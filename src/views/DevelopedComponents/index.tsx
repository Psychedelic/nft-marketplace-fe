import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Title, ComponentWrapper, ComponentTitle } from './styles';
import {
  SearchInput,
  FilterInput,
  ModalInput,
  ActionButton,
  LinkButton,
} from '../../components';
import discord from '../../assets/buttons/discord.svg';
import twitter from '../../assets/buttons/twitter.svg';
import back from '../../assets/buttons/back.svg';
import closeDrawer from '../../assets/buttons/close-drawer.svg';
import darkTheme from '../../assets/buttons/dark-theme.svg';

const DevelopedComponents = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Title>Developed Components</Title>
      <ComponentWrapper>
        <ComponentTitle>Link Buttons</ComponentTitle>
        <LinkButton outline="light" text="bold">
          Website
        </LinkButton>
        &nbsp;
        <LinkButton outline="light" text="bold">
          <img src={discord} alt="discord" />
        </LinkButton>
        &nbsp;
        <LinkButton outline="light" text="bold">
          <img src={twitter} alt="twitter" />
        </LinkButton>
        &nbsp;
        <LinkButton outline="light" text="bold">
          <img src={back} alt="back" />
        </LinkButton>
        &nbsp;
        <LinkButton outline="light" text="bold">
          <img src={darkTheme} alt="dark-theme" />
        </LinkButton>
        &nbsp;
        <LinkButton outline="light" text="bold">
          <img src={closeDrawer} alt="close-tab" />
        </LinkButton>
      </ComponentWrapper>
      <ComponentWrapper>
        <ComponentTitle>Action Buttons</ComponentTitle>
        <ActionButton background="filled" text="bold">
          Buy NFTs
        </ActionButton>
        &nbsp;
        <ActionButton outline="solid" text="bold">
          All NFTs
        </ActionButton>
        &nbsp;
        <ActionButton outline="light" text="bold">
          Make Offer
        </ActionButton>
      </ComponentWrapper>
      <ComponentWrapper>
        <ComponentTitle>Connect To Plug</ComponentTitle>
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
