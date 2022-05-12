import { Principal } from '@dfinity/principal';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { OperationConstants } from '../../../../constants';
import { dateRelative } from '../../../../integrations/functions/date';
import shortAddress from '../../../../integrations/functions/short-address';
import { KyasshuUrl } from '../../../../integrations/kyasshu';
import { getICAccountLink } from '../../../../utils/account-id';
import { AppLog } from '../../../../utils/log';
import { notificationActions } from '../../errors';
import { CapActivityParams, tableActions } from '../table-slice';

export type GetCAPActivityProps = CapActivityParams;

const getOperation = (operationType: string) => {
  let operationValue;
  switch (operationType) {
    case 'makeListing':
      operationValue = OperationConstants.makeListing;
      break;
    case 'directBuy':
      operationValue = OperationConstants.directBuy;
      break;
    case 'makeOffer':
      operationValue = OperationConstants.makeOffer;
      break;
    case 'denyOffer':
      operationValue = OperationConstants.denyOffer;
      break;
    case 'cancelOffer':
      operationValue = OperationConstants.cancelOffer;
      break;
    case 'cancelListing':
      operationValue = OperationConstants.cancelListing;
      break;
    case 'acceptOffer':
      operationValue = OperationConstants.acceptOffer;
      break;
    default:
  }
  return operationValue;
};

const getFormattedPrincipal = (arr: any) => {
  // eslint-disable-next-line no-underscore-dangle
  if (!arr) return;

  const parsedArr = Uint8Array.from(
    // eslint-disable-next-line no-underscore-dangle
    Object.values(arr),
  );
  const raw = Principal.fromUint8Array(parsedArr);
  const text = raw.toText();
  const formatted = shortAddress(
    raw.toText(),
  );

  return {
    raw,
    text,
    formatted,
  };
};

export const getCAPActivity = createAsyncThunk<
  void,
  GetCAPActivityProps
>('table/getCAPActivity', async ({ pageCount, bucketId }, { dispatch }) => {
  if (pageCount === 0) {
    dispatch(tableActions.setIsTableDataLoading(true));
  }

  try {
    const response = await axios.get(
      KyasshuUrl.getCAPActivity({ pageCount, bucketId, }),
    );
    const { Items, Count } = response.data;
    let pageNo;

    const result = Items.map((item: any) => {
      pageNo = item.page;

      // eslint-disable-next-line no-underscore-dangle
      const parsedFromPrincipal = (() => {
        if (item?.event?.details?.[2]?.[0] !== 'buyer') {
          // eslint-disable-next-line no-underscore-dangle
          return getFormattedPrincipal(item?.event?.details?.[3]?.[1]?.Principal?._arr);
        };

        // eslint-disable-next-line no-underscore-dangle
        return getFormattedPrincipal(item?.event?.caller?._arr);
      })();
      const parsedToPrincipal = (() => {
        if (item?.event?.details?.[2]?.[0] !== 'buyer') return;

        // eslint-disable-next-line no-underscore-dangle
        return getFormattedPrincipal(item?.event?.details?.[3]?.[1]?.Principal?._arr);
      })();

      if (!parsedFromPrincipal) return;

      const capData = {
        operation: getOperation(item.event.operation),
        time: dateRelative(item.event.time),
        caller: parsedFromPrincipal.formatted,
        callerDfinityExplorerUrl: getICAccountLink(
          parsedFromPrincipal?.raw.toString(),
        ),
        from: parsedFromPrincipal.formatted,
        to: parsedToPrincipal?.formatted,
      };

      const { details } = item.event;
      details.forEach((detail: any) => {
        const [key, value] = detail;
        (capData as any)[key] = value.U64 ?? value;
      });

      return capData;
    });

    const loadedCapActivityTableData = result.map(
      (tableData: any) => {
        const data = {
          item: {
            name: `CAP Crowns #${tableData.token_id}`,
            token_id: tableData.token_id,
          },
          type: tableData.operation,
          price: `${tableData.list_price ?? tableData.price}`,
          from: tableData.from,
          to: tableData.to,
          time: tableData.time,
          offerFrom: 'Prasanth',
          callerDfinityExplorerUrl:
            tableData.callerDfinityExplorerUrl,
        };

        return data;
      },
    );

    const actionPayload = {
      loadedCapActivityTableData,
      totalPages: pageNo ? parseInt(pageNo, 10) : 0,
      total: Count ? parseInt(Count, 10) : 0,
      nextPage: Count === 64 ? pageCount + 1 : pageCount,
    };

    dispatch(tableActions.setCapActivityTable(actionPayload));
  } catch (error) {
    AppLog.error(error);
    dispatch(
      notificationActions.setErrorMessage(
        'Oops! Unable to fetch activity table data',
      ),
    );
  }
});
