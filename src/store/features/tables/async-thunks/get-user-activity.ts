import { createAsyncThunk } from '@reduxjs/toolkit';
import { Principal } from '@dfinity/principal';
import { CapRoot } from '@psychedelic/cap-js';
import { formatTimestamp } from '../../../../integrations/functions/date';
import { AppLog } from '../../../../utils/log';
import { notificationActions } from '../../notifications';
import { UserActivityParams, tableActions } from '../table-slice';
import {
  getOperationType,
  parseTablePrincipal,
} from '../../../../utils/parser';
import config from '../../../../config/env';
import { sortActivitiesByTime } from '../../../../utils/sorting';

export type GetUserActivityProps = UserActivityParams;

export const getUserActivity = createAsyncThunk<
  void,
  GetUserActivityProps
>(
  'table/getUserActivity',
  async ({ pageCount, bucketId, plugPrincipal }, { dispatch }) => {
    dispatch(tableActions.setIsTableDataLoading(true));

    try {
      const userAddress = Principal.fromText(plugPrincipal);

      const capRoot = await CapRoot.init({
        host: config.host,
        canisterId: bucketId.toString(),
      });

      const response = await capRoot.get_user_transactions({
        // Obs: type diff in Principal typedef in packages
        // current @dfinity/principal and cap-js @dfinity/principal
        user: userAddress as any,
        page: pageCount,
        witness: false,
      });

      const { data, page: pageNo } = response;

      const activities = sortActivitiesByTime(data);

      const result = activities.map((activity: any) => {
        const capData = {
          operation: getOperationType(activity.operation),
          time: formatTimestamp(activity.time),
        };

        const { details } = activity;
        details.forEach((detail: any) => {
          const [key, value] = detail;
          (capData as any)[key] = value.U64 ?? value;
        });

        return capData;
      });

      const loadedUserActivityData = result.map((tableData: any) => {
        // eslint-disable-next-line no-underscore-dangle
        const seller = parseTablePrincipal(
          // eslint-disable-next-line no-underscore-dangle
          tableData.seller.Principal._arr,
        );
        // eslint-disable-next-line no-underscore-dangle
        const buyer =
          tableData?.buyer &&
          // eslint-disable-next-line no-underscore-dangle
          parseTablePrincipal(tableData.buyer.Principal._arr);

        return {
          item: {
            // TODO: name should be based in collection
            name: `CAP Crowns #${tableData.token_id.Text}`,
            token_id: tableData.token_id.Text,
          },
          type: tableData.operation,
          price: `${tableData.list_price ?? tableData.price}`,
          seller,
          buyer,
          time: tableData.time,
          callerDfinityExplorerUrl:
            tableData.callerDfinityExplorerUrl,
        };
      });

      const actionPayload = {
        loadedUserActivityData,
        currentPage: pageCount,
        nextPage: pageNo + 1,
      };

      dispatch(tableActions.setUserActivityTable(actionPayload));
    } catch (error) {
      AppLog.error(error);
      dispatch(
        notificationActions.setErrorMessage(
          'Oops! Unable to fetch user activity table data',
        ),
      );
    }
  },
);
