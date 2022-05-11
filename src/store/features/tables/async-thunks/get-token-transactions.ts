import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Principal } from '@dfinity/principal';
import { formatTimestamp } from '../../../../integrations/functions/date';
import {
  KyasshuUrl,
  NSKyasshuUrl,
} from '../../../../integrations/kyasshu';
import { parseE8SAmountToWICP, formatAddress } from '../../../../utils/formatters';
import { OperationTypes } from '../../../../components/core/table-cells/type-details-cell';
import { AppLog } from '../../../../utils/log';

// TODO: This should not exist, so no need to move to utils or helpers
// only used temporarily to map the operation types to the types known in the UI
// the UI should use the service operation type names instead
const getOperationType = (operation: OperationTypes) => {
  // TODO: Refactor, the table should use the source type names
  // see todo in /src/components/core/table-cells/type-details-cell.tsx
  switch (operation) {
    case 'directBuy':
      return 'sale';
    case 'makeListing':
      return 'list';
    default:
      return operation;
  }
};

// TODO: Should be reused, as table type is similar
// see comment in the nft-activity-table-tsx
type TablePrincipal = {
  raw: string,
  formatted: string,
}

export type TokenTransactionItem = {
  items: {
    name: string,
    logo?: string,
  },
  type: OperationTypes,
  price: BigInt,
  from: TablePrincipal,
  to: TablePrincipal,
  date: string,
};

const parseTokenTransactions = ({
  items,
}: {
  items: any[],
}) => {
  const parsed = items.reduce((acc: any, curr: any) => {
    const parsedArr = Uint8Array.from(
      // eslint-disable-next-line no-underscore-dangle
      Object.values(curr.event.caller._arr),
    );
    const fromPrincipal = Principal.fromUint8Array(parsedArr);
    const from = {
      raw: fromPrincipal.toString(),
      formatted: formatAddress(
        Principal.fromUint8Array(parsedArr).toString()
      ),
    }

    acc = [
      ...acc,
      {
        item: {
          name: `CAP Crowns #${curr.event.details[0][1].U64}`,
        },
        type: getOperationType(curr.event.operation),
        price: parseE8SAmountToWICP(curr.event.details[2][1].U64),
        from,
        to: '',
        date: formatTimestamp(BigInt(curr.event.time)),
        floorDifference: '',
      }
    ];

    return acc;
  }, [] as TokenTransactionItem[]);

  return parsed;
};

export const getTokenTransactions = createAsyncThunk<
  NSKyasshuUrl.GetTokenTransactions | undefined,
  NSKyasshuUrl.GetTokenTransactions
>('table/getTokenTransactions', async ({ tokenId }) => {
  try {
    const response = await axios.get(
      KyasshuUrl.getTokenTransactions({ tokenId }),
    );

    if (!response || response.statusText !== 'OK' || !('Items' in response.data)) {
      throw Error('Oops! Failed to get the token transactions');
    }

    const parsed = parseTokenTransactions({
      items: response.data.Items,
    });

    if (!parsed) {
      throw Error('Oops! Failed to parse the token transactions response');
    }

    return parsed;
  } catch (error) {
    AppLog.error(error);
  }
});
