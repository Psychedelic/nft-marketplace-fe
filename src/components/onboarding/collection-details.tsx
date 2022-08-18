import { Trans, useTranslation } from 'react-i18next';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Icon } from '../icons';
import {
  SectionWrapper,
  SectionContent,
  Header,
  SubText,
  SectionFormContent,
  ImageInputField,
  InputWrapper,
  IconWrapper,
  SectionFormContentWrapper,
  Divider,
  SectionInputField,
  SectionTextArea,
  Label,
  Flex,
  StyledRadio,
  StyledIndicator,
} from './styles';
import { ActionButton } from '../core';

const CollectionDetails = () => {
  const { t } = useTranslation();

  const imageInputFields = [
    {
      title: `${t('translation:onboarding.logo')}`,
      description: `${t('translation:onboarding.logoInstruction')}`,
      imageType: 'logo',
    },
    {
      title: `${t('translation:onboarding.featuredImage')}`,
      description: `${t('translation:onboarding.logoInstruction')}`,
      imageType: 'featured',
    },
    {
      title: `${t('translation:onboarding.bannerImage')}`,
      description: `${t(
        'translation:onboarding.bannerImageInstruction',
      )}`,
      imageType: 'banner',
    },
  ];

  return (
    <SectionWrapper>
      <div>
        <SectionContent>
          <Header>
            2. {t('translation:onboarding.collectionDetails')}
          </Header>
          <SubText>
            <Trans t={t}>
              {t('translation:onboarding.collectionDetailsSubText')}
            </Trans>
          </SubText>
          <SectionFormContent>
            {imageInputFields.map((imageInput) => (
              <SectionFormContentWrapper>
                <SubText type="title" size="sm">
                  {imageInput.title}
                </SubText>
                <SubText size="sm">{imageInput.description}</SubText>
                <InputWrapper>
                  <ImageInputField
                    type="file"
                    id="img"
                    name="img"
                    accept="image/*"
                    imageType={
                      imageInput.imageType === 'logo'
                        ? 'logo'
                        : imageInput.imageType === 'featured'
                        ? 'featured'
                        : 'banner'
                    }
                  />
                  <IconWrapper>
                    <Icon icon="myNfts" colorType="input" size="lg" />
                  </IconWrapper>
                </InputWrapper>
              </SectionFormContentWrapper>
            ))}
            <Divider gap="sm" />
            <SectionFormContentWrapper>
              <SubText type="title" size="sm">
                Name
              </SubText>
              <SubText size="sm">
                This is the name of your collection, series, etc...
              </SubText>
              <SectionInputField
                placeholder="CryptoDickbutts"
                type="text"
                inputStyle="fullWidth"
              />
            </SectionFormContentWrapper>
            <Divider gap="sm" />
            <SectionFormContentWrapper>
              <SubText type="title" size="sm">
                Description
              </SubText>
              <SubText size="sm">
                This is the description of your collection, series,
                etc...
              </SubText>
              <SectionTextArea />
            </SectionFormContentWrapper>
            <Divider gap="sm" />
            <SectionFormContentWrapper>
              <SubText type="title" size="sm">
                URL
              </SubText>
              <SubText size="sm">
                Customize the URL you get for Jelly.
              </SubText>
              <SectionInputField
                placeholder="https://jelly.ooo/collection/untitled"
                type="text"
                inputStyle="fullWidth"
              />
            </SectionFormContentWrapper>
            <Divider gap="sm" />
            <SectionFormContentWrapper>
              <SubText type="title" size="sm">
                Royalties
              </SubText>
              <SubText size="sm">
                Collect a fee when a user re-sells your NFT on Jelly.
              </SubText>
              <SectionInputField
                placeholder="0.00%"
                type="text"
                inputStyle="fullWidth"
              />
            </SectionFormContentWrapper>
            <Divider gap="sm" />
            <SectionFormContentWrapper>
              <SubText type="title" size="sm">
                Explicit & sensitive content
              </SubText>
              <SubText size="sm">
                Disable seeing explicit content.
              </SubText>
            </SectionFormContentWrapper>
            <RadioGroupPrimitive.Root
              defaultValue="default"
              aria-label="View density"
              style={{
                display: 'flex',
              }}
            >
              <Flex>
                <StyledRadio value="default" id="yes">
                  <StyledIndicator />
                </StyledRadio>
                <Label htmlFor="yes">Yes</Label>
              </Flex>
              <Flex
                style={{
                  marginLeft: '20px',
                }}
              >
                <StyledRadio value="" id="no">
                  <StyledIndicator />
                </StyledRadio>
                <Label htmlFor="no">No</Label>
              </Flex>
            </RadioGroupPrimitive.Root>
            <div
              style={{
                width: '98px',
                marginTop: '35px',
              }}
            >
              <ActionButton type="primary" size="small">
                Next
              </ActionButton>
            </div>
          </SectionFormContent>
        </SectionContent>
      </div>
    </SectionWrapper>
  );
};

export default CollectionDetails;
