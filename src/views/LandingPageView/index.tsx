import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ActionButton, LinkButton } from '../../components/core';
import {
  Container,
  IntroContainer,
  IntroBackgroundContainer,
  IntroBackgroundImageWrapper,
  IntroBackgroundImage,
  IntroDetailsContainer,
  IntroDetailsWrapper,
  IntroDetailsTitle,
  IntroDetailsDescription,
  ViewCollectionButtonWrapper,
  IntroImageContainer,
  IntroImage,
  FeaturesContainer,
  FeaturesWrapper,
  FeaturesTitle,
  FeaturesList,
  FeaturesListItem,
  FeatureIcon,
  FeatureTitle,
  FeatureDescription,
  MultichainContainer,
  MultichainWrapper,
  MultichainTitle,
  MultichainDescription,
  MultichainDescriptionLink,
  MultichainHubList,
  MultichainHubListItem,
  ButtonWrapper,
  ButtonSpan,
  RecentActivity,
  RecentActivityText,
  RecentActivityCrownName,
  RecentActivityAmountSold,
  Footer,
  Flex,
  FooterText,
  SocialIcons,
} from './styles';
import jellyBackgroundImage from '../../assets/landingpage/jelly-background-light-mode.svg';
import jellyBackgroundImageDark from '../../assets/landingpage/jelly-background-dark-mode.svg';
import previewSampleImage from '../../assets/landingpage/preview-light-mode.svg';
import previewSampleImageDark from '../../assets/landingpage/preview-dark-mode.svg';
import ethereumLogo from '../../assets/landingpage/ethereum.png';
import ethereumLogoDark from '../../assets/landingpage/ethereum-dark-mode.svg';
import dfinityLogo from '../../assets/landingpage/dfinity.png';
import dfinityLogoDark from '../../assets/landingpage/dfinity-dark-mode.svg';
import solanaLogo from '../../assets/landingpage/solana.png';
import solanaLogoDark from '../../assets/landingpage/solana-dark-mode.svg';
import polygonLogo from '../../assets/landingpage/polygon.png';
import polygonLogoDark from '../../assets/landingpage/polygon-dark-mode.svg';
import icnsLogo from '../../assets/landingpage/icns.svg';
import crownsLogo from '../../assets/landingpage/crowns.svg';
import psychedelic from '../../assets/landingpage/psychedelic.svg';

import {
  nftsActions,
  settingsActions,
  useAppDispatch,
  useSettingsStore,
  useThemeStore,
} from '../../store';

import config from '../../config/env';
import { Icon } from '../../components';
import { Collection, SortKey } from '@psychedelic/jelly-js';
import { formatTimestamp } from '../../integrations/functions/date';
import { parseE8SAmountToWICP } from '../../utils/formatters';

