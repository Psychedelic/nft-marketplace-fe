import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Tabs from '@radix-ui/react-tabs';
import { ActivityTable } from '../tables';
import { CollectionItems } from '../items';
import { TabsRoot, TabsTrigger, TabsList } from './styles';
import activityActive from '../../assets/activity.svg';
import itemsActive from '../../assets/items.svg';
import itemsInactive from '../../assets/items-inactive.svg';
import activityInactive from '../../assets/activity-inactive.svg';
import { Filters } from '../filters';

export const CollectionTabs = () => {
  const { t } = useTranslation();
  const [currentTab, setCurrentTab] = useState('items');
  const itemIsActive = currentTab === 'items' ? 'active' : 'inactive';
  // eslint-disable-next-line
  const activityIsActive =
    currentTab === 'activity' ? 'active' : 'inactive';

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
              itemIsActive === 'active' ? itemsActive : itemsInactive
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
                ? activityActive
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
