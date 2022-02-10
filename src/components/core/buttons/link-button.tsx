/* eslint-disable  @typescript-eslint/no-explicit-any */
import React from 'react';
import { LinkButtonStyles } from './styles';

export type LinkButtonProps = {
  type?: any;
  children?: React.ReactNode;
  url?: string;
};

export const LinkButton = ({
  type,
  children,
  url,
}: LinkButtonProps) => (
  <LinkButtonStyles type={type} href={url} target="_blank">
    {children}
  </LinkButtonStyles>
);
