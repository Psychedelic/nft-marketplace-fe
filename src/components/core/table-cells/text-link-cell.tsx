import React from 'react';
import { TextLinkDetails } from './styles';

export interface TextLinkCellProps {
  text?: string;
  url?: string;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  type: any;
}

export const TextLinkCell = ({
  text,
  url,
  type,
}: TextLinkCellProps) => (
  // TO-DO: Make variable
  <TextLinkDetails type={type} href={`https://dashboard.internetcomputer.org/account/${text}`} target="_blank">
    {text}
  </TextLinkDetails>
);
