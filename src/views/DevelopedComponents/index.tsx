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
  ActionButton,
  SearchInput,
  FilterInput,
  ModalInput,
  PriceFilterDropdown,
  MoreOptionsDropdown,
  FilteredCountChip,
  FilteredTraitsChip,
  NFTTraitsChip,
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
        <PriceFilterDropdown
          trigger={`${t('translation:dropdown.priceFilter.lowToHigh')}`}
          options={dropDownContent}
        />
        &nbsp;
        <br />
        <MoreOptionsDropdown
          content={`${t('translation:dropdown.moreOptions.copyLink')}`}
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
    </Container>
  );
};

export default DevelopedComponents;
