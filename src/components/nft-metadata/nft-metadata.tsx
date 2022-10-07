import React from 'react';
import copyToClipboard from 'copy-to-clipboard';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  notificationActions,
  useAppDispatch,
  usePlugStore,
  RootState,
} from '../../store';
import {
  LinkButton,
  ActionBarOnConnected,
  ActionBarOnDisconnected,
} from '../core';

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
  collectionName?: string;
}

export const NFTMetaData = ({
  id,
  isListed,
  owner,
  showNFTActionButtons,
  collectionName,
}: NFTMetaDataProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isConnected, principalId: plugPrincipal } = usePlugStore();
  const isMobileScreen = useMediaQuery('(max-width: 640px)');

  const myNFTIds = useSelector(
    (state: RootState) => state.nfts.myNFTIds,
  );

  const isConnectedOwner = isNFTOwner({
    isConnected,
    myNFTIds,
    currentNFTId: id,
  });

  return (
    <Container>
      <CollectionMetadataWrapper>
        <div>
          <Heading>#{id}</Heading>
          <Subtext>
            {collectionName}
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
              <ActionBarOnConnected isListed={isListed} />
            ) : (
              <ActionBarOnDisconnected />
            ))}
          <Divider />
        </div>
      )}
    </Container>
  );
};
