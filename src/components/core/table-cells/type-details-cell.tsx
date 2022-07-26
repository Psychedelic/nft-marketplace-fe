import { useTranslation } from 'react-i18next';
import { OperationType } from '../../../constants';
import { Icons } from '../../icons';
import { TypeDetails, TypeName, StyledIcon } from './styles';

export interface TypeDetailsCellProps {
  type: OperationType;
  tableType?: any;
  showIcon?: boolean;
}

const EventIcon: { [key in OperationType]: keyof typeof Icons } = {
  acceptOffer: 'sale',
  directBuy: 'sale',
  makeListing: 'list',
  cancelListing: 'offer',
  makeOffer: 'offer',
  cancelOffer: 'hand-paper',
  denyOffer: 'hand-paper',
  mint: 'mint',
  transfer: 'transfer',
};

export const TypeDetailsCell = ({
  type,
  tableType,
  showIcon,
}: TypeDetailsCellProps) => {
  const { t } = useTranslation();
  return (
    <TypeDetails data-event-type={type} tableType={tableType}>
      {type && Object.keys(EventIcon).includes(type) && (
        <StyledIcon
          icon={EventIcon[type]}
          paddingRight
          showIcon={showIcon}
        />
      )}
      <TypeName tableType={tableType}>
        {t(`translation:tables.eventType.${type}`)}
      </TypeName>
    </TypeDetails>
  );
};
