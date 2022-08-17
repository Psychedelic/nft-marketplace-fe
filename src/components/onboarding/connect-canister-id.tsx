import { useTranslation } from 'react-i18next';
import {
  SectionWrapper,
  SectionTextContent,
  Header,
  SubText,
  SectionFormContent,
  SectionInputField,
  SectionInputButton,
  InputContainer,
} from './styles';

const ConnectCanisterId = () => {
  const { t } = useTranslation();

  return (
    <SectionWrapper>
      <div>
        <SectionTextContent>
          <Header>
            1. {t('translation:onboarding.connectCollection')}
          </Header>
          <SubText>
            For now, we're providing the insertion of existing
            collections approved via <a>DAB</a>. If you want to get
            yours on Jelly, please fill out the <a>DAB form</a> and
            wait for the approval.
          </SubText>
        </SectionTextContent>
        <SectionFormContent>
          <SubText type="title" size="sm">
            {t('translation:onboarding.canisterId')}
          </SubText>
          <SubText size="sm">
            {t('translation:onboarding.insertCanisterId')}
          </SubText>
          <InputContainer
            style={{
              display: 'flex',
              position: 'relative',
            }}
          >
            <SectionInputField
              type="tel"
              placeholder="xxx-xxxxxxxxxx-xx"
            />
            <SectionInputButton>
              {t('translation:onboarding.validate')}
            </SectionInputButton>
          </InputContainer>
        </SectionFormContent>
      </div>
    </SectionWrapper>
  );
};

export default ConnectCanisterId;
