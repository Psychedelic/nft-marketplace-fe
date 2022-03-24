import { ActorSubclass } from '@dfinity/agent';
import { createActor } from '../integrations/actor';
import { ServiceName } from '../integrations/actor/actor.utils';

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
  const {
    marketplace: { actor },
  } = thunkAPI.getState();

  if (!actor) {
    const actor = (await createActor<T>({
      serviceName,
    })) as ActorSubclass<T>;

    // Set actor state
    thunkAPI.dispatch(slice.actions.setActor(actor));

    return actor;
  }

  return actor;
};
