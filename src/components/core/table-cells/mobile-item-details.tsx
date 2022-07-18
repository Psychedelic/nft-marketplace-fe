import React from 'react';
import { OperationType } from '../../../constants';
import { parseE8SAmountToWICP } from '../../../utils/formatters';
import { PriceDetailsCell, TextCell, TypeDetailsCell } from '..';

type MobileItemDetailsProps = {
  type: OperationType;
  price?: string;
  time?: string;
};

const MobileItemDetails = ({
  type,
  price,
  time,
}: MobileItemDetailsProps) => {
  return (
    <div>
      <TypeDetailsCell type={type} tableType="" />
      <PriceDetailsCell
        wicp={price && parseE8SAmountToWICP(BigInt(price))}
        tableType=""
      />
      <TextCell text={time} type="activityTime" />
    </div>
  );
};

export default MobileItemDetails;
