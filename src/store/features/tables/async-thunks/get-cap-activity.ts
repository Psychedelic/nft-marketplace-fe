import { Principal } from '@dfinity/principal';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { dateRelative } from '../../../../integrations/functions/date';
import shortAddress from '../../../../integrations/functions/short-address';
import { KyasshuUrl } from '../../../../integrations/kyasshu';
import { getICAccountLink } from '../../../../utils/account-id';
import { AppLog } from '../../../../utils/log';
import { notificationActions } from '../../notifications';
import { CapActivityParams, tableActions } from '../table-slice';
import { getOperationType } from '../../../../utils/parser';

export type GetCAPActivityProps = CapActivityParams;

const findEventAuthorByName = (item: any, name: 'buyer' | 'seller') => {
  const found = item.event.details.find((curr: any) => curr[0] === name);

  if (!found || (Array.isArray(found) && found.length !== 2)) return;

  return found[1];
};

const findBuyer = (item: any) => findEventAuthorByName(item, 'buyer');
const findSeller = (item: any) => findEventAuthorByName(item, 'seller');

export const getCAPActivity = createAsyncThunk<
  void,
  GetCAPActivityProps
>(
  'table/getCAPActivity',
  async ({ pageCount, bucketId }, { dispatch }) => {
    if (pageCount === 0) {
      dispatch(tableActions.setIsTableDataLoading(true));
    }

    try {
      const response = await axios.get(
        KyasshuUrl.getCAPActivity({ pageCount, bucketId }),
      );
      const { Items, Count } = response.data;
      let pageNo;

      console.log('[debug] Items', Items);

      const result = Items.map((item: any) => {
        pageNo = item.page;

        const hasSeller = findSeller(item);
        const hasBuyer = findBuyer(item);

        console.log('[debug] hasSeller', hasSeller);
        console.log('[debug] hasBuyer', hasBuyer);

        const parsedArr = Uint8Array.from(
          // eslint-disable-next-line no-underscore-dangle
          Object.values(item.event.caller._arr),
        );
        const callerPrincipalId = Principal.fromUint8Array(parsedArr);
        const callerPrincipalIdString = shortAddress(
          callerPrincipalId.toText(),
        );

        const capData = {
          operation: getOperationType(item.event.operation),
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
  },
);
