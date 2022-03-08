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

export const TypeDetailsCell = ({
  name,
  type,
  tableType,
  theme,
}: TypeDetailsCellProps) => {
  const isLightTheme = theme === 'lightTheme';

  return (
    <TypeDetails>
      {type === 'transfer' && (
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
