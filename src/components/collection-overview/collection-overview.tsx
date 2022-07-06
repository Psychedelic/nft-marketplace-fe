import copyToClipboard from 'copy-to-clipboard';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import {
  notificationActions,
  useAppDispatch,
  useNFTSStore,
  useTableStore,
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

export const CollectionOverview = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

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
              <Icon icon="website" />
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
            {!loadingCollectionData && totalNFTSCount > 0 && (
              <FilteredCountChip
                label={t('translation:chips.labels.itemsLabel')}
                count={totalNFTSCount}
                showLogo={false}
              />
            )}
            {!loadingCollectionData && totalOwnersCount > 0 && (
              <FilteredCountChip
                label={t('translation:chips.labels.OwnersLabel')}
                count={totalOwnersCount}
                showLogo={false}
              />
            )}
          </FilteredCountChips>
          <FilteredCountChips>
            {!loadingCollectionData && floorPrice > 0 && (
              <FilteredCountChip
                label={t('translation:chips.labels.FloorPriceLabel')}
                count={floorPrice}
                showLogo
              />
            )}
            {!loadingCollectionData && totalVolume > 0 && (
              <FilteredCountChip
                label={t('translation:chips.labels.totalVolume')}
                count={Number(totalVolume.toFixed(2))}
                showLogo
              />
            )}
          </FilteredCountChips>
        </FilteredCountChipsWrapper>
      )}
    </NftMetadataWrapper>
  );
};
