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
  MultichainHubList,
  MultichainHubListItem,
} from './styles';
import jellyBackgroundImage from '../../assets/landingpage/jelly-background.svg';
import collectionSampleImage from '../../assets/landingpage/collection-sample.jpg';
import ethereumLogo from '../../assets/landingpage/ethereum.png';
import dfinityLogo from '../../assets/landingpage/dfinity.png';
import solanaLogo from '../../assets/landingpage/solana.png';
import polygonLogo from '../../assets/landingpage/polygon.png';

import config from '../../config/env';

const LandingPageView = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleViewCollection = () => {
    navigate(`/${config.nftCollectionId}`, { replace: true });
  };

  return (
    <Container>
      <IntroContainer>
        <IntroBackgroundContainer>
          <IntroBackgroundImageWrapper>
            <IntroBackgroundImage src={jellyBackgroundImage} />
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
              <ActionButton
                type="primary"
                onClick={handleViewCollection}
              >
                {t('translation:landingPage.viewCrowns')}
              </ActionButton>
            </ViewCollectionButtonWrapper>
          </IntroDetailsWrapper>
        </IntroDetailsContainer>
        <IntroImageContainer>
          <IntroImage src={collectionSampleImage} />
        </IntroImageContainer>
      </IntroContainer>
      <FeaturesContainer>
        <FeaturesWrapper>
          <FeaturesTitle>
            {t('translation:landingPage.featuresTitle')}
          </FeaturesTitle>
          <FeaturesList>
            <FeaturesListItem borderTheme="green">
              <FeatureIcon iconTheme="green" />
              <FeatureTitle>
                {t('translation:landingPage.jellyFeatureTitle')}
              </FeatureTitle>
              <FeatureDescription>
                {t('translation:landingPage.jellyFeatureDescription')}
              </FeatureDescription>
            </FeaturesListItem>
            <FeaturesListItem borderTheme="pink">
              <FeatureIcon iconTheme="pink" />
              <FeatureTitle>
                {t('translation:landingPage.aggregatorFeatureTitle')}
              </FeatureTitle>
              <FeatureDescription>
                {t(
                  'translation:landingPage.aggregatorFeatureDescription',
                )}
              </FeatureDescription>
            </FeaturesListItem>
            <FeaturesListItem borderTheme="blue">
              <FeatureIcon iconTheme="blue" />
              <FeatureTitle>
                {t('translation:landingPage.curatorFeatureTitle')}
              </FeatureTitle>
              <FeatureDescription>
                {t(
                  'translation:landingPage.curatorFeatureDescription',
                )}
              </FeatureDescription>
            </FeaturesListItem>
            <FeaturesListItem borderTheme="yellow">
              <FeatureIcon iconTheme="yellow" />
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
            {t('translation:landingPage.multichainHubDescription')}
          </MultichainDescription>
          <MultichainHubList>
            <MultichainHubListItem src={ethereumLogo} />
            <MultichainHubListItem src={dfinityLogo} />
            <MultichainHubListItem src={solanaLogo} />
            <MultichainHubListItem src={polygonLogo} />
          </MultichainHubList>
        </MultichainWrapper>
      </MultichainContainer>
    </Container>
  );
};

export default LandingPageView;
