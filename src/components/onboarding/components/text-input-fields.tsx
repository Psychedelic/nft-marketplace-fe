import { useTranslation } from 'react-i18next';
import { Icon } from '../../icons';
import {
  SubText,
  SectionFormContentWrapper,
  Divider,
  SectionInputField,
  SectionTextArea,
  InputIconButton,
  LinkInputContentWrapper,
  LinkInputContent,
  SubTextLabel,
} from '../styles';
import { Website } from '../../icons/custom';

const TextInputFields = () => {
  const { t } = useTranslation();

  const linkInputs = [
    {
      icon: 'website',
      url: 'yourwebsite.ooo',
    },
    {
      icon: 'discord',
      url: 'https://discord.gg/',
    },
    {
      icon: 'twitter',
      url: 'https://twitter.com/',
    },
  ];

  return (
    <>
      {/* Text input fields */}
      <SectionFormContentWrapper>
        <SubTextLabel>
          {t('translation:onboarding.name')}
        </SubTextLabel>
        <SubText size="sm">
          {t('translation:onboarding.nameInstruction')}
        </SubText>
        <SectionInputField
          placeholder={t('translation:onboarding.namePlaceholder')}
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
          {t('translation:onboarding.descriptionInstruction')}
        </SubText>
        <SectionTextArea />
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
          placeholder={t('translation:onboarding.urlPlaceholder')}
          type="text"
          inputStyle="fullWidth"
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
          {linkInputs.map((linkInput) => (
            <LinkInputContent>
              <InputIconButton>
                {linkInput.icon === 'website' ? (
                  <Website color="#777E90" />
                ) : (
                  <Icon
                    colorType="input"
                    icon={
                      linkInput.icon === 'discord'
                        ? 'discord'
                        : 'twitter'
                    }
                  />
                )}
              </InputIconButton>
              <SectionInputField
                placeholder={linkInput.url}
                type="text"
                inputStyle="leftButton"
              />
            </LinkInputContent>
          ))}
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
        />
      </SectionFormContentWrapper>
      <Divider gap="sm" />
    </>
  );
};

export default TextInputFields;
