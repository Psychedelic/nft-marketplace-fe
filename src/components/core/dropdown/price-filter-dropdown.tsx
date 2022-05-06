import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useThemeStore,
  filterActions,
  useAppDispatch,
} from '../../../store';
import {
  DropdownRoot,
  DropdownStyle,
  DropdownContent,
  DropdownRadioMenuItem,
  DropdownMenuSeparator,
  DropdownRadioGroup,
} from './styles';
import arrowdown from '../../../assets/arrowdown.svg';
import arrowdownDark from '../../../assets/arrowdown-dark.svg';
import { AppLog } from '../../../utils/log';

export const SortByFilterDropdown = React.memo(() => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [selectedValue, setSelectedValue] = useState(
    `${t('translation:dropdown.priceFilter.recentlyListed')}`,
  );
  const { theme } = useThemeStore();
  const isLightTheme = theme === 'lightTheme';
  const currTheme = theme === 'darkTheme' ? 'dark' : 'light';

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
    <DropdownRoot>
      <DropdownStyle>
        <p>{selectedValue}</p>
        <img
          src={isLightTheme ? arrowdown : arrowdownDark}
          alt="arrow-down"
        />
      </DropdownStyle>

      <DropdownContent background={currTheme}>
        <DropdownRadioGroup onValueChange={setSortBy}>
          {sortOptions.map((item) => (
            <>
              <DropdownRadioMenuItem value={item.key}>
                {item.value}
              </DropdownRadioMenuItem>
              <DropdownMenuSeparator
                background={theme === 'darkTheme' ? 'dark' : 'light'}
              />
            </>
          ))}
        </DropdownRadioGroup>
      </DropdownContent>
    </DropdownRoot>
  );
});
