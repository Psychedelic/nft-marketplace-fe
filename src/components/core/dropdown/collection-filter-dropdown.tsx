import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
import { CollectionFilters } from '../../../constants/collection-filter-options';

export const CollectionFilterDropdown = React.memo(() => {
  const { t } = useTranslation();

  const [selectedValue, setSelectedValue] =
    useState('Recently Added');
  const [, themeObject] = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const collectionFilterOptions = [
    {
      key: CollectionFilters.RecentlyAdded,
      value: 'Recently Added',
    },
    {
      key: CollectionFilters.TrendingCollections,
      value: 'Trending Collections',
    },
  ];

  const setSortBy = (key: string) => {
    const translated = collectionFilterOptions.find(
      (item) => item.key === key,
    )?.value;

    if (!translated) {
      AppLog.warn(
        `Oops! Sort by key (${key}) translation does not exist`,
      );

      return;
    }

    setSelectedValue(translated);
  };

  return (
    <DropdownRoot
      onOpenChange={setIsOpen}
      modal={false}
      open={isOpen}
    >
      <DropdownStyle onClick={(e) => e.preventDefault()} asChild>
        <div>
          <p>{selectedValue}</p>
          <Icon icon="chevron-down" rotate={isOpen} />
        </div>
      </DropdownStyle>

      <DropdownContent className={themeObject}>
        <DropdownRadioGroup onValueChange={setSortBy}>
          {collectionFilterOptions.map((item) => (
            <DropdownRadioMenuItem
              value={item.key}
              key={item.key}
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
