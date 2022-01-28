import React from 'react';
import transferLogo from '../../../assets/transfer-logo.svg';
import mintLogo from '../../../assets/mint-logo.svg';
import listLogo from '../../../assets/list-logo.svg';
import saleLogo from '../../../assets/sale-logo.svg';
import { TypeDetails, TypeLogo, TypeName } from './styles';

export interface TypeDetailsCellProps {
  name?: string;
  type?: string;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  tableType: any;
}

export const TypeDetailsCell = ({
  name,
  type,
  tableType,
}: TypeDetailsCellProps) => (
  <TypeDetails>
    {type === 'transfer' && (
      <TypeLogo src={transferLogo} alt="transfer" />
    )}
    {type === 'mint' && <TypeLogo src={mintLogo} alt="mint" />}
    {type === 'list' && <TypeLogo src={listLogo} alt="list" />}
    {type === 'sale' && <TypeLogo src={saleLogo} alt="sale" />}
    <TypeName tableType={tableType}>{name}</TypeName>
  </TypeDetails>
);
