import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Container,
  IntroContainer,
  IntroBackgroundContainer,
  BackgroundImageWrapper,
  BackgroundImage,
} from './styles';
import jellyBackgroundImage from '../../assets/jelly-background.svg';

const LandingPageView = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <IntroContainer>
        <IntroBackgroundContainer>
          <BackgroundImageWrapper>
            <BackgroundImage src={jellyBackgroundImage} />
          </BackgroundImageWrapper>
        </IntroBackgroundContainer>
      </IntroContainer>
    </Container>
  );
};

export default LandingPageView;
