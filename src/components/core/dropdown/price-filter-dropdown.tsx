import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  filterActions,
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
  const { sortBy, reverse } = useFilterStore();

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
    },
    {
      key: SortKey.lastOffer,
      value: `${t(
        'translation:dropdown.priceFilter.recentlyOffered',
      )}`,
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
    },
    {
      key: SortKey.listingPrice,
      value: `${t(
        'translation:dropdown.priceFilter.lowestLastSale',
      )}`,
    },
    {
      key: SortKey.offerPrice,
      value: `${t(
        'translation:dropdown.priceFilter.highestLastOffer',
      )}`,
    },
    {
      key: SortKey.offerPrice,
      value: `${t(
        'translation:dropdown.priceFilter.lowestLastOffer',
      )}`,
    },
    {
      key: SortKey.salePrice,
      value: `${t('translation:dropdown.priceFilter.highToLow')}`,
    },
    {
      key: SortKey.salePrice,
      value: `${t('translation:dropdown.priceFilter.lowToHigh')}`,
    },
  ];

  const setSortBy = (key: string) => {
    const translated = sortOptions.find(
      (item) => item.value === key,
    )?.value;

    if (!translated) {
      AppLog.warn(
        `Oops! Sort by key (${key}) translation does not exist`,
      );

      return;
    }

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
          {sortOptions.map((item) => (
            <DropdownRadioMenuItem
              value={item.value}
              key={item.value}
              className="list-item"
            >
              {item.value}
            </DropdownRadioMenuItem>
          ))}
        </DropdownRadioGroup>
      </DropdownContent>
    </DropdownRoot>
  );
});
