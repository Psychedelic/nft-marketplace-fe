import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Tabs from '@radix-ui/react-tabs';
import { ActivityTable } from '../tables';
import { NftList } from '../nft-list';
import {
  TabsRoot,
  TabsTrigger,
  TabsList,
  ContentWrapper,
  Flex,
  ContentFlex,
} from './styles';
import activityActive from '../../assets/activity.svg';
import itemsActive from '../../assets/items.svg';
import itemsInactive from '../../assets/items-inactive.svg';
import activityInactive from '../../assets/activity-inactive.svg';
import {
  FilteredCountChip,
  FilteredTraitsChip,
  PriceFilterDropdown,
} from '../core';

export const Tab = () => {
  const { t } = useTranslation();
  const [currentTab, setCurrentTab] = useState('items');
  const itemIsActive = currentTab === 'items' ? 'active' : 'inactive';
  const activityIsActive = currentTab === 'activity' ? 'active' : 'inactive';

  const dropDownContent = [
    `${t('translation:dropdown.priceFilter.recentlyListed')}`,
    `${t('translation:dropdown.priceFilter.recentlySold')}`,
    `${t('translation:dropdown.priceFilter.lowToHigh')}`,
    `${t('translation:dropdown.priceFilter.highToHigh')}`,
    `${t('translation:dropdown.priceFilter.highestLastSale')}`,
  ];

  return (
    <div>
      <TabsRoot defaultValue="items" value={currentTab}>
        <TabsList aria-label="Manage your account">
          <TabsTrigger
            value="items"
            status={itemIsActive}
            onClick={() => {
              setCurrentTab('items');
            }}
          >
            <img
              src={
                itemIsActive === 'active'
                  ? itemsActive
                  : itemsInactive
              }
              alt="items-tab"
            />
            Items
          </TabsTrigger>
          <TabsTrigger
            value="activity"
            status={activityIsActive}
            onClick={() => {
              setCurrentTab('activity');
            }}
          >
            <img
              src={
                activityIsActive === 'active'
                  ? activityActive
                  : activityInactive
              }
              alt="activity-tab"
            />
            Activity
          </TabsTrigger>
        </TabsList>
        <Tabs.Content value="items">
          <ContentWrapper>
            <Flex>
              <ContentFlex>
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
                  label={t(
                    'translation:chips.labels.FloorPriceLabel',
                  )}
                  count="22.12"
                  showLogo
                />
              </ContentFlex>
              <PriceFilterDropdown
                defaultValue={`${t(
                  'translation:dropdown.priceFilter.lowToHigh',
                )}`}
                options={dropDownContent}
              />
            </Flex>
            <ContentFlex>
              <FilteredTraitsChip
                name="Red"
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
            </ContentFlex>
          </ContentWrapper>
          <NftList />
        </Tabs.Content>
        <Tabs.Content value="activity">
          <ActivityTable />
        </Tabs.Content>
      </TabsRoot>
    </div>
  );
};
