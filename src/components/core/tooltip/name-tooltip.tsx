import React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { StyledContent, StyledArrow } from './styles';
import { useTheme } from '../../../hooks';
import { formatICNSName } from '../../../utils/icns';

/* --------------------------------------------------------------------------
 * Balance Tooltip Component
 * --------------------------------------------------------------------------*/

export type NameTooltipProps = {
  name?: string;
};

export const NameTooltip = ({ name }: NameTooltipProps) => {
  const [, themeObject] = useTheme();

  const handleTooltipOpen = (status: boolean) => {
    console.log('tooltip opened');
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

  return (
    <TooltipPrimitive.Root
      delayDuration={300}
      onOpenChange={handleTooltipOpen}
    >
      <TooltipPrimitive.Trigger asChild>
        <span>{formatICNSName(name)}</span>
      </TooltipPrimitive.Trigger>
      {name && name.length > 13 && (
        <StyledContent sideOffset={5} className={themeObject}>
          {name}
          <StyledArrow />
        </StyledContent>
      )}
    </TooltipPrimitive.Root>
  );
};
