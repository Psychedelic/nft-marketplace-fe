import * as Tooltip from '@radix-ui/react-tooltip';
import React, { useMemo } from 'react';
import { useTheme } from '../../hooks';
import {
  formatAmountAbbreviation,
  formatAmountDecimals,
} from '../../utils/formatters';
import { NumberTooltipContent, NumberTooltipTrigger } from './styles';

export interface NumberTooltipProps
  extends React.HTMLProps<HTMLSpanElement> {
  children: number | string;
}

export const NumberTooltip: React.FC<NumberTooltipProps> = ({
  children,
  ...spanProps
}) => {
  const [, themeObject] = useTheme();

  const [triggerText, contentText] = useMemo(() => {
    const content = formatAmountDecimals(String(children));
    const trigger = formatAmountAbbreviation(content);
    return [trigger, content];
  }, [children]);

  return (
    <Tooltip.Root delayDuration={300}>
      <NumberTooltipTrigger asChild>
        <span {...spanProps}>{triggerText}</span>
      </NumberTooltipTrigger>
      {contentText.length > 3 && (
        <NumberTooltipContent className={themeObject}>
          {contentText}
        </NumberTooltipContent>
      )}
    </Tooltip.Root>
  );
};
