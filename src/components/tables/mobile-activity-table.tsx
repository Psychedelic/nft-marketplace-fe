import React from 'react';
import { OperationType } from '../../constants';
import { parseE8SAmountToWICP } from '../../utils/formatters';
import { PriceDetailsCell, TextCell, TypeDetailsCell } from '../core';

type MobileActivityTableProps = {
  type: OperationType;
  price?: string;
  time?: string;
};

const MobileActivityTable = ({
  type,
  price,
  time,
}: MobileActivityTableProps) => {
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

export default MobileActivityTable;
