import React from 'react';
import { OperationType } from '../../../constants';
import { PriceDetailsCell } from './price-details-cell';
import { TextCell } from './text-cell';
import { TypeDetailsCell } from './type-details-cell';
import {
  MobileItemDetailsWrapper,
  MobileItemDetailsContainer,
} from './styles';
import { ItemDetailsCell } from './item-details-cell';

type MobileItemDetailsProps = {
  item?: any;
  type: OperationType;
  price?: string;
  time?: string;
  tableType?: any;
};

const MobileItemDetails = ({
  item,
  type,
  price,
  time,
  tableType,
}: MobileItemDetailsProps) => {
  return (
    <MobileItemDetailsContainer>
      {item && (
        <ItemDetailsCell
          name={item?.name}
          id={item?.token_id}
          logo={item?.logo}
        />
      )}
      {tableType === 'nftActivity' && (
        <TypeDetailsCell
          type={type}
          tableType="nftActivity"
          showIcon={true}
        />
      )}
      <MobileItemDetailsWrapper>
        <TypeDetailsCell type={type} tableType={tableType} />
        <PriceDetailsCell wicp={price} tableType={tableType} />
      </MobileItemDetailsWrapper>
    </MobileItemDetailsContainer>
  );
};

export default MobileItemDetails;
