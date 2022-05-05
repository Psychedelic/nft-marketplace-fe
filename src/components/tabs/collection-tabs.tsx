import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import * as Tabs from '@radix-ui/react-tabs';
import { useLocation, useNavigate } from 'react-router-dom';
import { useThemeStore } from '../../store';
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

const TABS_ICONS = {
  items: {
    lightTheme: {
      active: itemsActive,
      inactive: itemsInactive,
    },
    darkTheme: {
      active: itemsActiveDark,
      inactive: itemsInactive,
    },
  },
  activity: {
    lightTheme: {
      active: activityActive,
      inactive: activityInactive,
    },
    darkTheme: {
      active: activityActiveDark,
      inactive: activityInactive,
    },
  },
};

export const CollectionTabs = () => {
  const { t } = useTranslation();
  const { theme } = useThemeStore();

  const location = useLocation();
  const navigate = useNavigate();

  const selectedTab = useMemo(
    () => location.pathname.split('/').pop() || 'items',
    [location],
  );

  const [itemsStatus, activityStatus] = useMemo<
    ('active' | 'inactive')[]
  >(
    () =>
      ['items', 'activity'].map((tab) =>
        selectedTab === tab ? 'active' : 'inactive',
      ),
    [selectedTab],
  );

  const selectedTheme = useMemo(
    () => (theme !== 'darkTheme' ? 'lightTheme' : 'darkTheme'),
    [theme],
  );

  return (
    <TabsRoot defaultValue="items" value={selectedTab}>
      <TabsList aria-label="Manage your account">
        <TabsTrigger
          value="items"
          status={itemsStatus}
          onClick={() => navigate('/', { replace: true })}
        >
          <img
            src={TABS_ICONS.items[selectedTheme][itemsStatus]}
            alt="items-tab"
          />
          {t('translation:tabs.items')}
        </TabsTrigger>
        <TabsTrigger
          value="activity"
          status={activityStatus}
          onClick={() => navigate('/activity', { replace: true })}
        >
          <img
            src={TABS_ICONS.activity[selectedTheme][activityStatus]}
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
