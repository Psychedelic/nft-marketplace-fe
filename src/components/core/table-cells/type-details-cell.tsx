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
// TODO: The `type` should use the known terms used in the source
// ( https://github.com/Psychedelic/nft-marketplace )
// and these at time of writing are the following: directBuy, makeListing, etc
export type OperationTypes =
  | 'directBuy'
  | 'makeListing'
  | 'makeOffer'
  | 'acceptOffer'
  | 'denyOffer'
  | 'cancelOffer'
  | 'cancelListing';

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
