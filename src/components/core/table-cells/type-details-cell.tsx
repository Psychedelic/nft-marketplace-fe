import { useTranslation } from 'react-i18next';
import { OperationType } from '../../../constants';
import { Icon, Icons } from '../../icons';
import { TypeDetails, TypeName } from './styles';

export interface TypeDetailsCellProps {
  type: OperationType;
  tableType: any;
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
}: TypeDetailsCellProps) => {
  const { t } = useTranslation();
  return (
    <TypeDetails data-event-type={type}>
      {type && Object.keys(EventIcon).includes(type) && (
        <Icon icon={EventIcon[type]} paddingRight />
      )}
      <TypeName tableType={tableType}>
        {t(`translation:tables.eventType.${type}`)}
      </TypeName>
    </TypeDetails>
  );
};
