import React from 'react';
import {
  CancelListingModal,
  ChangePriceModal,
  SellModal,
} from '../modals';
import { ButtonListWrapper, ButtonWrapper } from './styles';

type ConnectedProps = {
  isListed?: boolean;
  isMobileScreen?: boolean;
};

export const ActionBarOnConnected = ({
  isListed,
  isMobileScreen,
}: ConnectedProps) => (
  <ButtonListWrapper>
    {isListed && (
      <ButtonWrapper>
        <CancelListingModal isMobileScreen={isMobileScreen} />
      </ButtonWrapper>
    )}
    <ButtonWrapper>
      <ChangePriceModal
        isTriggerVisible={isListed}
        isMobileScreen={isMobileScreen}
      />
    </ButtonWrapper>
    {!isListed && (
      <ButtonWrapper>
        <SellModal isTriggerVisible={!isListed} />
      </ButtonWrapper>
    )}
  </ButtonListWrapper>
);

// TODO: On disconnected users should display a particular state
// also, for the users which are not "ownersOf"
export const ActionBarOnDisconnected = () => null;
