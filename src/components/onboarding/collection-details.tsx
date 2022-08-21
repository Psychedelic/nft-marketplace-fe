import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  SectionWrapper,
  SectionContent,
  Header,
  SubText,
  SectionFormContent,
  SectionFormContentWrapper,
  Label,
  Flex,
  StyledRadio,
  StyledIndicator,
  StyledRadioRoot,
  DetailsButtonWrapper,
  Divider,
  SectionInputField,
  SectionTextArea,
  InputIconButton,
  LinkInputContentWrapper,
  LinkInputContent,
  ImageInputField,
  InputWrapper,
  IconWrapper,
  LogoImageFieldWrapper,
  LogoImageField,
  FeaturedImageFieldWrapper,
  FeaturedImageField,
  BannerImageFieldWrapper,
  BannerImageField,
  SubTextLabel,
} from './styles';
import { ActionButton } from '../core';
import { Icon } from '../icons';
import { Website } from '../icons/custom';

type CollectionDetailsProps = {
  handleStep?: () => void;
};

const CollectionDetails = ({
  handleStep,
}: CollectionDetailsProps) => {
  const { t } = useTranslation();
  const [collectionDetails, setCollectionDetails] = useState({
    logo: '',
    featured: '',
    banner: '',
    name: '',
    description: '',
    url: '',
    website: '',
    discord: '',
    twitter: '',
    royalties: '',
  });

  return (
    <SectionWrapper>
      <div>
        <SectionContent>
          <Header>
            2. {t('translation:onboarding.collectionDetails')}
          </Header>
          <SubText>
            {t('translation:onboarding.collectionDetailsSubText')}
          </SubText>
          <SectionFormContent>
            {/* Image input fields */}
            <SectionFormContentWrapper>
              <SubTextLabel>
                {t('translation:onboarding.logo')}
              </SubTextLabel>
              <SubText size="sm">
                {t('translation:onboarding.logoInstruction')}
              </SubText>
              <InputWrapper>
                <ImageInputField
                  type="file"
                  id="img"
                  name="img"
                  accept="image/*"
                  imageType="logo"
                  onChange={(e: any) => {
                    setCollectionDetails({
                      ...collectionDetails,
                      logo: URL.createObjectURL(e.target.files[0]),
                    });
                  }}
                  isInputFilled={
                    collectionDetails.logo ? true : false
                  }
                />
                {collectionDetails.logo ? (
                  <LogoImageFieldWrapper>
                    <LogoImageField src={collectionDetails.logo} />
                  </LogoImageFieldWrapper>
                ) : (
                  <IconWrapper>
                    <Icon icon="myNfts" colorType="input" size="lg" />
                  </IconWrapper>
                )}
              </InputWrapper>
            </SectionFormContentWrapper>
            <Divider gap="sm" />
            <SectionFormContentWrapper>
              <SubText>
                {t('translation:onboarding.featuredImage')}
              </SubText>
              <SubText size="sm">
                {t('translation:onboarding.featuredImageInstruction')}
              </SubText>
              <InputWrapper>
                <ImageInputField
                  type="file"
                  id="img"
                  name="img"
                  accept="image/*"
                  imageType="featured"
                  onChange={(e: any) => {
                    setCollectionDetails({
                      ...collectionDetails,
                      featured: URL.createObjectURL(
                        e.target.files[0],
                      ),
                    });
                  }}
                  isInputFilled={
                    collectionDetails.featured ? true : false
                  }
                />
                {collectionDetails.featured ? (
                  <FeaturedImageFieldWrapper>
                    <FeaturedImageField
                      src={collectionDetails.featured}
                    />
                  </FeaturedImageFieldWrapper>
                ) : (
                  <IconWrapper>
                    <Icon icon="myNfts" colorType="input" size="lg" />
                  </IconWrapper>
                )}
              </InputWrapper>
            </SectionFormContentWrapper>
            <Divider gap="sm" />
            <SectionFormContentWrapper>
              <SubText type="title" size="sm">
                {t('translation:onboarding.bannerImage')}
              </SubText>
              <SubText size="sm">
                {t('translation:onboarding.bannerImageInstruction')}
              </SubText>
              <InputWrapper>
                <ImageInputField
                  type="file"
                  id="img"
                  name="img"
                  accept="image/*"
                  imageType="banner"
                  onChange={(e: any) => {
                    setCollectionDetails({
                      ...collectionDetails,
                      banner: URL.createObjectURL(e.target.files[0]),
                    });
                  }}
                  isInputFilled={
                    collectionDetails.banner ? true : false
                  }
                />
                {collectionDetails.banner ? (
                  <BannerImageFieldWrapper>
                    <BannerImageField
                      src={collectionDetails.banner}
                    />
                  </BannerImageFieldWrapper>
                ) : (
                  <IconWrapper>
                    <Icon icon="myNfts" colorType="input" size="lg" />
                  </IconWrapper>
                )}
              </InputWrapper>
            </SectionFormContentWrapper>
            <Divider gap="sm" />
            {/* Text input fields */}
            <SectionFormContentWrapper>
              <SubTextLabel>
                {t('translation:onboarding.name')}
              </SubTextLabel>
              <SubText size="sm">
                {t('translation:onboarding.nameInstruction')}
              </SubText>
              <SectionInputField
                placeholder={t(
                  'translation:onboarding.namePlaceholder',
                )}
                type="text"
                inputStyle="fullWidth"
                onChange={(e) =>
                  setCollectionDetails({
                    ...collectionDetails,
                    name: e.target.value,
                  })
                }
              />
            </SectionFormContentWrapper>
            <Divider gap="sm" />
            <SectionFormContentWrapper>
              <SubText type="title" size="sm">
                {t('translation:onboarding.description')}
              </SubText>
              <SubText size="sm">
                {t('translation:onboarding.descriptionInstruction')}
              </SubText>
              <SectionTextArea
                onChange={(e) =>
                  setCollectionDetails({
                    ...collectionDetails,
                    description: e.target.value,
                  })
                }
              />
            </SectionFormContentWrapper>
            <Divider gap="sm" />
            <SectionFormContentWrapper>
              <SubText type="title" size="sm">
                {t('translation:onboarding.url')}
              </SubText>
              <SubText size="sm">
                {t('translation:onboarding.urlDescription')}
              </SubText>
              <SectionInputField
                placeholder={t(
                  'translation:onboarding.urlPlaceholder',
                )}
                type="text"
                inputStyle="fullWidth"
                onChange={(e) =>
                  setCollectionDetails({
                    ...collectionDetails,
                    url: e.target.value,
                  })
                }
              />
            </SectionFormContentWrapper>
            <Divider gap="sm" />
            <SectionFormContentWrapper>
              <SubText type="title" size="sm">
                {t('translation:onboarding.link')}
              </SubText>
              <SubText size="sm">
                {t('translation:onboarding.linkDescription')}
              </SubText>
              <LinkInputContentWrapper>
                <LinkInputContent>
                  <InputIconButton>
                    <Website color="#777E90" />
                  </InputIconButton>
                  <SectionInputField
                    placeholder="yourwebsite.ooo"
                    type="text"
                    inputStyle="leftButton"
                    onChange={(e) =>
                      setCollectionDetails({
                        ...collectionDetails,
                        website: e.target.value,
                      })
                    }
                  />
                </LinkInputContent>
                <LinkInputContent>
                  <InputIconButton>
                    <Icon colorType="input" icon="discord" />
                  </InputIconButton>
                  <SectionInputField
                    placeholder="https://discord.gg/"
                    type="text"
                    inputStyle="leftButton"
                    onChange={(e) =>
                      setCollectionDetails({
                        ...collectionDetails,
                        discord: e.target.value,
                      })
                    }
                  />
                </LinkInputContent>
                <LinkInputContent>
                  <InputIconButton>
                    <Icon colorType="input" icon="twitter" />
                  </InputIconButton>
                  <SectionInputField
                    placeholder="https://twitter.com/"
                    type="text"
                    inputStyle="leftButton"
                    onChange={(e) =>
                      setCollectionDetails({
                        ...collectionDetails,
                        twitter: e.target.value,
                      })
                    }
                  />
                </LinkInputContent>
              </LinkInputContentWrapper>
            </SectionFormContentWrapper>
            <Divider gap="sm" />
            <SectionFormContentWrapper>
              <SubTextLabel>
                {t('translation:onboarding.royalties')}
              </SubTextLabel>
              <SubText size="sm">
                {t('translation:onboarding.royaltiesDescription')}
              </SubText>
              <SectionInputField
                placeholder="0.00%"
                type="text"
                inputStyle="fullWidth"
                onChange={(e) =>
                  setCollectionDetails({
                    ...collectionDetails,
                    royalties: e.target.value,
                  })
                }
              />
            </SectionFormContentWrapper>
            <Divider gap="sm" />
            <SectionFormContentWrapper>
              <SubTextLabel>
                {t('translation:onboarding.explicitWarning')}
              </SubTextLabel>
              <SubText size="sm">
                {t(
                  'translation:onboarding.explicitWarningDescription',
                )}
              </SubText>
            </SectionFormContentWrapper>
            <StyledRadioRoot
              defaultValue="default"
              aria-label="View density"
            >
              <Flex>
                <StyledRadio
                  value="default"
                  id={t('translation:onboarding.yes')}
                >
                  <StyledIndicator />
                </StyledRadio>
                <Label htmlFor={t('translation:onboarding.yes')}>
                  {t('translation:onboarding.yes')}
                </Label>
              </Flex>
              <Flex>
                <StyledRadio value="" id="no">
                  <StyledIndicator />
                </StyledRadio>
                <Label htmlFor={t('translation:onboarding.no')}>
                  {t('translation:onboarding.no')}
                </Label>
              </Flex>
            </StyledRadioRoot>
            <DetailsButtonWrapper>
              <ActionButton
                type="primary"
                size="small"
                onClick={(e: any) => {
                  e.preventDefault();
                  handleStep && handleStep();
                }}
              >
                {t('translation:common.next')}
              </ActionButton>
            </DetailsButtonWrapper>
          </SectionFormContent>
        </SectionContent>
      </div>
    </SectionWrapper>
  );
};

export default CollectionDetails;
