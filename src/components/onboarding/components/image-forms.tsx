import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '../../icons';
import {
  SubText,
  ImageInputField,
  InputWrapper,
  IconWrapper,
  SectionFormContentWrapper,
  Divider,
  LogoImageFieldWrapper,
  LogoImageField,
  FeaturedImageFieldWrapper,
  FeaturedImageField,
  BannerImageFieldWrapper,
  BannerImageField,
  SubTextLabel,
} from '../styles';

const ImageForms = () => {
  const { t } = useTranslation();
  const [image, setImage] = useState({
    logo: '',
    featured: '',
    banner: '',
  });

  return (
    <>
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
              setImage({
                ...image,
                logo: URL.createObjectURL(e.target.files[0]),
              });
            }}
            isInputFilled={image.logo ? true : false}
          />
          {image.logo ? (
            <LogoImageFieldWrapper>
              <LogoImageField src={image.logo} />
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
        <SubText>{t('translation:onboarding.featuredImage')}</SubText>
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
              setImage({
                ...image,
                featured: URL.createObjectURL(e.target.files[0]),
              });
            }}
            isInputFilled={image.featured ? true : false}
          />
          {image.featured ? (
            <FeaturedImageFieldWrapper>
              <FeaturedImageField src={image.featured} />
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
              setImage({
                ...image,
                banner: URL.createObjectURL(e.target.files[0]),
              });
            }}
            isInputFilled={image.banner ? true : false}
          />
          {image.banner ? (
            <BannerImageFieldWrapper>
              <BannerImageField src={image.banner} />
            </BannerImageFieldWrapper>
          ) : (
            <IconWrapper>
              <Icon icon="myNfts" colorType="input" size="lg" />
            </IconWrapper>
          )}
        </InputWrapper>
      </SectionFormContentWrapper>
      <Divider gap="sm" />
    </>
  );
};

export default ImageForms;
