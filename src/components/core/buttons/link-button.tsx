/* eslint-disable  @typescript-eslint/no-explicit-any */
import React from 'react';
import { LinkButtonStyles } from './styles';

export type LinkButtonProps = {
  type?: any;
  children?: React.ReactNode;
  url?: string;
  handleClick?: () => void;
};

export const LinkButton = ({
  type,
  children,
  url,
  handleClick,
}: LinkButtonProps) => (
  <LinkButtonStyles
    type={type}
    href={url}
    target="_blank"
    onClick={handleClick}
    role="link"
    tabIndex={0}
    onKeyDown={(event: any) => {
      if (event.keyCode === 13 && handleClick) handleClick();
    }}
  >
    {children}
  </LinkButtonStyles>
);
