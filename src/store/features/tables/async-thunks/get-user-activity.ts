import { createAsyncThunk } from '@reduxjs/toolkit';
import { Principal } from '@dfinity/principal';
// import { CapRoot } from '@psychedelic/cap-js';
import { formatTimestamp } from '../../../../integrations/functions/date';
import { AppLog } from '../../../../utils/log';
import { notificationActions } from '../../notifications';
import { UserActivityParams, tableActions } from '../table-slice';
import { capRootSlice } from '../../cap/cap-root-slice';
import {
  getOperationType,
  parseTablePrincipal,
} from '../../../../utils/parser';
import { actorInstanceHandler } from '../../../../integrations/actor';
import { sortActivitiesByTime } from '../../../../utils/sorting';

export type GetUserActivityProps = UserActivityParams;

export const getUserActivity = createAsyncThunk<
  void,
  GetUserActivityProps
>(
  'table/getUserActivity',
  async ({ pageCount, bucketId, plugPrincipal }, thunkAPI) => {
    console.log('[debug] getUserActivity');

    console.log(0);

    thunkAPI.dispatch(tableActions.setIsTableDataLoading(true));

    console.log(1);

    // Checks if an actor instance exists already
    // otherwise creates a new instance
    const actorInstance = await actorInstanceHandler({
      thunkAPI,
      serviceName: 'capRoot',
      slice: capRootSlice,
      data: {
        bucketId,
      },
    });

    console.log(2);

    console.log('[debug] actorInstance', actorInstance);

    try {
      // const userAddress = Principal.fromText(plugPrincipal);

      // const capRoot = await CapRoot.init({
      //   host: config.host,
      //   canisterId: bucketId.toString(),
      // });

      // const response = await capRoot.get_user_transactions({
      //   // Obs: type diff in Principal typedef in packages
      //   // current @dfinity/principal and cap-js @dfinity/principal
      //   user: userAddress as any,
      //   page: pageCount,
      //   witness: false,
      // });

      const response = await actorInstance.get_user_transactions({
        bucketId: Principal.fromText(bucketId),
        page: [pageCount],
        user: Principal.fromText(plugPrincipal),
        witness: false,
      });

      console.log('[debug] response', response);

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
        currentPage: pageCount,
        nextPage: pageNo + 1,
      };

      thunkAPI.dispatch(
        tableActions.setUserActivityTable(actionPayload),
      );
    } catch (error) {
      AppLog.error(error);
      thunkAPI.dispatch(
        notificationActions.setErrorMessage(
          'Oops! Unable to fetch user activity table data',
        ),
      );
    }
  },
);

