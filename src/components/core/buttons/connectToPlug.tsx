import React from 'react';
import PlugConnect from '@psychedelic/plug-connect';

export const ConnectToPlug = () => (
  <div>
    <PlugConnect
      title="Connect to Plug"
      whitelist={['canister-id']}
      onConnectCallback={() => console.log(window.ic.plug.agent.getPrincipal())}
    />
  </div>
);
