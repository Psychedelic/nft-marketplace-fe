import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { dateRelative } from '../../../../integrations/functions/date';
import { KyasshuUrl } from '../../../../integrations/kyasshu';
import { AppLog } from '../../../../utils/log';
import { notificationActions } from '../../notifications';
import { CapActivityParams, tableActions } from '../table-slice';
import {
  getOperationType,
  parseTablePrincipal,
} from '../../../../utils/parser';

export type GetCAPActivityProps = CapActivityParams;

export const getCAPActivity = createAsyncThunk<
  void,
  GetCAPActivityProps
>(
  'table/getCAPActivity',
  async ({ pageCount, bucketId, collectionName }, { dispatch }) => {
    const HttpGetKyasshuUrl = KyasshuUrl.getCAPActivity({
      pageCount,
      bucketId,
    });

    dispatch(tableActions.setIsTableDataLoading(true));

    try {
      const response = await axios.get(HttpGetKyasshuUrl);

      const { Items, Count } = response.data;
      let pageNo;
      const result = Items.map((item: any) => {
        pageNo = item.page;

        const capData = {
          operation: getOperationType(item.event.operation),
          time: dateRelative(item.event.time),
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

          const tokenId =
            tableData?.token_id?.Text ?? tableData.token_id;

          const data = {
            item: {
              // TODO: name should be based in collection
              name: `${collectionName} #${tokenId}`,
              token_id: tokenId,
            },
            type: tableData.operation,
            price: `${tableData.list_price ?? tableData.price}`,
            seller,
            buyer,
            time: tableData.time,
            callerDfinityExplorerUrl:
              tableData.callerDfinityExplorerUrl,
          };

          return data;
        },
      );

      const actionPayload = {
        loadedCapActivityTableData,
        currentPage: pageCount,
        nextPage: Number(pageNo) - 1,
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
