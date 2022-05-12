import { Icon, Icons } from '../../icons';
import { TypeDetails, TypeName } from './styles';

export interface TypeDetailsCellProps {
  name?: string;
  type?: string;
  tableType: any;
}

const EventIcon: { [key: string]: keyof typeof Icons } = {
  acceptOffer: 'sale',
  directBuy: 'sale',
  makeListing: 'list',
  cancelListing: 'list',
  makeOffer: 'offer',
  cancelOffer: 'offer',
  denyOffer: 'offer',
  offer: 'offer',

  // TODO: remove bellow items after list integration is complete
  mint: 'mint',
  list: 'list',
  sale: 'sale',
  transfer: 'transfer',
};

export const TypeDetailsCell = ({
  name,
  type,
  tableType,
}: TypeDetailsCellProps) => (
  <TypeDetails>
    {type && Object.keys(EventIcon).includes(type) && (
      <Icon icon={EventIcon[type]} paddingRight />
    )}
    <TypeName tableType={tableType}>{name}</TypeName>
  </TypeDetails>
);
