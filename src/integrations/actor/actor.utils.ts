/* eslint-disable */
import { ActorSubclass } from '@dfinity/agent';
import crownsIdlFactory from '../../declarations/nft.did';
import wicpIdlFactory from '../../declarations/wicp.did';
import marketplaceIdlFactory from '../../declarations/marketplace.did';
import capIdlFactory from '../../declarations/cap.did';
import config from '../../config/env';
import { AppLog } from '../../utils/log';

export type ServiceName = 'marketplace' | 'crowns' | 'wicp' | 'cap';

export const createActor = async <T>({
  serviceName = 'marketplace',
}: {
  serviceName?: ServiceName;
}) => {
  console.log('[debug] actor.utils.ts: bp:', 1);

  // Fetch root key for certificate validation during development
  if (process.env.NODE_ENV !== 'production') {
    try {
      // The `delay` is required to prevent a false negative
      // as the Plug wallet needs to be ready
      // which is not the case on page refresh
      // Otherwise, this cause `No Agent could be found`
      await new Promise((resolve) => setTimeout(resolve, 1800));
      await window.ic?.plug?.agent.fetchRootKey();
    } catch (err) {
      AppLog.error(
        'Oops! Unable to fetch root key, is the local replica running?',
        err,
      );
    }
  }

  if (serviceName === 'crowns') {
    return await window.ic?.plug?.createActor({
      canisterId: config.crownsCanisterId,
      interfaceFactory: crownsIdlFactory,
    });
  }

  if (serviceName === 'wicp') {
    return await window.ic?.plug?.createActor({
      canisterId: config.wICPCanisterId,
      interfaceFactory: wicpIdlFactory,
    });
  }
  console.log('[debug] actor.utils.ts: bp:', 2);
  if (serviceName === 'cap') {
    console.log('[debug] actor.utils.ts: bp:', 3);
    return await window.ic?.plug?.createActor({
      canisterId: config.capRouterId,
      interfaceFactory: capIdlFactory,
    });
  }

  return await window.ic?.plug?.createActor({
    canisterId: config.marketplaceCanisterId,
    interfaceFactory: marketplaceIdlFactory,
  });
};

// Checks if an actor instance exists already
// otherwise creates a new instance
export const actorInstanceHandler = async <T>({
  thunkAPI,
  serviceName,
  slice,
}: {
  // TODO: Where is GetThunkAPI typedef?
  thunkAPI: any;
  serviceName: ServiceName;
  // Slice should have a `setActor` action
  slice: any;
}) => {
  console.log('[debug] actor.utils.ts: actorInstanceHandler: bp:', 1);
  
  const {
    [serviceName]: { actor },
  } = thunkAPI.getState();

  console.log('[debug] actor.utils.ts: actorInstanceHandler: bp:', 2);

  if (!actor) {
    const actor = (await createActor<T>({
      serviceName,
    })) as ActorSubclass<T>;

    console.log('[debug] actor.utils.ts: actorInstanceHandler: bp:', 3);

    // Set actor state
    thunkAPI.dispatch(slice.actions.setActor(actor));

    return actor;
  }

  return actor;
};
