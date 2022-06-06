import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { ActivityTable } from '../tables';
import { CollectionItems } from '../items';
import {
  TabsRoot,
  TabsTrigger,
  TabsList,
  TabsContentWrapper,
  TabsContent,
} from './styles';
import { Filters } from '../filters';
import { Icon } from '../icons';
import { settingsActions, useAppDispatch } from '../../store';

export const CollectionTabs = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

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
          onClick={() => {
            navigate('/', { replace: true });
            dispatch(settingsActions.removeLastVisitedPath());
          }}
        >
          <Icon icon="grid" paddingRight />
          {t('translation:tabs.items')}
        </TabsTrigger>
        <TabsTrigger
          value="activity"
          status={activityStatus}
          onClick={() => {
            navigate('/activity', { replace: true });
            dispatch(settingsActions.removeLastVisitedPath());
          }}
        >
          <Icon icon="activity" paddingRight />
          {t('translation:tabs.activity')}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="items">
        <TabsContentWrapper>
          <Filters />
          <CollectionItems />
        </TabsContentWrapper>
      </TabsContent>
      <TabsContent value="activity">
        <ActivityTable />
      </TabsContent>
    </TabsRoot>
  );
};