const LandingPageView = () => {
  const { t } = useTranslation();
  const { theme } = useThemeStore();
  const isDarkTheme = theme === 'darkTheme';
  const dispatch = useAppDispatch();
  const { collections, latestActiveToken } = useSettingsStore();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      settingsActions.getCollections(`${config.nftCollectionId}`),
    );

    dispatch(
      nftsActions.getAllNFTs({
        sort: SortKey.all,
        count: 1,
        collectionId: config.nftCollectionId,
      }),
    );
  }, []);

  const handleViewCollection = (name: string) => {
    const collection = collections.find(
      (collection: Collection) => collection.name === name,
    );

    dispatch(settingsActions.setNameOfCollection(collection?.name));

    const collectionId = collection?.id.toText();

    navigate(`/${collectionId}`, { replace: true });
    window.location.reload();
  };

  const displayCollectionName = (name: string) => {
    switch (name) {
      case 'ICNS (test)':
        return <img src={icnsLogo} alt="icns" />;
      case 'Crowns Test':
      case 'crowns_mkp':
        return <img src={crownsLogo} alt="crowns" />;
      default:
        return name;
    }
  };

  return (
    <Container>
      <IntroContainer>
        <IntroBackgroundContainer>
          <IntroBackgroundImageWrapper>
            <IntroBackgroundImage
              src={
                isDarkTheme
                  ? jellyBackgroundImageDark
                  : jellyBackgroundImage
              }
            />
          </IntroBackgroundImageWrapper>
        </IntroBackgroundContainer>
        <IntroDetailsContainer>
          <IntroDetailsWrapper>
            <IntroDetailsTitle>
              {t('translation:landingPage.introTitle')}
            </IntroDetailsTitle>
            <IntroDetailsDescription>
              {t('translation:landingPage.introDescription')}
            </IntroDetailsDescription>
            <ViewCollectionButtonWrapper>
              {collections.map((collection: Collection) => (
                <ButtonWrapper key={collection.id.toText()}>
                  <ActionButton
                    type={
                      collection.name === 'ICNS (test)'
                        ? 'outline'
                        : 'primary'
                    }
                    onClick={() =>
                      handleViewCollection(collection.name)
                    }
                  >
                    <ButtonSpan>
                      {t('translation:landingPage.explore')}
                    </ButtonSpan>
                    {displayCollectionName(collection.name)}
                  </ActionButton>
                </ButtonWrapper>
              ))}
            </ViewCollectionButtonWrapper>
          </IntroDetailsWrapper>
          <IntroImageContainer>
            <IntroImage
              src={
                isDarkTheme
                  ? previewSampleImageDark
                  : previewSampleImage
              }
            />
          </IntroImageContainer>
        </IntroDetailsContainer>
      </IntroContainer>
      {latestActiveToken.listing && (
        <RecentActivity>
          <Icon icon="sale" size="sm" />
          <RecentActivityText>
            <Link
              to={`/${config.nftCollectionId}/nft/${latestActiveToken.id}`}
            >
              <RecentActivityCrownName>
                {latestActiveToken?.name} #{latestActiveToken.id}
              </RecentActivityCrownName>
            </Link>
            listed for
            <RecentActivityAmountSold>
              {parseE8SAmountToWICP(latestActiveToken?.price)} WICP
            </RecentActivityAmountSold>
            {formatTimestamp(
              BigInt(latestActiveToken?.lastListingTime.toString()),
            )}
          </RecentActivityText>
        </RecentActivity>
      )}
      <FeaturesContainer>
        <FeaturesWrapper>
          <FeaturesTitle>
            {t('translation:landingPage.featuresTitle')}
          </FeaturesTitle>
          <FeaturesList>
            <FeaturesListItem backgroundTheme="green">
              <FeatureIcon
                iconTheme={isDarkTheme ? 'greenDark' : 'green'}
              />
              <FeatureTitle>
                {t('translation:landingPage.jellyFeatureTitle')}
              </FeatureTitle>
              <FeatureDescription>
                {t('translation:landingPage.jellyFeatureDescription')}
              </FeatureDescription>
            </FeaturesListItem>
            <FeaturesListItem backgroundTheme="pink">
              <FeatureIcon
                iconTheme={isDarkTheme ? 'pinkDark' : 'pink'}
              />
              <FeatureTitle>
                {t('translation:landingPage.aggregatorFeatureTitle')}
              </FeatureTitle>
              <FeatureDescription>
                {t(
                  'translation:landingPage.aggregatorFeatureDescription',
                )}
              </FeatureDescription>
            </FeaturesListItem>
          </FeaturesList>
          <FeaturesList>
            <FeaturesListItem backgroundTheme="blue">
              <FeatureIcon
                iconTheme={isDarkTheme ? 'blueDark' : 'blue'}
              />
              <FeatureTitle>
                {t('translation:landingPage.curatorFeatureTitle')}
              </FeatureTitle>
              <FeatureDescription>
                {t(
                  'translation:landingPage.curatorFeatureDescription',
                )}
              </FeatureDescription>
            </FeaturesListItem>
            <FeaturesListItem backgroundTheme="yellow">
              <FeatureIcon
                iconTheme={isDarkTheme ? 'yellowDark' : 'yellow'}
              />
              <FeatureTitle>
                {t('translation:landingPage.creatorFeatureTitle')}
              </FeatureTitle>
              <FeatureDescription>
                {t(
                  'translation:landingPage.creatorFeatureDescription',
                )}
              </FeatureDescription>
            </FeaturesListItem>
          </FeaturesList>
        </FeaturesWrapper>
      </FeaturesContainer>
      <MultichainContainer>
        <MultichainWrapper>
          <MultichainTitle>
            {t('translation:landingPage.multichainHubTitle')}
          </MultichainTitle>
          <MultichainDescription>
            {t(
              'translation:landingPage.multichainHubDescriptionIntro',
            )}
            <MultichainDescriptionLink
              href="https://terabethia.ooo/"
              target="_blank"
            >
              {t('translation:landingPage.terabethiaTitle')}
            </MultichainDescriptionLink>
            {t('translation:landingPage.multichainHubDescriptionEnd')}
          </MultichainDescription>
          <MultichainHubList>
            <MultichainHubListItem
              src={isDarkTheme ? ethereumLogoDark : ethereumLogo}
            />
            <MultichainHubListItem
              src={isDarkTheme ? dfinityLogoDark : dfinityLogo}
            />
            <MultichainHubListItem
              src={isDarkTheme ? solanaLogoDark : solanaLogo}
            />
            <MultichainHubListItem
              src={isDarkTheme ? polygonLogoDark : polygonLogo}
            />
          </MultichainHubList>
        </MultichainWrapper>
      </MultichainContainer>
      <Footer>
        <Flex>
          <img src={psychedelic} />
          <FooterText>
            {t('translation:landingPage.builtByPsychedelic')}
          </FooterText>
        </Flex>
        <Flex>
          <FooterText themeColor={isDarkTheme ? 'steel' : 'primary'}>
            {t('translation:landingPage.followOnSocial')}
          </FooterText>
          <Flex>
            <LinkButton
              url="https://discord.gg/yVEcEzmrgm"
              type="unstyled"
            >
              <SocialIcons icon="discord" />
            </LinkButton>
            <LinkButton
              url="https://twitter.com/cap_ois"
              type="unstyled"
            >
              <SocialIcons icon="twitter" />
            </LinkButton>
            <LinkButton
              url="https://github.com/Psychedelic/nft-marketplace-fe"
              type="unstyled"
            >
              <SocialIcons icon="github" />
            </LinkButton>
          </Flex>
        </Flex>
      </Footer>
    </Container>
  );
};

export default LandingPageView;
