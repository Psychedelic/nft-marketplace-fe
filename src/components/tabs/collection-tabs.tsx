import { useMemo, useEffect } from 'react';
import {
  useParams,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { ActivityTable } from '../tables';
import { CollectionItems } from '../items';
import {
  Container,
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
  marketplaceActions,
  RootState,
} from '../../store';

export const CollectionTabs = () => {
  const { t } = useTranslation();

  const location = useLocation();
  const navigate = useNavigate();
  const { collectionId } = useParams();
  const isMobileScreen = useMediaQuery('(max-width: 850px)');
  const dispatch = useAppDispatch();
  const appliedFilters = useFilterStore();

  const selectedTab = useMemo(() => {
    const pathName = location.pathname.split('/').pop();

    if (pathName === 'activity') return pathName;

    return 'items';
  }, [location]);

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
    if (appliedFiltersCount > 0 || !collectionId) return;

    dispatch(nftsActions.getCollectionData({ collectionId }));
  }, [appliedFiltersCount, collectionId, dispatch]);

  const collectionDetails = useSelector(
    (state: RootState) => state.marketplace.currentCollectionDetails,
  );

  const { collectionId: currentCollectionId } = collectionDetails;

  useEffect(() => {
    if (!collectionId || collectionId === currentCollectionId) return;

    dispatch(
      marketplaceActions.getCollectionDetails({ collectionId }),
    );
  }, [collectionId, currentCollectionId]);

  return (
    <Container>
      {!isMobileScreen && selectedTab === 'items' && <Filters />}
      <TabsRoot defaultValue="items" value={selectedTab}>
        <TabsList aria-label="Manage your account">
          <TabsTrigger
            value="items"
            status={itemsStatus}
            onClick={() => navigate(`/${collectionId}`)}
          >
            <Icon icon="grid" paddingRight />
            {t('translation:tabs.items')}
          </TabsTrigger>
          <TabsTrigger
            value="activity"
            status={activityStatus}
            onClick={() => navigate(`/${collectionId}/activity`)}
          >
            <Icon icon="activity" paddingRight />
            {t('translation:tabs.activity')}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="items">
          <TabsContentWrapper>
            <CollectionItems />
          </TabsContentWrapper>
        </TabsContent>
        <TabsContent value="activity">
          <ActivityTable />
        </TabsContent>
      </TabsRoot>
    </Container>
  );
};
