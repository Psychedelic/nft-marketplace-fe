import React from 'react';
import transferLogo from '../../../assets/transfer-logo.svg';
import transferLogoDark from '../../../assets/transfer-logo-dark.svg';
import mintLogo from '../../../assets/mint-logo.svg';
import mintLogoDark from '../../../assets/mint-logo-dark.svg';
import listLogo from '../../../assets/list-logo.svg';
import listLogoDark from '../../../assets/list-logo-dark.svg';
import saleLogo from '../../../assets/sale-logo.svg';
import saleLogoDark from '../../../assets/sale-logo-dark.svg';
import { TypeDetails, TypeLogo, TypeName } from './styles';

export interface TypeDetailsCellProps {
  name?: string;
  type?: string;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  tableType: any;
  theme: string | null;
}

// TODO: The `type` should use the known terms used in the source
// ( https://github.com/Psychedelic/nft-marketplace )
// and these at time of writing are the following: directBuy, makeListing, etc
export type OperationTypes = 'directBuy' | 'makeListing' | 'makeOffer' | 'acceptOffer';

export const TypeDetailsCell = ({
  name,
  type,
  tableType,
  theme,
}: TypeDetailsCellProps) => {
  const isLightTheme = theme === 'lightTheme';

  return (
    <TypeDetails>
      {type === 'offer' && (
        <TypeLogo
          src={isLightTheme ? transferLogo : transferLogoDark}
          alt="transfer"
        />
      )}
      {type === 'mint' && (
        <TypeLogo
          src={isLightTheme ? mintLogo : mintLogoDark}
          alt="mint"
        />
      )}
      {type === 'list' && (
        <TypeLogo
          src={isLightTheme ? listLogo : listLogoDark}
          alt="list"
        />
      )}
      {type === 'sale' && (
        <TypeLogo
          src={isLightTheme ? saleLogo : saleLogoDark}
          alt="sale"
        />
      )}
      <TypeName tableType={tableType}>{name}</TypeName>
    </TypeDetails>
  );
};
