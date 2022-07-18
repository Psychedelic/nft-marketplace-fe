import React from 'react';
import copyToClipboard from 'copy-to-clipboard';
import { useTranslation } from 'react-i18next';
import {
  notificationActions,
  useAppDispatch,
  usePlugStore,
} from '../../store';
import { LinkButton, OnConnected, OnDisconnected } from '../core';

import {
  CollectionMetadataWrapper,
  Heading,
  Subtext,
  VerifiedIcon,
  Container,
  Divider,
} from './styles';
import { Icon } from '../icons';
import { isNFTOwner } from '../../integrations/kyasshu/utils';
import useMediaQuery from '../../hooks/use-media-query';

export interface NFTMetaDataProps {
  id?: string;
  isListed?: boolean;
  owner?: string;
  showNFTActionButtons: boolean;
}

export const NFTMetaData = ({
  id,
  isListed,
  owner,
  showNFTActionButtons,
}: NFTMetaDataProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isConnected, principalId: plugPrincipal } = usePlugStore();
  const isMobileScreen = useMediaQuery('(max-width: 640px)');
  const isConnectedOwner = isNFTOwner({
    isConnected,
    owner,
    principalId: plugPrincipal,
  });

  return (
    <Container>
      <CollectionMetadataWrapper>
        <div>
          <Heading>#{id}</Heading>
          <Subtext>
            Crowns
            <VerifiedIcon icon="verified" paddingLeft />
          </Subtext>
        </div>
        <LinkButton
          handleClick={() => {
            copyToClipboard(window.location.href);
            dispatch(
              notificationActions.setSuccessMessage(
                `${t('translation:successMessages.copyToClipboard')}`,
              ),
            );
          }}
        >
          <Icon icon="share" />
        </LinkButton>
      </CollectionMetadataWrapper>
      {isMobileScreen && (
        <div>
          {showNFTActionButtons &&
            (isConnectedOwner ? (
              <OnConnected isListed={isListed} isMobileScreen={isMobileScreen} />
            ) : (
              <OnDisconnected />
            ))}
            <Divider />
        </div>
      )}
    </Container>
  );
};
