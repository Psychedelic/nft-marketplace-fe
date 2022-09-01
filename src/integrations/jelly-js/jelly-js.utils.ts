import { AppLog } from '../../utils/log';

export const createJellyJsInstance = async ({
  canisterId,
}: {
  canisterId: string;
}) =>
  // TODO: create new instance of jelly-js
  ({ canisterId });

// Checks if an jelly-js instance exists already
// otherwise creates a new instance
export const jellyJsInstanceHandler = async ({
  thunkAPI,
  canisterId,
  slice,
}: {
  // TODO: Where is GetThunkAPI typedef?
  thunkAPI: any;
  canisterId: string;
  // Slice should have a `setJellyJsInstance` action
  slice: any;
}) => {
  const {
    [canisterId]: { jellyJsInstance },
  } = thunkAPI.getState();

  if (!jellyJsInstance) {
    AppLog.warn(`Creating new Jelly-js instance for ${canisterId}`);

    // TODO: initialisation of jelly-js
    const newJellyJsInstance = {};

    // Set jellyjs instance state
    thunkAPI.dispatch(
      slice.actions.setJellyJsInstance(newJellyJsInstance),
    );

    return newJellyJsInstance;
  }

  return jellyJsInstance;
};

