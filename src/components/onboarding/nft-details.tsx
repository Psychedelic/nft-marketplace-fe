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
  NftImage,
  NftImageLabel,
  StyledSwitch,
  StyledThumb,
  NftSampleWrapper,
  NftNameDetailsWrapper,
  UnblockableContent,
  ErrorMessage,
  WarningIcon,
  DetailsButtonWrapper,
  RangeWrapper,
  RangeLabel,
} from './styles';
import collectionPlaceholder from '../../assets/collection-input-placeholder.svg';
import blockchainPlaceholder from '../../assets/icp-logo.svg';
import { ApproveXTC } from '../modals/approve-xtc';
import {
  onboardingActions,
  useAppDispatch,
  useOnboardingStore,
} from '../../store';
import placeholderImage from '../../assets/nft-placeholder-image.png';
import placeholderImageTwo from '../../assets/nft-placeholder-image(2).png';
import placeholderImageThree from '../../assets/nft-placeholder-image(3).png';
import { CollectionAccordion } from '../core/accordions/collection-accordion';
import Traits from '../traits/traits';

type NftDetailsProps = {
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
  setIsNftDetailsSubmitted: (value: boolean) => void;
};

const NftDetails = ({
  isSubmitting,
  setIsSubmitting,
  setIsNftDetailsSubmitted,
}: NftDetailsProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { nftDetails } = useOnboardingStore();
  const isNameValid = isSubmitting && nftDetails.formErrors.name;
  const isSupplyValid = isSubmitting && nftDetails.formErrors.supply;

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
            width: '480px',
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
                    <NftImage
                      src={placeholderImage}
                      alt="placeholder-image"
                    />
                    <NftImageLabel>
                      {t('translation:onboarding.namePlaceholder')} #1
                    </NftImageLabel>
                  </InputWrapper>
                  <InputWrapper type="nft">
                    <NftImage
                      src={placeholderImageTwo}
                      alt="placeholder-image"
                    />
                    <NftImageLabel>
                      {t('translation:onboarding.namePlaceholder')} #2
                    </NftImageLabel>
                  </InputWrapper>
                  <InputWrapper>
                    <NftImage
                      src={placeholderImageThree}
                      alt="placeholder-image"
                    />
                    <NftImageLabel>
                      {t('translation:onboarding.namePlaceholder')} #3
                    </NftImageLabel>
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
                    error={isNameValid ? true : false}
                  />
                  <RangeWrapper>
                    <RangeLabel>#</RangeLabel>
                    <SectionInputField
                      placeholder="1"
                      type="text"
                      inputStyle="smallWithLabel"
                      disabled
                    />
                  </RangeWrapper>
                  <RangeWrapper>
                    <RangeLabel>#</RangeLabel>
                    <SectionInputField
                      placeholder="10.000"
                      type="text"
                      inputStyle="smallWithLabel"
                      disabled
                    />
                  </RangeWrapper>
                </NftNameDetailsWrapper>
                {isNameValid && (
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
                  form="text"
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
                    <InputIconButton borderless="full">
                      <StyledImgPlaceholder
                        src={collectionPlaceholder}
                        alt=""
                      />
                    </InputIconButton>
                    <CollectionAccordion />
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
                  error={isSupplyValid ? true : false}
                />
                {isSupplyValid && (
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
                    <InputIconButton borderless="right">
                      <StyledImgPlaceholder
                        src={blockchainPlaceholder}
                        alt=""
                      />
                    </InputIconButton>
                    <SectionInputField
                      disabledStyle="custom"
                      placeholder={t(
                        'translation:onboarding.blockchainPlaceholder',
                      )}
                      type="text"
                      name="blockchain"
                      inputStyle="borderless"
                      onChange={handleChange}
                      disabled
                    />
                  </LinkInputContent>
                </div>
              </SectionFormContentWrapper>
              <Divider gap="sm" />
              <SectionFormContentWrapper>
                <Traits />
              </SectionFormContentWrapper>
              <DetailsButtonWrapper size="wide">
                <ApproveXTC
                  setIsSubmitting={setIsSubmitting}
                  setIsNftDetailsSubmitted={setIsNftDetailsSubmitted}
                />
              </DetailsButtonWrapper>
            </SectionFormContent>
          </SectionContent>
        </div>
      </SectionWrapper>
    </>
  );
};

export default NftDetails;
