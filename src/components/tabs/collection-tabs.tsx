import { useMemo, useEffect } from 'react';
import {
  useParams,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import copyToClipboard from 'copy-to-clipboard';

import { ActivityTable } from '../tables';
import { CollectionItems } from '../items';
import {
  Container,
  TabsRoot,
  TabsTrigger,
  TabsList,
  TabsContentWrapper,
  TabsContent,
  CollectionOptionsList,
  ButtonsWrapper,
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
  notificationActions,
} from '../../store';
import { LinkButton } from '../core';
import { useTheme } from '../../hooks';
import { isCrownsCollection } from '../../utils/collections';

export const CollectionTabs = () => {
  const { t } = useTranslation();

  const location = useLocation();
  const navigate = useNavigate();
  const { collectionId } = useParams();
  const isMobileScreen = useMediaQuery('(max-width: 850px)');
  const dispatch = useAppDispatch();
  const appliedFilters = useFilterStore();
  const [theme] = useTheme();

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

  const { collectionId: currentCollectionId, collectionName } =
    collectionDetails;

  useEffect(() => {
    if (!collectionId || collectionId === currentCollectionId) return;

    dispatch(
      marketplaceActions.getCollectionDetails({ collectionId }),
    );

    dispatch(marketplaceActions.getProtocolFee({ collectionId }));
  }, [collectionId, currentCollectionId]);

  return (
    <Container>
      {!isMobileScreen && selectedTab === 'items' && <Filters />}
      <TabsRoot defaultValue="items" value={selectedTab}>
        <CollectionOptionsList>
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
          <ButtonsWrapper>
            {isMobileScreen ? (
              <LinkButton
                url={
                  isCrownsCollection(collectionName)
                    ? 'https://crowns.ooo/'
                    : 'https://icns.id/'
                }
              >
                <Icon
                  icon="website"
                  extraIconProps={{ dark: theme === 'darkTheme' }}
                />
              </LinkButton>
            ) : (
              <LinkButton
                type="textBtn"
                url={
                  isCrownsCollection(collectionName)
                    ? 'https://crowns.ooo/'
                    : 'https://icns.id/'
                }
              >
                {t('translation:buttons.links.website')}
              </LinkButton>
            )}
            <LinkButton url="https://discord.gg/yVEcEzmrgm">
              <Icon icon="discord" />
            </LinkButton>

            <LinkButton
              url={
                isCrownsCollection(collectionName)
                  ? 'https://twitter.com/cap_ois'
                  : 'https://twitter.com/icnsid'
              }
            >
              <Icon icon="twitter" />
            </LinkButton>
            <LinkButton
              handleClick={() => {
                copyToClipboard(window.location.href);
                dispatch(
                  notificationActions.setSuccessMessage(
                    `${t(
                      'translation:successMessages.copyToClipboard',
                    )}`,
                  ),
                );
              }}
            >
              <Icon icon="share" />
            </LinkButton>
          </ButtonsWrapper>
        </CollectionOptionsList>
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
