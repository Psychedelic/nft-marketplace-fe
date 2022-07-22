import React from 'react';
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
} from './styles';
import jellyBackgroundImage from '../../assets/landingpage/jelly-background.svg';
import collectionSampleImage from '../../assets/landingpage/collection-sample.jpg';

const LandingPageView = () => {
  const { t } = useTranslation();

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
              Sweet NFT Tools & Infra
            </IntroDetailsTitle>
            <IntroDetailsDescription>
              Allowing creators, curators, or collectors to create
              their own curated marketplaces, all hooked up to the
              same trustless canister, with interoperable data across
              all frontends
            </IntroDetailsDescription>
            <ViewCollectionButtonWrapper>
              <ActionButton type="primary">View Crowns</ActionButton>
            </ViewCollectionButtonWrapper>
          </IntroDetailsWrapper>
        </IntroDetailsContainer>
        <IntroImageContainer>
          <IntroImage src={collectionSampleImage} />
        </IntroImageContainer>
      </IntroContainer>
      <FeaturesContainer>
        <FeaturesWrapper>
          <FeaturesTitle>Not the same old marketplace</FeaturesTitle>
          <FeaturesList>
            <FeaturesListItem borderTheme="green">
              <FeatureIcon iconTheme="green" />
              <FeatureTitle>Jelly Protocol</FeatureTitle>
              <FeatureDescription>
                Permissionless NFT and marketplace protocol with
                unified listings, offers, and collection data.
              </FeatureDescription>
            </FeaturesListItem>
            <FeaturesListItem borderTheme="pink">
              <FeatureIcon iconTheme="pink" />
              <FeatureTitle>Aggregator Marketplace</FeatureTitle>
              <FeatureDescription>
                Jelly's Marketplace, where all supported collections
                on the protocol are listed & tradable.
              </FeatureDescription>
            </FeaturesListItem>
            <FeaturesListItem borderTheme="blue">
              <FeatureIcon iconTheme="blue" />
              <FeatureTitle>Curator Marketplace</FeatureTitle>
              <FeatureDescription>
                External marketplaces created by curators using Jelly,
                earning fees for the sales they drive in the protocol.
              </FeatureDescription>
            </FeaturesListItem>
            <FeaturesListItem borderTheme="yellow">
              <FeatureIcon iconTheme="yellow" />
              <FeatureTitle>Creator Tools</FeatureTitle>
              <FeatureDescription>
                Jelly will build and share NFT creator tools to help
                them launch new collections to the world.
              </FeatureDescription>
            </FeaturesListItem>
          </FeaturesList>
        </FeaturesWrapper>
      </FeaturesContainer>
    </Container>
  );
};

export default LandingPageView;
