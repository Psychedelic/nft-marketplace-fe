import React from 'react';
import PlugConnect from '@psychedelic/plug-connect';
import * as HoverCard from '@radix-ui/react-hover-card';

import { ConnectToPlug, Flex } from './styles';
import offers from '../../../assets/buttons/offers.svg';
import disconnect from '../../../assets/buttons/disconnect.svg';

export const ConnectToPlugButton = () => (
  <HoverCard.Root openDelay={300}>
    <HoverCard.Trigger>
      <PlugConnect
        title="Connect to Plug"
        whitelist={['canister-id']}
        onConnectCallback={() => console.log('connected')}
      />
    </HoverCard.Trigger>
    <ConnectToPlug align="end">
      <Flex>
        <img src={offers} alt="offers" />
        <p>My Offers</p>
      </Flex>
      <div />
      <Flex>
        <img src={disconnect} alt="disconnect" />
        <p>Disconnect</p>
      </Flex>
    </ConnectToPlug>
  </HoverCard.Root>
);
