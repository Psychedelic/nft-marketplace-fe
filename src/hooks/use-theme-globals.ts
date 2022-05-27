import { useEffect, useState } from 'react';
import { themeGlobals } from '../utils/styles';

export const useThemeGlobals = (selectedTheme: string) => {
  const [previousTheme, setPreviousTheme] = useState(selectedTheme);

  useEffect(() => {
    document.body.classList.remove(previousTheme);
    document.body.classList.add(selectedTheme);
    setPreviousTheme(selectedTheme);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTheme]);

  return themeGlobals();
};
