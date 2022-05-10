import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { filterActions, useAppDispatch } from '../../../store';
import {
  DropdownRoot,
  DropdownStyle,
  DropdownContent,
  DropdownRadioMenuItem,
  DropdownRadioGroup,
} from './styles';
import { AppLog } from '../../../utils/log';
import { ChevronDownIcon, Icon } from '../../icons';
import { useTheme } from '../../../hooks';

export const SortByFilterDropdown = React.memo(() => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [selectedValue, setSelectedValue] = useState(
    `${t('translation:dropdown.priceFilter.recentlyListed')}`,
  );
  const [, themeObject] = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  // TODO: move all the keys to constant variable file
  const sortOptions = [
    {
      key: 'lastModified',
      value: `${t(
        'translation:dropdown.priceFilter.recentlyListed',
      )}`,
    },
    {
      key: 'lastSale',
      value: `${t('translation:dropdown.priceFilter.recentlySold')}`,
    },
    {
      key: 'lastSalePrice',
      value: `${t(
        'translation:dropdown.priceFilter.highestLastSale',
      )}`,
    },
    {
      key: 'lastOfferPrice',
      value: `${t(
        'translation:dropdown.priceFilter.highestLastOffer',
      )}`,
    },
  ];

  const setSortBy = (key: string) => {
    const translated = sortOptions.find(
      (item) => item.key === key,
    )?.value;

    if (!translated) {
      AppLog.warn(
        `Oops! Sort by key (${key}) translation does not exist`,
      );

      return;
    }

    setSelectedValue(translated);
    dispatch(filterActions.setSortingFilter(key));
  };

  return (
    <DropdownRoot onOpenChange={setIsOpen}>
      <DropdownStyle>
        <p>{selectedValue}</p>
        <Icon icon={ChevronDownIcon} rotate={isOpen} />
      </DropdownStyle>

      <DropdownContent className={themeObject}>
        <DropdownRadioGroup onValueChange={setSortBy}>
          {sortOptions.map((item) => (
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
