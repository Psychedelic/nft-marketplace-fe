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
    case 'makeSaleOffer':
      operationValue = OperationConstants.list;
      break;
    case 'directBuy':
      operationValue = OperationConstants.sale;
      break;
    case 'makeOffer':
      operationValue = OperationConstants.offer;
      break;
    case 'denyOffer':
      operationValue = OperationConstants.denyOffer;
      break;
    case 'cancelOffer':
      operationValue = OperationConstants.cancelOffer;
      break;
    case 'makeListing':
      operationValue = OperationConstants.list;
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
      const parsedArr = Uint8Array.from(
        // eslint-disable-next-line no-underscore-dangle
        Object.values(item.event.caller._arr),
      );
      const callerPrincipalId = Principal.fromUint8Array(parsedArr);
      const callerPrincipalIdString = shortAddress(
        callerPrincipalId.toText(),
      );

      const capData = {
        operation: getOperation(item.event.operation),
        time: dateRelative(item.event.time),
        caller: callerPrincipalIdString,
        callerDfinityExplorerUrl: getICAccountLink(
          callerPrincipalId.toText(),
        ),
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
          from: tableData.caller,
          to: '-',
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
