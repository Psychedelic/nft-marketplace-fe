import React from 'react';
import { LinkButtonStyles } from './styles';

export type LinkButtonProps = {
  background?: string;
  outline?: boolean;
  text?: string;
  children?: React.ReactNode;
  url?: string;
};

export const LinkButton = ({
  background,
  outline,
  text,
  children,
  url,
}: LinkButtonProps) => (
  <LinkButtonStyles
    href={url}
    backgroundColor={background}
    outline={outline}
    text={text}
  >
    {children}
  </LinkButtonStyles>
);
