import { styled } from '@stitches/react';
import * as Tooltip from '@radix-ui/react-tooltip';

export const NumberTooltipTrigger = styled(Tooltip.Trigger, {
  userSelect: 'none',
  margin: '-0.5rem',
  padding: '0.5rem',
});

export const NumberTooltipContent = styled(Tooltip.Content, {
  padding: '0.5rem 1rem',
  backgroundColor: '$backgroundColor',
  border: '1px solid $borderColor',
  color: '$mainTextColor',
  boxShadow: '$active',
  borderRadius: '5px',
  fontWeight: 'bold',
  marginTop: '-0.7rem',
});
