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
  ErrorMessage,
  WarningIcon,
  DetailsButtonWrapper,
} from './styles';
import collectionPlaceholder from '../../assets/collection-input-placeholder.svg';
import blockchainPlaceholder from '../../assets/icp-logo.svg';
import { Icon } from '../icons';
import { ApproveXTC } from '../modals/approve-xtc';
import {
  onboardingActions,
  useAppDispatch,
  useOnboardingStore,
} from '../../store';

const NftDetails = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { nftDetails } = useOnboardingStore();

  const handleChange = (e: any) => {
    const { name, value, files, type } = e.target;
    if (type === 'file') {
      dispatch(
        onboardingActions.setNftDetails({
          ...nftDetails,
          [name]: URL.createObjectURL(files[0]),
        }),
      );
    } else if (type === 'text' || name === 'description') {
      dispatch(
        onboardingActions.setNftDetails({
          ...nftDetails,
          [name]: value,
        }),
      );
    }
  };

  return (
    <>
      <SectionWrapper>
        <div
          style={{
            marginBottom: '30px',
          }}
        >
          <SectionContent>
            <Header>
              3. {t('translation:onboarding.nftDetails')}
            </Header>
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
                      id="nftOne"
                      name="nftOne"
                      accept="image/*"
                      imageType="nft"
                      onChange={handleChange}
                      isInputFilled={nftDetails.nftOne ? true : false}
                    />
                    {nftDetails.nftOne ? (
                      <NftImageFieldWrapper>
                        <NftImageField src={nftDetails.nftOne} />
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
                      id="nftTwo"
                      name="nftTwo"
                      accept="image/*"
                      imageType="nft"
                      onChange={handleChange}
                      isInputFilled={nftDetails.nftTwo ? true : false}
                    />
                    {nftDetails.nftTwo ? (
                      <NftImageFieldWrapper>
                        <NftImageField src={nftDetails.nftTwo} />
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
                      id="nftThree"
                      name="nftThree"
                      accept="image/*"
                      imageType="nft"
                      onChange={handleChange}
                      isInputFilled={
                        nftDetails.nftThree ? true : false
                      }
                    />
                    {nftDetails.nftThree ? (
                      <NftImageFieldWrapper>
                        <NftImageField src={nftDetails.nftThree} />
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
                    name="name"
                    inputStyle="fullWidth"
                    onChange={handleChange}
                    error={nftDetails.formErrors.name ? true : false}
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
                {nftDetails.formErrors.name && (
                  <ErrorMessage>
                    <WarningIcon icon="warning" />
                    {nftDetails.formErrors.name}
                  </ErrorMessage>
                )}
              </SectionFormContentWrapper>
              <SectionFormContentWrapper>
                <SubText type="title" size="sm">
                  {t('translation:onboarding.externalLink')}
                </SubText>
                <SubText size="sm">
                  {t(
                    'translation:onboarding.externalLinkDescription',
                  )}
                </SubText>
                <SectionInputField
                  placeholder="https://yourwebsite/artwork/6"
                  type="text"
                  name="externalLink"
                  inputStyle="fullWidth"
                  onChange={handleChange}
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
                <SectionTextArea
                  name="description"
                  onChange={handleChange}
                />
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
                      name="collection"
                      inputStyle="borderless"
                      onChange={handleChange}
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
                  name="supply"
                  inputStyle="fullWidth"
                  onChange={handleChange}
                  error={nftDetails.formErrors.supply ? true : false}
                />
                {nftDetails.formErrors.supply && (
                  <ErrorMessage>
                    <WarningIcon icon="warning" />
                    {nftDetails.formErrors.supply}
                  </ErrorMessage>
                )}
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
                      name="blockchain"
                      inputStyle="borderless"
                      onChange={handleChange}
                    />
                  </LinkInputContent>
                </div>
              </SectionFormContentWrapper>
              <DetailsButtonWrapper size="wide">
                <ApproveXTC />
              </DetailsButtonWrapper>
            </SectionFormContent>
          </SectionContent>
        </div>
      </SectionWrapper>
    </>
  );
};

export default NftDetails;
