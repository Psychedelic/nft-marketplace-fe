import copyToClipboard from 'copy-to-clipboard';
import { useTranslation } from 'react-i18next';
import { notificationActions, useAppDispatch } from '../../store';
import { LinkButton } from '../core';
import {
  NftMetadataWrapper,
  NftMetadataBackground,
  NftMetadataContent,
  NftMetadataContentWrapper,
  NftProfilePictureWrapper,
  Heading,
  Subtext,
  ButtonsWrapper,
  HeaderWrapper,
  VerifiedIcon,
} from './styles';
import jelly from '../../assets/jelly.svg';
import { Icon } from '../icons';

export const CollectionOverview = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <NftMetadataWrapper>
      <NftMetadataBackground />
      <NftMetadataContent>
        <NftMetadataContentWrapper>
          <NftProfilePictureWrapper>
            <img src={jelly} alt="crown-pfp" />
          </NftProfilePictureWrapper>
          <HeaderWrapper>
            <Heading>
              Crowns
              <VerifiedIcon icon="verified" paddingLeft size="md" />
            </Heading>
            <Subtext>
              Crowns are a collection of 10,000 generated NFTs on the
              Internet Computer. With a mix of traditional and
              psychedelic materials.
            </Subtext>
          </HeaderWrapper>
        </NftMetadataContentWrapper>
        <ButtonsWrapper>
          <LinkButton type="textBtn" url="https://crowns.ooo/">
            {t('translation:buttons.links.website')}
          </LinkButton>
          <LinkButton url="https://discord.gg/yVEcEzmrgm">
            <Icon icon="discord" />
          </LinkButton>
          <LinkButton url="https://twitter.com/cap_ois">
            <Icon icon="twitter" />
          </LinkButton>

          <LinkButton
            handleClick={() => {
              copyToClipboard(window.location.href);
              dispatch(
                notificationActions.setSuccessMessage(
                  `${t(
                    'translation:successMessages.copyToClipboard',
                  )}`,
                ),
              );
            }}
          >
            <Icon icon="share" />
          </LinkButton>
        </ButtonsWrapper>
      </NftMetadataContent>
    </NftMetadataWrapper>
  );
};
