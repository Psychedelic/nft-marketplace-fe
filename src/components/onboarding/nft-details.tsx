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
  Divider,
  SectionInputField,
  SectionTextArea,
  SubTextLabel,
  LinkInputContent,
  InputIconButton,
  StyledImgPlaceholder,
  InputWrapper,
  ImageInputField,
  NftImageFieldWrapper,
  NftImageField,
  IconWrapper,
  StyledSwitch,
  StyledThumb,
  NftSampleWrapper,
  NftNameDetailsWrapper,
  UnblockableContent,
} from './styles';
import collectionPlaceholder from '../../assets/collection-input-placeholder.svg';
import blockchainPlaceholder from '../../assets/icp-logo.svg';
import { Icon } from '../icons';

const NftDetails = () => {
  const { t } = useTranslation();
  const [image, setImage] = useState({
    nftOne: '',
    nftTwo: '',
    nftThree: '',
  });

  return (
    <SectionWrapper>
      <div>
        <SectionContent>
          <Header>3. {t('translation:onboarding.nftDetails')}</Header>
          <SubText>
            {t('translation:onboarding.nftDetailsSubText')}
          </SubText>
          <SectionFormContent>
            <SectionFormContentWrapper>
              <SubText type="title" size="sm">
                {t('translation:onboarding.nftSamples')}
              </SubText>
              <SubText size="sm">
                {t('translation:onboarding.nftSamplesDescription')}
              </SubText>
              <NftSampleWrapper>
                <InputWrapper>
                  <ImageInputField
                    type="file"
                    id="img"
                    name="img"
                    accept="image/*"
                    imageType="nft"
                    onChange={(e: any) => {
                      setImage({
                        ...image,
                        nftOne: URL.createObjectURL(
                          e.target.files[0],
                        ),
                      });
                    }}
                    isInputFilled={image.nftOne ? true : false}
                  />
                  {image.nftOne ? (
                    <NftImageFieldWrapper>
                      <NftImageField src={image.nftOne} />
                    </NftImageFieldWrapper>
                  ) : (
                    <IconWrapper>
                      <Icon
                        icon="myNfts"
                        colorType="input"
                        size="lg"
                      />
                    </IconWrapper>
                  )}
                </InputWrapper>
                <InputWrapper type="nft">
                  <ImageInputField
                    type="file"
                    id="img"
                    name="img"
                    accept="image/*"
                    imageType="nft"
                    onChange={(e: any) => {
                      setImage({
                        ...image,
                        nftTwo: URL.createObjectURL(
                          e.target.files[0],
                        ),
                      });
                    }}
                    isInputFilled={image.nftTwo ? true : false}
                  />
                  {image.nftTwo ? (
                    <NftImageFieldWrapper>
                      <NftImageField src={image.nftTwo} />
                    </NftImageFieldWrapper>
                  ) : (
                    <IconWrapper>
                      <Icon
                        icon="myNfts"
                        colorType="input"
                        size="lg"
                      />
                    </IconWrapper>
                  )}
                </InputWrapper>
                <InputWrapper>
                  <ImageInputField
                    type="file"
                    id="img"
                    name="img"
                    accept="image/*"
                    imageType="nft"
                    onChange={(e: any) => {
                      setImage({
                        ...image,
                        nftThree: URL.createObjectURL(
                          e.target.files[0],
                        ),
                      });
                    }}
                    isInputFilled={image.nftThree ? true : false}
                  />
                  {image.nftThree ? (
                    <NftImageFieldWrapper>
                      <NftImageField src={image.nftThree} />
                    </NftImageFieldWrapper>
                  ) : (
                    <IconWrapper>
                      <Icon
                        icon="myNfts"
                        colorType="input"
                        size="lg"
                      />
                    </IconWrapper>
                  )}
                </InputWrapper>
              </NftSampleWrapper>
            </SectionFormContentWrapper>
            <Divider gap="sm" />
            <SectionFormContentWrapper>
              <SubTextLabel>
                {t('translation:onboarding.name')}
              </SubTextLabel>
              <SubText size="sm">
                {t('translation:onboarding.nftNameDescription')}
              </SubText>
              <NftNameDetailsWrapper>
                <SectionInputField
                  placeholder={t(
                    'translation:onboarding.namePlaceholder',
                  )}
                  type="text"
                  inputStyle="fullWidth"
                />
                <SectionInputField
                  placeholder="1"
                  type="text"
                  inputStyle="smallWidth"
                />
                <SectionInputField
                  placeholder="10.000"
                  type="text"
                  inputStyle="smallWidth"
                />
              </NftNameDetailsWrapper>
            </SectionFormContentWrapper>
            <SectionFormContentWrapper>
              <SubText type="title" size="sm">
                {t('translation:onboarding.externalLink')}
              </SubText>
              <SubText size="sm">
                {t('translation:onboarding.externalLinkDescription')}
              </SubText>
              <SectionInputField
                placeholder="https://yourwebsite/artwork/6"
                type="text"
                inputStyle="fullWidth"
              />
            </SectionFormContentWrapper>
            <Divider gap="sm" />
            <SectionFormContentWrapper>
              <SubText type="title" size="sm">
                {t('translation:onboarding.description')}
              </SubText>
              <SubText size="sm">
                {t('translation:onboarding.nftItemsDescription')}
              </SubText>
              <SectionTextArea />
            </SectionFormContentWrapper>
            <Divider gap="sm" />
            <SectionFormContentWrapper>
              <SubText type="title" size="sm">
                {t('translation:onboarding.nftCollection')}
              </SubText>
              <SubText size="sm">
                {t('translation:onboarding.nftCollectionDetails')}
              </SubText>
              <div>
                <LinkInputContent>
                  <InputIconButton borderless={true}>
                    <StyledImgPlaceholder
                      src={collectionPlaceholder}
                      alt=""
                    />
                  </InputIconButton>
                  <SectionInputField
                    placeholder={t(
                      'translation:onboarding.namePlaceholder',
                    )}
                    type="text"
                    inputStyle="borderless"
                  />
                </LinkInputContent>
              </div>
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
              bottomSpace={true}
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
            <Divider gap="sm" />
            <SectionFormContentWrapper>
              <SubText type="title">
                {t('translation:onboarding.unblockableContent')}
              </SubText>
              <UnblockableContent>
                <SubText
                  size="sm"
                  style={{
                    width: '430px',
                  }}
                >
                  {t(
                    'translation:onboarding.unblockableContentDescription',
                  )}
                </SubText>
                <StyledSwitch>
                  <StyledThumb />
                </StyledSwitch>
              </UnblockableContent>
            </SectionFormContentWrapper>
            <Divider gap="sm" />
            <SectionFormContentWrapper>
              <SubTextLabel>
                {t('translation:onboarding.supply')}
              </SubTextLabel>
              <SubText size="sm">
                {t('translation:onboarding.supplyDescription')}
              </SubText>
              <SectionInputField
                placeholder="1"
                type="text"
                inputStyle="fullWidth"
              />
            </SectionFormContentWrapper>
            <Divider gap="sm" />
            <SectionFormContentWrapper>
              <SubText type="title" size="sm">
                {t('translation:onboarding.blockchain')}
              </SubText>
              <div>
                <LinkInputContent>
                  <InputIconButton borderless={true}>
                    <StyledImgPlaceholder
                      src={blockchainPlaceholder}
                      alt=""
                    />
                  </InputIconButton>
                  <SectionInputField
                    placeholder={t(
                      'translation:onboarding.blockchainPlaceholder',
                    )}
                    type="text"
                    inputStyle="borderless"
                  />
                </LinkInputContent>
              </div>
            </SectionFormContentWrapper>
          </SectionFormContent>
        </SectionContent>
      </div>
    </SectionWrapper>
  );
};

export default NftDetails;
