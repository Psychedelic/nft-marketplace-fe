import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Tabs from '@radix-ui/react-tabs';
import {
  useThemeStore,
} from '../../store';
import { ActivityTable } from '../tables';
import { CollectionItems } from '../items';
import { TabsRoot, TabsTrigger, TabsList } from './styles';
import activityActive from '../../assets/activity.svg';
import activityActiveDark from '../../assets/activity-dark.svg';
import itemsActive from '../../assets/items.svg';
import itemsActiveDark from '../../assets/items-active-dark.svg';
import itemsInactive from '../../assets/items-inactive.svg';
import activityInactive from '../../assets/activity-inactive.svg';
import { Filters } from '../filters';

export const CollectionTabs = () => {
  const { t } = useTranslation();
  const [currentTab, setCurrentTab] = useState('items');
  const { theme } = useThemeStore();
  const isLightTheme = theme === 'lightTheme';

  // state for active chips goes here
  // based on their text content we'd have the filters to be displayed
  // if empty we'll display nothing

  const itemIsActive = currentTab === 'items' ? 'active' : 'inactive';
  // eslint-disable-next-line
  const activityIsActive = currentTab === 'activity' ? 'active' : 'inactive';
  const itemeActiveTheme = isLightTheme ? itemsActive : itemsActiveDark;
  const activityActiveTheme = isLightTheme ? activityActive : activityActiveDark;

  return (
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
                ? itemeActiveTheme
                : itemsInactive
            }
            alt="items-tab"
          />
          {t('translation:tabs.items')}
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
                ? activityActiveTheme
                : activityInactive
            }
            alt="activity-tab"
          />
          {t('translation:tabs.activity')}
        </TabsTrigger>
      </TabsList>
      <Tabs.Content value="items">
        <div
          style={{
            display: 'flex',
          }}
        >
          <Filters />
          <CollectionItems />
        </div>
      </Tabs.Content>
      <Tabs.Content value="activity">
        <ActivityTable />
      </Tabs.Content>
    </TabsRoot>
  );
};
