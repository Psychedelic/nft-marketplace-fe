import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
import { SortKey } from '@psychedelic/jelly-js';

export const SortByFilterDropdown = React.memo(() => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { sortBy, reverse, status, defaultFilters } =
    useFilterStore();

  const [selectedValue, setSelectedValue] = useState(
    `${t('translation:dropdown.priceFilter.recentlyListed')}`,
  );
  const [, themeObject] = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    {
      key: SortKey.all,
      value: `${t('translation:dropdown.priceFilter.all')}`,
    },
    {
      key: SortKey.lastListing,
      value: `${t(
        'translation:dropdown.priceFilter.recentlyListed',
      )}`,
      forSale: true,
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
      value: `${t('translation:dropdown.priceFilter.recentlySold')}`,
    },
    {
      key: SortKey.listingPrice,
      value: `${t(
        'translation:dropdown.priceFilter.highestLastSale',
      )}`,
      forSale: true,
    },
    {
      key: SortKey.listingPrice,
      value: `${t(
        'translation:dropdown.priceFilter.lowestLastSale',
      )}`,
      forSale: true,
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
      key: SortKey.salePrice,
      value: `${t('translation:dropdown.priceFilter.highToLow')}`,
      forSale: true,
      forOffer: true,
    },
    {
      key: SortKey.salePrice,
      value: `${t('translation:dropdown.priceFilter.lowToHigh')}`,
      forSale: true,
      forOffer: true,
    },
  ];

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
  const forSaleText = `${t('translation:filters.forSale')}`;

  const setSortBy = (key: string) => {
    const translated = sortOptions.find(
      (item) => item.value === key,
    )?.value;

    const forSale = sortOptions.find(
      (item) => item.value === key,
    )?.forSale;

    const forOffer = sortOptions.find(
      (item) => item.value === key,
    )?.forOffer;

    if (forSale) {
      dispatch(filterActions.setStatusFilter(forSaleText));
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
    setSelectedValue(translated);
    dispatch(filterActions.setSortingFilter(translated));
  };

  const sortValue = useMemo(() => {
    return sortOptions.find((sortItem) => sortItem.value === sortBy)
      ?.value;
  }, [sortOptions, sortBy]);

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

            if (item.forSale && status === forSaleText) {
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
          })}
        </DropdownRadioGroup>
      </DropdownContent>
    </DropdownRoot>
  );
});
