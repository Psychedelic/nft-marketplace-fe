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
  StyledIcon,
} from './styles';

type NftDetailsProps = {
  handleStep?: () => void;
};

const NftDetails = ({ handleStep }: NftDetailsProps) => {
  const { t } = useTranslation();

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
                External link
              </SubText>
              <SubText size="sm">
                Jelly will include a link to this URL on this item's
                detail page, so that users can click to learn more
                about it. You are welcome to link to your own webpage
                with more details.
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
                This is the Description of your NFT items
              </SubText>
              <SectionTextArea />
            </SectionFormContentWrapper>
            <Divider gap="sm" />
            <SectionFormContentWrapper>
              <SubText type="title" size="sm">
                Collection
              </SubText>
              <SubText size="sm">
                This is the collection where your items will appear.
              </SubText>
              <div>
                <LinkInputContent>
                  <InputIconButton borderless={true}>
                    <StyledIcon colorType="input" icon="twitter" />
                  </InputIconButton>
                  <SectionInputField
                    placeholder="Cryptodickbutts"
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
              <SubTextLabel>Supply</SubTextLabel>
              <SubText size="sm">
                The number of items that can be minted. No gas cost to
                you!
              </SubText>
              <SectionInputField
                placeholder={t(
                  'translation:onboarding.namePlaceholder',
                )}
                type="text"
                inputStyle="fullWidth"
              />
            </SectionFormContentWrapper>
            <Divider gap="sm" />
            <SectionFormContentWrapper>
              <SubText type="title" size="sm">
                Blockchain
              </SubText>
              <SectionInputField
                placeholder={t(
                  'translation:onboarding.namePlaceholder',
                )}
                type="text"
                inputStyle="fullWidth"
              />
            </SectionFormContentWrapper>
          </SectionFormContent>
        </SectionContent>
      </div>
    </SectionWrapper>
  );
};

export default NftDetails;
