import React, { useMemo } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { StyledContent, StyledArrow } from './styles';
import { useTheme } from '../../../hooks';
import {
  formatAmountAbbreviation,
  formatAmountDecimals,
} from '../../../utils/formatters';

/* --------------------------------------------------------------------------
 * Balance Tooltip Component
 * --------------------------------------------------------------------------*/

export type BalanceTooltipProps = {
  text?: string;
};

export const BalanceTooltip = ({ text }: BalanceTooltipProps) => {
  const [, themeObject] = useTheme();

  const handleTooltipOpen = (status: boolean) => {
    const applicationBody = document.querySelector('body');

    if (!applicationBody) return;

    if (status) {
      applicationBody?.classList.add('tooltip-open');

      return;
    }

    if (applicationBody?.classList.contains('tooltip-open')) {
      applicationBody?.classList.remove('tooltip-open');
    }
  };

  const [triggerText, contentText] = useMemo(() => {
    const content = formatAmountDecimals(String(text));
    const trigger = formatAmountAbbreviation(content);
    return [trigger, content];
  }, [text]);

  return (
    <TooltipPrimitive.Root
      delayDuration={300}
      onOpenChange={handleTooltipOpen}
    >
      <TooltipPrimitive.Trigger asChild>
        <span>{triggerText}</span>
      </TooltipPrimitive.Trigger>
      {text && contentText && contentText.length > 3 && (
        <StyledContent sideOffset={5} className={themeObject}>
          {contentText}
          <StyledArrow />
        </StyledContent>
      )}
    </TooltipPrimitive.Root>
  );
};
