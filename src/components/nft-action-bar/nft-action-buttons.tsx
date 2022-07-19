import React from 'react';
import {
  CancelListingModal,
  ChangePriceModal,
  SellModal,
} from '../modals';
import { ButtonListWrapper, ButtonWrapper } from './styles';

type ConnectedProps = {
  isListed?: boolean;
};

export const ActionBarOnConnected = ({
  isListed,
}: ConnectedProps) => (
  <ButtonListWrapper>
    {isListed && (
      <ButtonWrapper isTriggerVisible={isListed}>
        <CancelListingModal />
      </ButtonWrapper>
    )}
    <ButtonWrapper isTriggerVisible={isListed}>
      <ChangePriceModal isTriggerVisible={isListed} />
    </ButtonWrapper>
    <ButtonWrapper isTriggerVisible={!isListed}>
      <SellModal isTriggerVisible={!isListed} />
    </ButtonWrapper>
  </ButtonListWrapper>
);

// TODO: On disconnected users should display a particular state
// also, for the users which are not "ownersOf"
export const ActionBarOnDisconnected = () => null;
