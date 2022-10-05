import { Principal } from '@dfinity/principal';
import { createActor } from '../integrations/actor';

export const getDIP20BalanceOf = async ({
  userPrincipal,
}: {
  userPrincipal: Principal;
}) => {
  const actor = await createActor({
    serviceName: 'wicp',
  });

  if (!userPrincipal) {
    console.warn(
      'Oops! DIP20 balance of failed, user principal is missing',
    );

    return;
  }

  const balance = await actor.balanceOf(userPrincipal);

  if (typeof balance === 'undefined') {
    console.warn('Oops! DIP20 balance of response is unexpected');

    return;
  }

  return balance;
};

