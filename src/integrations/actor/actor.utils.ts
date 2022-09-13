import { Actor, ActorSubclass, HttpAgent } from '@dfinity/agent';
import { IDL } from '@dfinity/candid';
import nftIdlFactory from '../../declarations/nft.did';
import wicpIdlFactory from '../../declarations/wicp.did';
import marketplaceIdlFactory from '../../declarations/marketplace.did';
import capIdlFactory from '../../declarations/cap.did';
import config from '../../config/env';
import { AppLog } from '../../utils/log';

export type ServiceName =
  | 'marketplace'
  | 'crowns'
  | 'wicp'
  | 'cap'
  | 'dip721';

export const createActor = async ({
  serviceName = 'marketplace',
  plugIsConnected = false,
  asPlugInstance = true,
  collectionId,
}: {
  serviceName?: ServiceName;
  plugIsConnected?: boolean;
  asPlugInstance?: boolean;
  collectionId?: string;
}) => {
  let canisterId: string;
  let interfaceFactory: IDL.InterfaceFactory;

  switch (serviceName) {
    case 'dip721':
      if (!collectionId)
        throw Error('Oops! Missing NFT Collection id.');

      canisterId = collectionId;
      interfaceFactory = nftIdlFactory;
      break;
    case 'crowns':
      canisterId = config.nftCollectionId;
      interfaceFactory = nftIdlFactory;
      break;
    case 'wicp':
      canisterId = config.wICPCanisterId;
      interfaceFactory = wicpIdlFactory;
      break;
    case 'cap':
      canisterId = config.capRouterId;
      interfaceFactory = capIdlFactory;
      break;
    default:
      canisterId = config.marketplaceCanisterId;
      interfaceFactory = marketplaceIdlFactory;
      break;
  }

  if (plugIsConnected && asPlugInstance) {
    return window.ic?.plug?.createActor({
      canisterId,
      interfaceFactory,
      host: config.host,
    });
  }

  const agent = new HttpAgent({
    host: config.host,
  });

  if (process.env.NODE_ENV !== 'production') {
    try {
      await agent.fetchRootKey();
    } catch (err) {
      console.warn(
        'Oops! Unable to fetch root key, is the local replica running?',
      );
      console.error(err);
    }
  }

  return Actor.createActor(interfaceFactory, {
    agent,
    canisterId,
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
  const {
    [serviceName]: { actor },
    plug: { isConnected: plugIsConnected },
  } = thunkAPI.getState();

  const currentAgent = actor && Actor.agentOf(actor);
  const currentAgentPrincipal =
    currentAgent && (await currentAgent.getPrincipal());

  const plugAgent = plugIsConnected && window.ic?.plug?.agent;
  const plugAgentPrincipal =
    plugAgent && (await plugAgent.getPrincipal());

  const isAnotherAgent =
    !currentAgentPrincipal ||
    (plugAgentPrincipal &&
      currentAgentPrincipal !== plugAgentPrincipal);

  if (!actor || isAnotherAgent) {
    AppLog.warn(`Creating new actor instance for ${serviceName}`);

    const asPlugInstance = serviceName !== 'cap';

    const newActor = (await createActor({
      serviceName,
      plugIsConnected,
      asPlugInstance,
    })) as ActorSubclass<T>;

    // Set actor state
    thunkAPI.dispatch(slice.actions.setActor(newActor));

    return newActor;
  }

  return actor;
};
