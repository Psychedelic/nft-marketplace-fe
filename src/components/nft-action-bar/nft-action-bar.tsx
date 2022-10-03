import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistoryBack } from '../../hooks/use-history-back';
import { Container, NftActionBarWrapper, ActionText } from './styles';

import { usePlugStore, RootState } from '../../store';
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

  const { id } = useParams();

  const myNFTIds = useSelector(
    (state: RootState) => state.nfts.myNFTIds,
  );

  const isConnectedOwner = isNFTOwner({
    isConnected,
    myNFTIds,
    currentNFTId: id,
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
