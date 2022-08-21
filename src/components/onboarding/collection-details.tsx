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
  SubTextLabel,
} from './styles';
import { ActionButton } from '../core';
import ImageForms from './components/image-forms';
import TextInputFields from './components/text-input-fields';

type CollectionDetailsProps = {
  handleStep?: () => void;
};

const CollectionDetails = ({
  handleStep,
}: CollectionDetailsProps) => {
  const { t } = useTranslation();

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
            <ImageForms />
            {/* Text input fields */}
            <TextInputFields />
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
