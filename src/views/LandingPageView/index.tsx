import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Collection } from '@psychedelic/jelly-js';
import { useSelector } from 'react-redux';
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
  marketplaceActions,
  nftsActions,
  RootState,
  useAppDispatch,
  useSettingsStore,
  useThemeStore,
} from '../../store';

import config from '../../config/env';
import RecentActivities from './recent-activity';

const LandingPageView = () => {
  const { t } = useTranslation();
  const { theme } = useThemeStore();
  const isDarkTheme = theme === 'darkTheme';
  const dispatch = useAppDispatch();

  const collections = useSelector(
    (state: RootState) => state.marketplace.collections,
  );

  const { latestActiveToken } = useSettingsStore();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(marketplaceActions.getAllCollections());

    dispatch(
      nftsActions.getLatestActiveToken({
        count: 1,
        collectionId: config.nftCollectionId,
      }),
    );

    const fetchLatestToken = setInterval(
      () =>
        dispatch(
          nftsActions.getLatestActiveToken({
            count: 1,
            collectionId: config.nftCollectionId,
          }),
        ),
      30000,
    );

    return () => {
      clearInterval(fetchLatestToken);
    };
  }, []);

  const handleViewCollection = (name: string) => {
    const collection = collections.find(
      (data: Collection) => data.name === name,
    );

    dispatch(
      marketplaceActions.setCollectionId(collection?.id.toText()),
    );

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

  const getLatestActiveToken = () => {
    const lastListing =
      Number(latestActiveToken?.lastListingTime) || 0;
    const lastOffer = Number(latestActiveToken?.lastOfferTime) || 0;
    const lastSale = Number(latestActiveToken?.lastSaleTime) || 0;

    const numbers: Record<string, number> = {
      lastListing,
      lastOffer,
      lastSale,
    };

    const maxVal = Math.max(...Object.values(numbers));
    const key = Object.keys(numbers).find(
      (k) => numbers[k] === maxVal,
    );

    return key;
  };

  const lastActiveToken = getLatestActiveToken();

  const displayLatestActiveToken = () => {
    if (lastActiveToken === 'lastListing') {
      return (
        latestActiveToken?.listing && (
          <RecentActivities
            icon="list"
            id={latestActiveToken.id}
            name={latestActiveToken?.name}
            price={latestActiveToken?.price}
            time={latestActiveToken?.lastListingTime.toString()}
            collectionId={config.nftCollectionId}
            description={t('translation:landingPage.listingText')}
          />
        )
      );
    }
    if (lastActiveToken === 'lastOffer') {
      return (
        latestActiveToken?.offers && (
          <RecentActivities
            icon="offer"
            id={latestActiveToken.id}
            name={latestActiveToken?.name}
            price={latestActiveToken?.price}
            time={latestActiveToken?.lastOfferTime.toString()}
            collectionId={config.nftCollectionId}
            description={t('translation:landingPage.offerText')}
            latestActiveToken={latestActiveToken}
          />
        )
      );
    }
    if (lastActiveToken === 'lastSale') {
      return (
        latestActiveToken?.lastSale && (
          <RecentActivities
            icon="sale"
            id={latestActiveToken.id}
            name={latestActiveToken?.name}
            price={latestActiveToken?.price}
            time={latestActiveToken?.lastSaleTime.toString()}
            collectionId={config.nftCollectionId}
            description={t('translation:landingPage.saleText')}
          />
        )
      );
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
      {displayLatestActiveToken()}
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
          <img src={psychedelic} alt="" />
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
