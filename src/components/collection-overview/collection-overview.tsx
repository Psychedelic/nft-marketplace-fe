import copyToClipboard from 'copy-to-clipboard';
import { useTranslation } from 'react-i18next';
import { useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  notificationActions,
  useAppDispatch,
  useNFTSStore,
  useTableStore,
  marketplaceActions,
  nftsActions,
  filterActions,
} from '../../store';
import { FilteredCountChip, LinkButton } from '../core';
import {
  NftMetadataWrapper,
  NftMetadataBackground,
  NftMetadataContent,
  NftMetadataContentWrapper,
  NftProfilePictureWrapper,
  Heading,
  Subtext,
  ButtonsWrapper,
  HeaderWrapper,
  VerifiedIcon,
  FilteredCountChips,
  FilteredCountChipsWrapper,
  Divider,
} from './styles';
import crown from '../../assets/crown.svg';
import { Icon } from '../icons';
import useMediaQuery from '../../hooks/use-media-query';
import { FilterChipsSkeleton } from './filter-chips-skeleton';
import { useTheme } from '../../hooks';

export const CollectionOverview = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [theme] = useTheme();

  const { id, collectionId } = useParams();

  const { loadingTableData } = useTableStore();
  const {
    loadingNFTs,
    loadingCollectionData,
    totalNFTSCount,
    totalOwnersCount,
    floorPrice,
    totalVolume,
  } = useNFTSStore();
  const isMobileScreen = useMediaQuery('(max-width: 850px)');

  const showLoading = useMemo(
    () => loadingTableData || loadingNFTs || loadingCollectionData,
    [loadingTableData, loadingNFTs, loadingCollectionData],
  );

  useEffect(() => {
    if (!collectionId) return;

    // reset state to initial on collection Id change
    // TODO: handle reset state gracefully if required in anyother places
    dispatch(nftsActions.reset());
    dispatch(filterActions.reset());

    dispatch(
      marketplaceActions.getCollectionDetails({ collectionId }),
    );

    // TODO: Update static data like crowns title, icon
    // by using currentCollectionDetails state
  }, [collectionId]);

  return (
    <NftMetadataWrapper>
      <NftMetadataBackground />
      <NftMetadataContent>
        <NftMetadataContentWrapper>
          <NftProfilePictureWrapper>
            <img src={crown} alt="crown-pfp" />
          </NftProfilePictureWrapper>
          <HeaderWrapper>
            <Heading>
              Crowns
              <VerifiedIcon icon="verified" paddingLeft size="md" />
              {showLoading && (
                <Icon
                  icon="spinner"
                  paddingLeft
                  extraIconProps={{ size: '32px' }}
                />
              )}
            </Heading>
            <Subtext>
              {t('translation:common.crownsDescription')}
            </Subtext>
          </HeaderWrapper>
        </NftMetadataContentWrapper>
        <ButtonsWrapper>
          {isMobileScreen ? (
            <LinkButton url="https://crowns.ooo/">
              <Icon
                icon="website"
                extraIconProps={{ dark: theme === 'darkTheme' }}
              />
            </LinkButton>
          ) : (
            <LinkButton type="textBtn" url="https://crowns.ooo/">
              {t('translation:buttons.links.website')}
            </LinkButton>
          )}
          <LinkButton url="https://discord.gg/yVEcEzmrgm">
            <Icon icon="discord" />
          </LinkButton>
          <LinkButton url="https://twitter.com/cap_ois">
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
      </NftMetadataContent>
      {isMobileScreen && (
        <FilteredCountChipsWrapper>
          <Divider />
          <FilteredCountChips>
            {!loadingCollectionData && totalNFTSCount > 0 ? (
              <FilteredCountChip
                label={t('translation:chips.labels.itemsLabel')}
                count={totalNFTSCount}
                showLogo={false}
              />
            ) : (
              <FilterChipsSkeleton />
            )}
            {!loadingCollectionData && totalOwnersCount > 0 ? (
              <FilteredCountChip
                label={t('translation:chips.labels.OwnersLabel')}
                count={totalOwnersCount}
                showLogo={false}
              />
            ) : (
              <FilterChipsSkeleton />
            )}
          </FilteredCountChips>
          <FilteredCountChips>
            {!loadingCollectionData && floorPrice > 0 ? (
              <FilteredCountChip
                label={t('translation:chips.labels.FloorPriceLabel')}
                count={floorPrice}
                showLogo
              />
            ) : (
              <FilterChipsSkeleton />
            )}
            {!loadingCollectionData && totalVolume > 0 ? (
              <FilteredCountChip
                label={t('translation:chips.labels.totalVolume')}
                count={Number(totalVolume.toFixed(2))}
                showLogo
              />
            ) : (
              <FilterChipsSkeleton />
            )}
          </FilteredCountChips>
        </FilteredCountChipsWrapper>
      )}
    </NftMetadataWrapper>
  );
};
