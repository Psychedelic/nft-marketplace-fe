import { Principal } from '@dfinity/principal';
import { ActorSubclass } from '@dfinity/agent';
import { createActor } from '../actor';
import marketplaceIdlService from '../../declarations/marketplace';
import config from '../../config/env';
import { notificationActions } from '../../store';

export type MakeListingProps = {
  dispatch: any;
  id: string;
  amount: string;
  onSuccess: any;
  onFailure: any;
};

export const makeListing = async ({
  dispatch,
  id,
  amount,
  onSuccess,
  onFailure,
}: MakeListingProps) => {
  try {
    const directBuy = true;
    const nonFungibleContractAddress = Principal.fromText(
      config.crownsCanisterId,
    );
    const userOwnedTokenId = BigInt(id);
    const userListForPrice = BigInt(amount);
    const actor = (await createActor<marketplaceIdlService>({
      serviceName: 'marketplace',
    })) as ActorSubclass<marketplaceIdlService>;

    await actor.makeListing(
      directBuy,
      nonFungibleContractAddress,
      userOwnedTokenId,
      userListForPrice,
    );

    onSuccess();
  } catch (error) {
    dispatch(notificationActions.setErrorMessage('Oops! Unable to make listing'));
    onFailure();
  }
};
