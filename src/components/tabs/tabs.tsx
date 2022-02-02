import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { ActivityTable } from '../tables';

export const Tab = () => (
  <div>
    <Tabs.Root defaultValue="tab1">
      <Tabs.List aria-label="Manage your account">
        <Tabs.Trigger value="tab1">Account</Tabs.Trigger>
        <Tabs.Trigger value="tab2">Password</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1">Nft list</Tabs.Content>
      <Tabs.Content value="tab2">
        <ActivityTable />
      </Tabs.Content>
    </Tabs.Root>
  </div>
);
