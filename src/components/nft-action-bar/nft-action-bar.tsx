import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistoryBack } from '../../hooks/use-history-back';
import { Container, NftActionBarWrapper, ActionText } from './styles';

import { usePlugStore } from '../../store';
import { isNFTOwner } from '../../integrations/kyasshu/utils';
import { Icon } from '../icons';
import useMediaQuery from '../../hooks/use-media-query';
import {
  ActionBarOnConnected,
  ActionBarOnDisconnected,
} from './nft-action-buttons';

export type NftActionBarProps = {
  isListed?: boolean;
  owner?: string;
  showNFTActionButtons: boolean;
};

export const NftActionBar = ({
  isListed,
  owner,
  showNFTActionButtons,
}: NftActionBarProps) => {
  const { t } = useTranslation();
  const { isConnected, principalId: plugPrincipal } = usePlugStore();
  const isMobileScreen = useMediaQuery('(max-width: 640px)');

  const isConnectedOwner = isNFTOwner({
    isConnected,
    owner,
    principalId: plugPrincipal,
  });

  const goBack = useHistoryBack();

  return (
    <Container>
      <NftActionBarWrapper>
        <ActionText onClick={() => goBack()}>
          <Icon icon="arrow-left-circle" paddingRight />
          {t('translation:buttons.links.back')}
        </ActionText>
        {showNFTActionButtons &&
          (isConnectedOwner ? (
            !isMobileScreen && (
              <ActionBarOnConnected isListed={isListed} />
            )
          ) : (
            <ActionBarOnDisconnected />
          ))}
      </NftActionBarWrapper>
    </Container>
  );
};
