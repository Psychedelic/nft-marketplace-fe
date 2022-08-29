import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { SpinnerIcon } from '../icons/custom';
import {
  SectionWrapper,
  SectionContent,
  Header,
  SubText,
  SectionFormContent,
  SectionInputField,
  SectionInputButton,
  InputContainer,
  ErrorMessage,
  WarningIcon,
  SpinnerWrapper,
} from './styles';

type ConnectCanisterIdProps = {
  handleStep?: () => void;
  setIsCanisterIdSubmitted: (value: boolean) => void;
};

const ConnectCanisterId = ({
  handleStep,
  setIsCanisterIdSubmitted,
}: ConnectCanisterIdProps) => {
  const { t } = useTranslation();
  const [error, setError] = useState(false);
  const [canisterId, setCanisterId] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (canisterId === '') {
      setError(true);
    } else {
      setError(false);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        handleStep && handleStep();
        setIsCanisterIdSubmitted(true);
      }, 1000);
      setSubmitted(true);
    }
  };

  return (
    <>
      {loading && (
        <SpinnerWrapper>
          <SpinnerIcon color="white" size="35" />
        </SpinnerWrapper>
      )}
      <SectionWrapper firstItem={true}>
        <div>
          <SectionContent>
            <Header>
              1. {t('translation:onboarding.connectCollection')}
            </Header>
            <SubText>
              <Trans t={t}>
                For now, we're providing the insertion of existing
                collections approved via <a>DAB</a>. If you want to
                get yours on Jelly, please fill out the{' '}
                <a>DAB form</a> and wait for the approval.
              </Trans>
            </SubText>
          </SectionContent>
          <SectionFormContent>
            <SubText type="title" size="sm">
              {t('translation:onboarding.canisterId')}
            </SubText>
            <SubText size="sm">
              {t('translation:onboarding.insertCanisterId')}
            </SubText>
            <InputContainer>
              <SectionInputField
                type="tel"
                placeholder="xxx-xxxxxxxxxx-xx"
                onChange={(e) => setCanisterId(e.target.value)}
                disabled={submitted}
              />
              <SectionInputButton
                role="submit"
                submitted={submitted}
                onClick={handleSubmit}
              >
                {t('translation:onboarding.validate')}
              </SectionInputButton>
            </InputContainer>
            {error && (
              <ErrorMessage>
                <WarningIcon icon="warning" />
                {t('translation:onboarding.custodianError')}
              </ErrorMessage>
            )}
          </SectionFormContent>
        </div>
      </SectionWrapper>
    </>
  );
};

export default ConnectCanisterId;
