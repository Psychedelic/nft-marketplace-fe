import React from 'react';
import PlugConnect from '@psychedelic/plug-connect';
import * as HoverCard from '@radix-ui/react-hover-card';

import { ConnectToPlugButton, Flex } from './styles';
import offers from '../../../assets/buttons/offers.svg';
import disconnect from '../../../assets/buttons/disconnect.svg';

export const ConnectToPlug = () => (
  <HoverCard.Root openDelay={300}>
    <HoverCard.Trigger>
      <PlugConnect
        title="Connect to Plug"
        whitelist={['canister-id']}
        onConnectCallback={() => console.log('connected')}
      />
    </HoverCard.Trigger>
    <ConnectToPlugButton align="end">
      <Flex>
        <img src={offers} alt="offers" />
        <p>My Offers</p>
      </Flex>
      <div />
      <Flex>
        <img src={disconnect} alt="disconnect" />
        <p>Disconnect</p>
      </Flex>
    </ConnectToPlugButton>
  </HoverCard.Root>
);
