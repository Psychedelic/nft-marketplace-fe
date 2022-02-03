import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Title,
  ComponentWrapper,
  ComponentTitle,
  ComponentsList,
  ButtonWrapper,
} from './styles';
import {
  SearchInput,
  FilterInput,
  ModalInput,
  ActionButton,
  LinkButton,
  NFTOverview,
  PriceFilterDropdown,
  CardOptionsDropdown,
  PlugProfileDropdown,
  FilteredCountChip,
  FilteredTraitsChip,
  NFTTraitsChip,
  CheckboxFilterAccordion,
  AboutAccordion,
  OfferAccordion,
  ActivityTable,
  NFTActivityTable,
  OffersTable,
  NftMetadata,
  SellModal,
  ChangePriceModal,
  BuyNowModal,
  MakeOfferModal,
  CancelListingModal,
  CancelOfferModal,
  AcceptOfferModal,
  NftList,
  NftSkeletonList,
  NavBar,
} from '../../components';
import discord from '../../assets/buttons/discord.svg';
import twitter from '../../assets/buttons/twitter.svg';
import back from '../../assets/buttons/back.svg';
import closeDrawer from '../../assets/buttons/close-drawer.svg';
import darkTheme from '../../assets/buttons/dark-theme.svg';
import NftActionBar from '../../components/nft-action-bar/nft-action-bar';

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
        <ComponentTitle>Link Buttons</ComponentTitle>
        <ComponentsList>
          <LinkButton type="textBtn">
            {t('translation:buttons.links.website')}
          </LinkButton>
          <LinkButton>
            <img
              src={discord}
              alt={t('translation:buttons.links.discord')}
            />
          </LinkButton>
          <LinkButton>
            <img
              src={twitter}
              alt={t('translation:buttons.links.twitter')}
            />
          </LinkButton>
          <LinkButton>
            <img
              src={back}
              alt={t('translation:buttons.links.back')}
            />
          </LinkButton>
          <LinkButton>
            <img src={darkTheme} alt="dark-theme" />
          </LinkButton>
          <LinkButton>
            <img src={closeDrawer} alt="close-tab" />
          </LinkButton>
        </ComponentsList>
      </ComponentWrapper>
      <ComponentWrapper>
        <ComponentTitle>Action Buttons</ComponentTitle>
        <ComponentsList>
          <ButtonWrapper>
            <ActionButton
              type="primary"
              text={t('translation:buttons.placeholder.primary')}
              handleClick={() => {
                // eslint-disable-next-line no-console
                console.log('callback');
              }}
            />
          </ButtonWrapper>
          <ButtonWrapper>
            <ActionButton
              type="secondary"
              text={t('translation:buttons.placeholder.secondary')}
              handleClick={() => {
                // eslint-disable-next-line no-console
                console.log('callback');
              }}
            />
          </ButtonWrapper>
          <ButtonWrapper>
            <ActionButton
              type="outline"
              text={t(
                'translation:buttons.placeholder.secondaryColored',
              )}
              handleClick={() => {
                // eslint-disable-next-line no-console
                console.log('callback');
              }}
            />
          </ButtonWrapper>
          <ButtonWrapper>
            <ActionButton
              type="primary"
              text={t('translation:buttons.placeholder.danger')}
              handleClick={() => {
                // eslint-disable-next-line no-console
                console.log('callback');
              }}
              danger
            />
          </ButtonWrapper>
        </ComponentsList>
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
        <ComponentTitle>Accordions</ComponentTitle>
        <CheckboxFilterAccordion />
        <br />
        <br />
        <OfferAccordion owned />
        <br />
        <br />
        <AboutAccordion owned />
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
      <ComponentWrapper>
        <ComponentTitle>Sell Modal</ComponentTitle>
        <SellModal />
      </ComponentWrapper>
      <ComponentWrapper>
        <ComponentTitle>Change Price Modal</ComponentTitle>
        <ChangePriceModal />
      </ComponentWrapper>
      <ComponentWrapper>
        <ComponentTitle>Cancel Listing Modal</ComponentTitle>
        <CancelListingModal />
      </ComponentWrapper>
      <ComponentWrapper>
        <ComponentTitle>Make Offer Modal</ComponentTitle>
        <MakeOfferModal />
      </ComponentWrapper>
      <ComponentWrapper>
        <ComponentTitle>Buy Now Modal</ComponentTitle>
        <BuyNowModal />
      </ComponentWrapper>
      <ComponentWrapper>
        <ComponentTitle>Cancel Offer Modal</ComponentTitle>
        <CancelOfferModal />
      </ComponentWrapper>
      <ComponentWrapper>
        <ComponentTitle>Accept Offer Modal</ComponentTitle>
        <AcceptOfferModal />
      </ComponentWrapper>
      <ComponentWrapper>
        <ComponentTitle>Nft Card/List</ComponentTitle>
        <div>
          <NftList />
        </div>
      </ComponentWrapper>
      <ComponentWrapper>
        <ComponentTitle>Nft Skeleton List</ComponentTitle>
        <div>
          <NftSkeletonList />
        </div>
      </ComponentWrapper>
      <ComponentWrapper>
        <NavBar />
      </ComponentWrapper>
      <ComponentWrapper>
        <ComponentTitle>Collection Overview</ComponentTitle>
        <NftMetadata />
      </ComponentWrapper>
      <ComponentWrapper>
        <ComponentTitle>Collection Metadata</ComponentTitle>
        <NFTOverview />
      </ComponentWrapper>
      <ComponentWrapper>
        <ComponentTitle>Action Bar</ComponentTitle>
        <NftActionBar />
      </ComponentWrapper>
    </Container>
  );
};

export default DevelopedComponents;
