import { createAsyncThunk } from '@reduxjs/toolkit';
import { Principal } from '@dfinity/principal';
import { capSlice } from '../cap-slice';
import { actorInstanceHandler } from '../../../../integrations/actor';
import { AppLog } from '../../../../utils/log';
import { notificationActions } from '../../notifications';
import { sortActivitiesByTime } from '../../../../utils/sorting';
import {
  getOperationType,
  parseTablePrincipal,
} from '../../../../utils/parser';
import { formatTimestamp } from '../../../../integrations/functions/date';
import { tableActions } from '../../tables/table-slice';
import { capRootActions } from '../cap-root-slice';

type GetUserTransactions = {
  bucketId: Principal;
  page: number;
  plugPrincipal: string;
};

export const getUserTransactions = createAsyncThunk<
  void,
  GetUserTransactions
>(
  'capRoot/getUserTransactions',
  async ({ page, bucketId, plugPrincipal }, thunkAPI) => {
    thunkAPI.dispatch(capRootActions.setLoading(true));

    // Checks if an actor instance exists already
    // otherwise creates a new instance
    const actorInstance = await actorInstanceHandler({
      thunkAPI,
      serviceName: 'capRoot',
      slice: capSlice,
      data: {
        bucketId,
      },
    });

    try {
      const userAddress = Principal.fromText(plugPrincipal);
      const response = await actorInstance.get_user_transactions({
        user: userAddress,
        page,
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
            name: `CAP Crowns #${tableData.token_id}`,
            token_id: tableData.token_id,
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
        currentPage: page,
        nextPage: pageNo + 1,
      };

      thunkAPI.dispatch(
        tableActions.setUserActivityTable(actionPayload),
      );
    } catch (err) {
      AppLog.error(err);
      thunkAPI.dispatch(
        notificationActions.setErrorMessage(
          'Oops! Unable to fetch user activity table data',
        ),
      );
    } finally {
      thunkAPI.dispatch(capRootActions.setLoading(false));
    }
  },
);

