import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SortKey } from '@psychedelic/jelly-js';
import {
  filterActions,
  nftsActions,
  useAppDispatch,
  useFilterStore,
} from '../../../store';
import {
  DropdownRoot,
  DropdownStyle,
  DropdownContent,
  DropdownRadioMenuItem,
  DropdownRadioGroup,
} from './styles';
import { AppLog } from '../../../utils/log';
import { Icon } from '../../icons';
import { useTheme } from '../../../hooks';

export const SortByFilterDropdown = React.memo(() => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { sortBy, status, defaultFilters } = useFilterStore();

  const [, themeObject] = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = useMemo(
    () => [
      {
        key: SortKey.all,
        value: `${t('translation:dropdown.priceFilter.all')}`,
      },
      {
        key: SortKey.lastListing,
        value: `${t(
          'translation:dropdown.priceFilter.recentlyListed',
        )}`,
        listed: true,
      },
      {
        key: SortKey.lastOffer,
        value: `${t(
          'translation:dropdown.priceFilter.recentlyOffered',
        )}`,
        forOffer: true,
      },
      {
        key: SortKey.lastSale,
        value: `${t(
          'translation:dropdown.priceFilter.recentlySold',
        )}`,
      },
      {
        key: SortKey.salePrice,
        value: `${t(
          'translation:dropdown.priceFilter.highestLastSale',
        )}`,
      },
      {
        key: SortKey.salePrice,
        value: `${t(
          'translation:dropdown.priceFilter.lowestLastSale',
        )}`,
      },
      {
        key: SortKey.offerPrice,
        value: `${t(
          'translation:dropdown.priceFilter.highestLastOffer',
        )}`,
        forOffer: true,
      },
      {
        key: SortKey.offerPrice,
        value: `${t(
          'translation:dropdown.priceFilter.lowestLastOffer',
        )}`,
        forOffer: true,
      },
      {
        key: SortKey.listingPrice,
        value: `${t('translation:dropdown.priceFilter.highToLow')}`,
        listed: true,
      },
      {
        key: SortKey.listingPrice,
        value: `${t('translation:dropdown.priceFilter.lowToHigh')}`,
        listed: true,
      },
    ],
    [t],
  );

  const applyFilter = (filterCategory: string, filterName: any) => {
    const filterCategoryExists = defaultFilters.some(
      (appliedFilter) =>
        appliedFilter.filterCategory === filterCategory,
    );

    const filterNameExists = defaultFilters.some(
      (appliedFilter) => appliedFilter.filterName === filterName,
    );

    switch (true) {
      case filterCategoryExists && filterNameExists:
        dispatch(
          filterActions.updateFilter({
            filterCategory,
            filterName,
          }),
        );
        break;
      default:
        dispatch(
          filterActions.applyFilter({
            filterName,
            filterCategory,
          }),
        );
        break;
    }
  };

  const forOfferText = `${t('translation:filters.forOffer')}`;
  const listedText = `${t('translation:filters.listed')}`;

  const setSortBy = (key: string) => {
    const translated = sortOptions.find(
      (item) => item.value === key,
    )?.value;

    const forSale = sortOptions.find(
      (item) => item.value === key,
    )?.listed;

    const forOffer = sortOptions.find(
      (item) => item.value === key,
    )?.forOffer;

    if (forSale) {
      dispatch(filterActions.setStatusFilter(listedText));
      applyFilter(
        'Status',
        `${t('translation:buttons.action.buyNow')}`,
      );
    }

    if (forOffer) {
      dispatch(filterActions.setStatusFilter(forOfferText));
      applyFilter(
        'Status',
        `${t('translation:buttons.action.hasOffers')}`,
      );
    }

    if (!translated) {
      AppLog.warn(
        `Oops! Sort by key (${key}) translation does not exist`,
      );

      return;
    }

    dispatch(nftsActions.setLastIndex(undefined));
    dispatch(filterActions.setSortingFilter(translated));
  };

  const sortValue = useMemo(
    () =>
      sortOptions.find((sortItem) => sortItem.value === sortBy)
        ?.value,
    [sortOptions, sortBy],
  );

  return (
    <DropdownRoot
      onOpenChange={setIsOpen}
      modal={false}
      open={isOpen}
    >
      <DropdownStyle onClick={(e) => e.preventDefault()} asChild>
        <div>
          <p>{sortValue}</p>
          <Icon icon="chevron-down" rotate={isOpen} />
        </div>
      </DropdownStyle>

      <DropdownContent className={themeObject}>
        <DropdownRadioGroup onValueChange={setSortBy}>
          {sortOptions.map((item) => {
            if (item.forOffer && status === forOfferText) {
              return (
                <DropdownRadioMenuItem
                  value={item.value}
                  key={item.value}
                  className="list-item"
                >
                  {item.value}
                </DropdownRadioMenuItem>
              );
            }

            if (item.listed && status === listedText) {
              return (
                <DropdownRadioMenuItem
                  value={item.value}
                  key={item.value}
                  className="list-item"
                >
                  {item.value}
                </DropdownRadioMenuItem>
              );
            }

            if (!status.length) {
              return (
                <DropdownRadioMenuItem
                  value={item.value}
                  key={item.value}
                  className="list-item"
                >
                  {item.value}
                </DropdownRadioMenuItem>
              );
            }

            return undefined;
          })}
        </DropdownRadioGroup>
      </DropdownContent>
    </DropdownRoot>
  );
});
