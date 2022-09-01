import { JellyUtils } from '@psychedelic/jelly-js';
import { HttpAgent } from '@dfinity/agent';
import config from '../../config/env';
import { AppLog } from '../../utils/log';

export const createJellyJsInstance = () => {
  // TODO: create new instance of jelly-js
  const agent = new HttpAgent({ host: config.host });
  const jellyUtils = new JellyUtils(agent as any);

  return jellyUtils;
};

// Checks if an jelly-js instance exists already
// otherwise creates a new instance
export const jellyJsInstanceHandler = async ({
  thunkAPI,
  collectionId,
  slice,
}: {
  // TODO: Where is GetThunkAPI typedef?
  thunkAPI: any;
  collectionId: string;
  // Slice should have a `setJellyJsInstance` action
  slice: any;
}) => {
  const {
    [collectionId]: { jellyJsInstance },
  } = thunkAPI.getState();

  if (!jellyJsInstance) {
    AppLog.warn(
      `Creating new Jelly-js instance for collection ${collectionId}`,
    );

    // TODO: initialisation of jelly-js
    const newJellyJsInstance = createJellyJsInstance();

    // Set jellyjs instance state
    thunkAPI.dispatch(
      slice.actions.setJellyJsInstance(newJellyJsInstance),
    );

    return newJellyJsInstance;
  }

  return jellyJsInstance;
};

