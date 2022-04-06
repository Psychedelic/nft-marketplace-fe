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
}: TextLinkCellProps) => {
  console.log('.');
  return (
    // TO-DO: Make variable
    <TextLinkDetails
      type={type}
      href={url}
      target="_blank"
    >
      {text}
    </TextLinkDetails>
  );
};
