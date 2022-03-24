import { Principal } from '@dfinity/principal';
import { ActorSubclass } from '@dfinity/agent';
import { createActor } from '../actor';
import marketplaceIdlService from '../../declarations/marketplace';
import config from '../../config/env';
import { errorActions } from '../../store';

export type ListForSaleProps = {
  dispatch: any;
  id: string;
  amount: string;
  onSuccess: any;
  onFailure: any;
};

export const listForSale = async ({
  dispatch,
  id,
  amount,
  onSuccess,
  onFailure,
}: ListForSaleProps) => {
  try {
    const nonFungibleContractAddress = Principal.fromText(
      config.crownsCanisterId,
    );
    const userOwnedTokenId = BigInt(id);
    const userListForPrice = BigInt(amount);
    const actor = (await createActor<marketplaceIdlService>({
      serviceName: 'marketplace',
    })) as ActorSubclass<marketplaceIdlService>;

    await actor.listForSale(
      nonFungibleContractAddress,
      userOwnedTokenId,
      userListForPrice,
    );

    onSuccess();
  } catch (error) {
    dispatch(errorActions.setErrorMessage(error.message));
    onFailure();
  }
};
