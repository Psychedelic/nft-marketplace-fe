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
    </Container>
  );
};

export default LandingPageView;
