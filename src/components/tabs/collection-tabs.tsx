import { useMemo, useEffect } from 'react';
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
import useMediaQuery from '../../hooks/use-media-query';
import {
  nftsActions,
  useAppDispatch,
  useFilterStore,
} from '../../store';

export const CollectionTabs = () => {
  const { t } = useTranslation();

  const location = useLocation();
  const navigate = useNavigate();
  const isMobileScreen = useMediaQuery('(max-width: 850px)');
  const dispatch = useAppDispatch();
  const appliedFilters = useFilterStore();

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

  const appliedFiltersCount =
    appliedFilters?.defaultFilters.length || 0;

  useEffect(() => {
    if (appliedFiltersCount > 0) return;

    dispatch(nftsActions.getCollectionData());
  }, [appliedFiltersCount]);

  return (
    <TabsRoot defaultValue="items" value={selectedTab}>
      <TabsList aria-label="Manage your account">
        <TabsTrigger
          value="items"
          status={itemsStatus}
          onClick={() => navigate('/')}
        >
          <Icon icon="grid" paddingRight />
          {t('translation:tabs.items')}
        </TabsTrigger>
        <TabsTrigger
          value="activity"
          status={activityStatus}
          onClick={() => navigate('/activity')}
        >
          <Icon icon="activity" paddingRight />
          {t('translation:tabs.activity')}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="items">
        <TabsContentWrapper>
          {!isMobileScreen && <Filters />}
          <CollectionItems />
        </TabsContentWrapper>
      </TabsContent>
      <TabsContent value="activity">
        <ActivityTable />
      </TabsContent>
    </TabsRoot>
  );
};
