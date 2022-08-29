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
  ErrorMessage,
  WarningIcon,
} from './styles';
import { ActionButton } from '../core';
import { Icon } from '../icons';
import { Website } from '../icons/custom';
import {
  onboardingActions,
  useAppDispatch,
  useOnboardingStore,
} from '../../store';

type CollectionDetailsProps = {
  handleStep: () => void;
  isSubmitting: boolean;
};

const CollectionDetails = ({
  handleStep,
  isSubmitting,
}: CollectionDetailsProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { collectionDetails } = useOnboardingStore();
  const isLogoValid =
    isSubmitting && collectionDetails.formErrors.logo;
  const isNameValid =
    isSubmitting && collectionDetails.formErrors.name;
  const isRoyaltiesValid =
    isSubmitting && collectionDetails.formErrors.royalties;

  const handleChange = (e: any) => {
    const { name, value, files, type } = e.target;
    if (type === 'file') {
      dispatch(
        onboardingActions.setCollectionDetails({
          ...collectionDetails,
          [name]: URL.createObjectURL(files[0]),
        }),
      );
    } else if (type === 'text' || name === 'description') {
      dispatch(
        onboardingActions.setCollectionDetails({
          ...collectionDetails,
          [name]: value,
        }),
      );
    }
  };

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
                  id="logo"
                  name="logo"
                  accept="image/*"
                  imageType="logo"
                  onChange={handleChange}
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
              {isLogoValid && (
                <ErrorMessage>
                  <WarningIcon icon="warning" />
                  {collectionDetails.formErrors.logo}
                </ErrorMessage>
              )}
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
                  id="featured"
                  name="featured"
                  accept="image/*"
                  imageType="featured"
                  onChange={handleChange}
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
                  id="banner"
                  name="banner"
                  accept="image/*"
                  imageType="banner"
                  onChange={handleChange}
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
                name="name"
                type="text"
                inputStyle="fullWidth"
                onChange={handleChange}
                error={isNameValid ? true : false}
              />
              {isNameValid && (
                <ErrorMessage>
                  <WarningIcon icon="warning" />
                  {collectionDetails.formErrors.name}
                </ErrorMessage>
              )}
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
                name="description"
                onChange={handleChange}
                form="text"
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
                name="url"
                type="text"
                inputStyle="fullWidth"
                onChange={handleChange}
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
                    name="website"
                    inputStyle="leftButton"
                    onChange={handleChange}
                    primaryLinks={true}
                  />
                </LinkInputContent>
                <LinkInputContent>
                  <InputIconButton>
                    <Icon colorType="input" icon="discord" />
                  </InputIconButton>
                  <SectionInputField
                    placeholder="https://discord.gg/"
                    type="text"
                    name="discord"
                    inputStyle="leftButton"
                    onChange={handleChange}
                    primaryLinks={true}
                  />
                </LinkInputContent>
                <LinkInputContent>
                  <InputIconButton>
                    <Icon colorType="input" icon="twitter" />
                  </InputIconButton>
                  <SectionInputField
                    placeholder="https://twitter.com/"
                    type="text"
                    name="twitter"
                    inputStyle="leftButton"
                    onChange={handleChange}
                    primaryLinks={true}
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
                name="royalties"
                inputStyle="fullWidth"
                onChange={handleChange}
                error={isRoyaltiesValid ? true : false}
              />
              {isRoyaltiesValid && (
                <ErrorMessage>
                  <WarningIcon icon="warning" />
                  {collectionDetails.formErrors.royalties}
                </ErrorMessage>
              )}
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
                  handleStep();
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
