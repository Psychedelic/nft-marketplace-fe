import { TextLinkDetails } from './styles';

export interface TextLinkCellProps {
  text?: string;
  url?: string;
  type: any;
}

export const TextLinkCell = ({ text, type, url }: TextLinkCellProps) => (
  <TextLinkDetails type={type} href={url} target="_blank">
    {text ? text : '-'}
  </TextLinkDetails>
);
