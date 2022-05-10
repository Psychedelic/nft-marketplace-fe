import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import * as Tabs from '@radix-ui/react-tabs';
import { useLocation, useNavigate } from 'react-router-dom';
import { ActivityTable } from '../tables';
import { CollectionItems } from '../items';
import {
  TabsRoot,
  TabsTrigger,
  TabsList,
  TabsContentWrapper,
} from './styles';
import { Filters } from '../filters';
import { Icon, ActivityIcon, ItemsIcon } from '../icons';

export const CollectionTabs = () => {
  const { t } = useTranslation();

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

  return (
    <TabsRoot defaultValue="items" value={selectedTab}>
      <TabsList aria-label="Manage your account">
        <TabsTrigger
          value="items"
          status={itemsStatus}
          onClick={() => navigate('/', { replace: true })}
        >
          <Icon icon={ItemsIcon} />
          {t('translation:tabs.items')}
        </TabsTrigger>
        <TabsTrigger
          value="activity"
          status={activityStatus}
          onClick={() => navigate('/activity', { replace: true })}
        >
          <Icon icon={ActivityIcon} />
          {t('translation:tabs.activity')}
        </TabsTrigger>
      </TabsList>
      <Tabs.Content value="items">
        <TabsContentWrapper>
          <Filters />
          <CollectionItems />
        </TabsContentWrapper>
      </Tabs.Content>
      <Tabs.Content value="activity">
        <ActivityTable />
      </Tabs.Content>
    </TabsRoot>
  );
};
