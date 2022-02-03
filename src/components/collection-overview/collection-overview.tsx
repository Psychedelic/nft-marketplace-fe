import React from 'react';
import { useTranslation } from 'react-i18next';
import { LinkButton } from '../core/buttons';
import {
  NftMetadataWrapper,
  NftMetadataBackground,
  NftMetadataContent,
  NftMetadataContentWrapper,
  NftProfilePictureWrapper,
  Heading,
  Subtext,
  ButtonsWrapper,
} from './styles';
import background from '../../assets/nft-background.png';
import crown from '../../assets/crown-pfp.png';
import verified from '../../assets/verified.svg';
import discord from '../../assets/buttons/discord.svg';
import twitter from '../../assets/buttons/twitter.svg';
import back from '../../assets/buttons/back.svg';

export const NftMetadata = () => {
  const { t } = useTranslation();

  return (
    <NftMetadataWrapper>
      <NftMetadataBackground src={background} />
      <NftMetadataContent>
        <NftMetadataContentWrapper>
          <NftProfilePictureWrapper>
            <img src={crown} alt="crown-pfp" />
          </NftProfilePictureWrapper>
          <div>
            <Heading>
              Crowns
              <img src={verified} alt="verified" />
            </Heading>
            <Subtext>
              Crowns are a collection of 10,000 uniquely generated
              NFTs on the Internet Computer. With a mix of traditional
              and psychedelic materials.
            </Subtext>
          </div>
        </NftMetadataContentWrapper>
        <ButtonsWrapper>
          <LinkButton type="textBtn">
            {t('translation:buttons.links.website')}
          </LinkButton>
          &nbsp;
          <LinkButton outline="light" text="bold">
            <img
              src={discord}
              alt={t('translation:buttons.links.discord')}
            />
          </LinkButton>
          &nbsp;
          <LinkButton outline="light" text="bold">
            <img
              src={twitter}
              alt={t('translation:buttons.links.twitter')}
            />
          </LinkButton>
          &nbsp;
          <LinkButton outline="light" text="bold">
            <img
              src={back}
              alt={t('translation:buttons.links.back')}
            />
          </LinkButton>
        </ButtonsWrapper>
      </NftMetadataContent>
    </NftMetadataWrapper>
  );
};
