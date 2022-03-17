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

  const setSortBy = (e: any) => {
    setSelectedValue(e.value);
    dispatch(filterActions.setSortingFilter(e.key));
  };

  const options = [
    `${t('translation:dropdown.priceFilter.recentlyListed')}`,
    `${t('translation:dropdown.priceFilter.recentlySold')}`,
    `${t('translation:dropdown.priceFilter.lowToHigh')}`,
    `${t('translation:dropdown.priceFilter.highToHigh')}`,
    `${t('translation:dropdown.priceFilter.highestLastSale')}`,
  ];

  console.log('options', options);

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
              <DropdownRadioMenuItem
                value={item}
                textValue={item.value}
              >
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
