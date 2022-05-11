import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Principal } from '@dfinity/principal';
import { formatTimestamp } from '../../../../integrations/functions/date';
import {
  KyasshuUrl,
  NSKyasshuUrl,
} from '../../../../integrations/kyasshu';
import { parseE8SAmountToWICP, formatAddress } from '../../../../utils/formatters';
import { AppLog } from '../../../../utils/log';

// TODO: Have these as candid types from https://github.com/Psychedelic/nft-marketplace
type Operations = 'directBuy' | 'makeListing' | 'makeOffer' | 'acceptOffer';

const getOperationType = (operation: Operations) => {
  // TODO: Refactor, the table should use the source type names
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
type TokenTransactionItem = {
  items: {
    name: string,
    logo: string,
  },
  type: Operations,
  price: BigInt,
  from: {
    raw: string,
    formattedAddress: string,
  },
  to: string,
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
      formattedAddress: formatAddress(
        Principal.fromUint8Array(parsedArr).toString()
      ),
    }

    acc = [
      ...acc,
      {
        item: {
          name: `CAP Crowns #${curr.event.details[0][1].U64}`,
          logo: '/static/media/crowns-logo.76ded72b07b1a03258836a39dff4aa7c.svg',
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
