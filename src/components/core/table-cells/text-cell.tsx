import React from 'react';
import { TextDetails } from './styles';

export interface TextCellProps {
  text?: string;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  type: any;
}

export const TextCell = ({ text, type }: TextCellProps) => (
  <TextDetails type={type}>{text ? text : '-'}</TextDetails>
);
