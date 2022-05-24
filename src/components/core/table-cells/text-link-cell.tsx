import { TextLinkDetails } from './styles';

export interface TextLinkCellProps {
  text?: string;
  url?: string;
  type: any;
}

export const TextLinkCell = ({ text, type }: TextLinkCellProps) => (
  <TextLinkDetails type={type} target="_blank">
    {text ? text : '-'}
  </TextLinkDetails>
);
