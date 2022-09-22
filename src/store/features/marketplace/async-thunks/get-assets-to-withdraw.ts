import { createAsyncThunk } from '@reduxjs/toolkit';
import { marketplaceSlice } from '../marketplace-slice';
import { AppLog } from '../../../../utils/log';
import { parseBalanceResponse } from '../../../../utils/parser';
import { settingsActions } from '../../settings';
import { jellyJsInstanceHandler } from '../../../../integrations/jelly-js';
import { getJellyCollection } from '../../../../utils/jelly';
import { getPrincipal } from '../../../../integrations/plug';

export type GetAssetsToWithdrawProps = {
  collectionId: string;
};

export const getAssetsToWithdraw = createAsyncThunk<
  any | undefined,
  GetAssetsToWithdrawProps
>('marketplace/balanceOf', async (params, thunkAPI) => {
  const { collectionId } = params;

  const jellyInstance = await jellyJsInstanceHandler({
    thunkAPI,
    collectionId,
    slice: marketplaceSlice,
  });

  try {
    const collection = await getJellyCollection({
      jellyInstance,
      collectionId,
    });

    if (!collection)
      throw Error(`Oops! collection ${collectionId} not found!`);

    const jellyCollection = await jellyInstance.getJellyCollection(
      collection,
    );

    const assetsToWithdrawResponse =
      await jellyCollection.getAssetsToWithdraw({
        user: await getPrincipal(),
      });

    const assetsToWithdraw =
      !Array.isArray(assetsToWithdrawResponse) ||
      !assetsToWithdrawResponse.length
        ? []
        : parseBalanceResponse(assetsToWithdrawResponse);

    if (!assetsToWithdraw.length) return;

    thunkAPI.dispatch(settingsActions.setAlerts(assetsToWithdraw));

    return assetsToWithdraw;
  } catch (err) {
    AppLog.error(err);
  }
});

