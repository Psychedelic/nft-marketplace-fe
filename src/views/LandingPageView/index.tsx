import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ActionButton } from '../../components/core';
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

import { useThemeStore } from '../../store';

import config from '../../config/env';
import { Icon } from '../../components';

const LandingPageView = () => {
  const { t } = useTranslation();
  const { theme } = useThemeStore();
  const isDarkTheme = theme === 'darkTheme';

  const navigate = useNavigate();

  const handleViewCollection = () => {
    navigate(`/${config.nftCollectionId}`, { replace: true });
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
              <ButtonWrapper>
                <ActionButton
                  type="primary"
                  onClick={handleViewCollection}
                >
                  <ButtonSpan>
                    {t('translation:landingPage.explore')}
                  </ButtonSpan>
                  <img src={crownsLogo} alt="crowns" />
                </ActionButton>
              </ButtonWrapper>
              <ButtonWrapper>
                <ActionButton
                  type="outline"
                  onClick={handleViewCollection}
                >
                  <ButtonSpan>
                    {t('translation:landingPage.explore')}
                  </ButtonSpan>
                  <img src={icnsLogo} alt="icns" />
                </ActionButton>
              </ButtonWrapper>
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
      <RecentActivity>
        <Icon icon="sale" size="sm" />
        <RecentActivityText>
          <RecentActivityCrownName>
            CAP Crowns #2111
          </RecentActivityCrownName>
          sold at
          <RecentActivityAmountSold>2 WICP</RecentActivityAmountSold>4
          mins ago
        </RecentActivityText>
      </RecentActivity>
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
            <SocialIcons icon="discord" />
            <SocialIcons icon="twitter" />
            <SocialIcons icon="github" />
          </Flex>
        </Flex>
      </Footer>
    </Container>
  );
};

export default LandingPageView;
