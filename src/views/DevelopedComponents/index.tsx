import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Title,
  ComponentWrapper,
  ComponentTitle,
  ComponentsList,
} from './styles';
import {
  SearchInput,
  FilterInput,
  ModalInput,
  ActionButton,
  LinkButton,
  PriceFilterDropdown,
  CardOptionsDropdown,
  PlugProfileDropdown,
  FilteredCountChip,
  FilteredTraitsChip,
  NFTTraitsChip,
  ActivityTable,
  NFTActivityTable,
  OffersTable,
  NftMetadata,
} from '../../components';
import discord from '../../assets/buttons/discord.svg';
import twitter from '../../assets/buttons/twitter.svg';
import back from '../../assets/buttons/back.svg';
import closeDrawer from '../../assets/buttons/close-drawer.svg';
import darkTheme from '../../assets/buttons/dark-theme.svg';

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
        <ComponentTitle>Nft Metadata</ComponentTitle>
        <NftMetadata />
      </ComponentWrapper>
      <ComponentWrapper>
        <ComponentTitle>Link Buttons</ComponentTitle>
        <LinkButton outline="light" text="bold">
          {t('translation:buttons.links.website')}
        </LinkButton>
        &nbsp;
        <LinkButton outline="light" text="bold">
          <img
            src={discord}
            alt={t('translation:buttons.links.discord')}
          />
        </LinkButton>
        &nbsp;
        <LinkButton outline="light" text="bold">
          <img
            src={twitter}
            alt={t('translation:buttons.links.twitter')}
          />
        </LinkButton>
        &nbsp;
        <LinkButton outline="light" text="bold">
          <img src={back} alt={t('translation:buttons.links.back')} />
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
          {t('translation:buttons.action.buyNfts')}
        </ActionButton>
        &nbsp;
        <ActionButton outline="solid" text="bold">
          {t('translation:buttons.action.allNfts')}
        </ActionButton>
        &nbsp;
        <ActionButton background="filled" text="bold">
          {t('translation:buttons.action.buyNow')}
        </ActionButton>
        &nbsp;
        <ActionButton outline="light" text="bold">
          {t('translation:buttons.action.makeOffer')}
        </ActionButton>
      </ComponentWrapper>
      <ComponentWrapper>
        <ComponentTitle>Dropdown</ComponentTitle>
        <PriceFilterDropdown
          defaultValue={`${t(
            'translation:dropdown.priceFilter.lowToHigh',
          )}`}
          options={dropDownContent}
        />
        <br />
        <CardOptionsDropdown />
      </ComponentWrapper>
      <ComponentWrapper>
        <ComponentTitle>Plug Dropdown Button</ComponentTitle>
        <PlugProfileDropdown />
      </ComponentWrapper>
      <ComponentWrapper>
        <ComponentTitle>SearchInput</ComponentTitle>
        <SearchInput
          placeholder={t(
            'translation:inputField.placeholder.searchCollection',
          )}
        />
      </ComponentWrapper>
      <ComponentWrapper>
        <ComponentTitle>FilterInput</ComponentTitle>
        <FilterInput
          placeholder={t(
            'translation:inputField.placeholder.priceMin',
          )}
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
        <ComponentsList>
          <FilteredCountChip
            label={t('translation:chips.labels.itemsLabel')}
            count="10.0k"
            showLogo={false}
          />
          <FilteredCountChip
            label={t('translation:chips.labels.OwnersLabel')}
            count="5.9k"
            showLogo={false}
          />
          <FilteredCountChip
            label={t('translation:chips.labels.FloorPriceLabel')}
            count="22.12"
            showLogo
          />
        </ComponentsList>
      </ComponentWrapper>
      <ComponentWrapper>
        <ComponentTitle>FilteredTraitsChip</ComponentTitle>
        <ComponentsList>
          <FilteredTraitsChip
            name="Red"
            rim="Big Gem"
            removeFilter={() => {
              // eslint-disable-next-line no-console
              console.log('callback');
            }}
          />
          <FilteredTraitsChip
            name="Crystal"
            rim="Big Gem"
            removeFilter={() => {
              // eslint-disable-next-line no-console
              console.log('callback');
            }}
          />
          <FilteredTraitsChip
            name="Psychedelic"
            rim="Rim"
            removeFilter={() => {
              // eslint-disable-next-line no-console
              console.log('callback');
            }}
          />
        </ComponentsList>
      </ComponentWrapper>
      <ComponentWrapper>
        <ComponentTitle>NFTTraitsChip</ComponentTitle>
        <ComponentsList>
          <NFTTraitsChip name="Crystal" rimValue="420 (4.20%)" />
          <NFTTraitsChip name="Crystal" rimValue="420 (4.20%)" />
          <NFTTraitsChip name="Crystal" rimValue="420 (4.20%)" />
        </ComponentsList>
      </ComponentWrapper>
      <ComponentWrapper>
        <ComponentTitle>Activity Table</ComponentTitle>
        <ActivityTable />
      </ComponentWrapper>
      <ComponentWrapper>
        <ComponentTitle>NFT Activity Table</ComponentTitle>
        <NFTActivityTable />
      </ComponentWrapper>
      <ComponentWrapper>
        <ComponentTitle>Offers Table</ComponentTitle>
        <OffersTable />
      </ComponentWrapper>
    </Container>
  );
};

export default DevelopedComponents;
