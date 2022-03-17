import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '../../../store';
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

  const [selectedValue, setSelectedValue] = useState(
    `${t('translation:dropdown.priceFilter.recentlyListed')}`,
  );
  const { theme } = useThemeStore();
  const isLightTheme = theme === 'lightTheme';

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

      <DropdownContent
        background={theme === 'darkTheme' ? 'dark' : 'light'}
      >
        <DropdownRadioGroup
          onValueChange={(e) => setSelectedValue(e)}
        >
          {options.map((item) => (
            <>
              <DropdownRadioMenuItem value={item} textValue={item}>
                {item}
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
