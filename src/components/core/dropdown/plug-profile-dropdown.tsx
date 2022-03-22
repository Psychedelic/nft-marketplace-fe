import React from 'react';
import PlugConnect from '@psychedelic/plug-connect';
import * as HoverCard from '@radix-ui/react-hover-card';

import { ConnectToPlug, PlugFlex } from './styles';
import offers from '../../../assets/offers.svg';
import disconnect from '../../../assets/disconnect.svg';

// TODO: What is this for? Since there's another Plug component
// located in `src/components/plug/plug.tsx`, this causes confusion
// so make sure there's a single component for Plug
export const PlugProfileDropdown = () => (
  <HoverCard.Root openDelay={300}>
    <HoverCard.Trigger>
      <PlugConnect
        title="Connect to Plug"
        whitelist={['canister-id']}
        onConnectCallback={() => {
          // eslint-disable-next-line no-console
          console.log('connected');
        }}
      />
    </HoverCard.Trigger>
    <ConnectToPlug align="end">
      <PlugFlex>
        <img src={offers} alt="offers" />
        <p>My Offers</p>
      </PlugFlex>
      <div />
      <PlugFlex>
        <img src={disconnect} alt="disconnect" />
        <p>Disconnect</p>
      </PlugFlex>
    </ConnectToPlug>
  </HoverCard.Root>
);
