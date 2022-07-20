import React from 'react';
import { TextDetails } from './styles';

export interface TextCellProps {
  text?: string;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  type?: any;
  tableType?: any;
}

export const TextCell = ({
  text,
  type,
  tableType,
}: TextCellProps) => (
  <TextDetails
    type={type}
    tableType={tableType}
  >
    {text ? text : '-'}
  </TextDetails>
);
