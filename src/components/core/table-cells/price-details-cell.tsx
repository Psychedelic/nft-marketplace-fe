import wicpIcon from '../../../assets/wicp.svg';
import {
  PriceDetails,
  WICPContainer,
  WICPText,
  WICPLogo,
  PriceText,
} from './styles';

export interface PriceDetailsCellProps {
  wicp: string;
  price?: string;
  tableType: any;
}

export const PriceDetailsCell = ({
  wicp,
  price,
  tableType,
}: PriceDetailsCellProps) => (
  <PriceDetails>
    <WICPContainer tableType={tableType}>
      <WICPText tableType={tableType}>{wicp ? wicp : '-'}</WICPText>
      {wicp && <WICPLogo src={wicpIcon} alt="wicp" />}
    </WICPContainer>
    {price && <PriceText tableType={tableType}>{price}</PriceText>}
  </PriceDetails>
);
