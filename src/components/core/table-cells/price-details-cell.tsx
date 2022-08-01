import wicpIcon from '../../../assets/wicp.svg';
import useMediaQuery from '../../../hooks/use-media-query';
import {
  PriceDetails,
  WICPContainer,
  WICPText,
  WICPLogo,
  PriceText,
} from './styles';

export interface PriceDetailsCellProps {
  wicp?: string;
  price?: string;
  tableType: any;
}

export const PriceDetailsCell = ({
  wicp,
  price,
  tableType,
}: PriceDetailsCellProps) => {
  const isMobileScreen = useMediaQuery('(max-width: 640px');

  return (
    <PriceDetails tableType={tableType}>
      <WICPContainer tableType={tableType}>
        <WICPText tableType={tableType}>{wicp ? wicp : '-'}</WICPText>
        {tableType !== 'activity' ||
          (tableType !== 'nftActivity' && (
            <WICPText tableType={tableType}>
              {wicp ? 'WICP' : '-'}
            </WICPText>
          ))}
        {wicp && <WICPLogo src={wicpIcon} alt="wicp" />}
      </WICPContainer>
      {price && <PriceText tableType={tableType}>{price}</PriceText>}
    </PriceDetails>
  );
};
