import React from 'react';
import { OperationType } from '../../../constants';
import { PriceDetailsCell, TextCell, TypeDetailsCell } from '..';
import { MobileItemDetailsWrapper } from './styles';

type MobileItemDetailsProps = {
  type: OperationType;
  price?: string;
  time?: string;
  tableType: any;
};

const MobileItemDetails = ({
  type,
  price,
  time,
  tableType,
}: MobileItemDetailsProps) => {
  return (
    <MobileItemDetailsWrapper tableType={tableType}>
      <TypeDetailsCell type={type} />
      <PriceDetailsCell wicp={price && price} tableType={tableType} />
      <TextCell text={time} type="activityTime" />
    </MobileItemDetailsWrapper>
  );
};

export default MobileItemDetails;
