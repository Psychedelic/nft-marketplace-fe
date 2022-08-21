import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ConnectCanisterId from './connect-canister-id';
import CollectionDetails from './collection-details';
import {
  OnboardingWrapper,
  ProgressStepBarContainer,
  ProgressStepBarWrapper,
  ProgressStepBar,
  ProgressStepBarText,
  Divider,
  Progress,
  StyledActionButton,
  ButtonWrapper,
} from './styles';
import NftDetails from './nft-details';

const progressBarItem = [
  {
    name: '1. Connect Canister ID',
    id: '1',
  },
  {
    name: '2. Collection details',
    id: '2',
  },
  {
    name: '3. NFT details',
    id: '3',
  },
];

const Onboarding = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState<Array<string>>(['1']);
  const setIsActive = (id: string) => step.includes(id);

  const handleStep = () => {
    if (step.length === 1) {
      setStep([...step, '2']);
    } else if (step.length === 2) {
      setStep([...step, '3']);
    } else return;
  };

  return (
    <OnboardingWrapper>
      <Progress>
        <ProgressStepBarContainer>
          {progressBarItem.map((item) => (
            <ProgressStepBarWrapper>
              <ProgressStepBarText isActive={setIsActive(item.id)}>
                {item.name}
              </ProgressStepBarText>
              <ProgressStepBar isActive={setIsActive(item.id)} />
            </ProgressStepBarWrapper>
          ))}
        </ProgressStepBarContainer>
        <ButtonWrapper>
          <StyledActionButton
            type="active"
            size="small"
            onClick={() => handleStep()}
            disabled
          >
            {t('translation:common.next')}
          </StyledActionButton>
        </ButtonWrapper>
      </Progress>
      <Divider />
      <ConnectCanisterId handleStep={() => setStep([...step, '2'])} />
      <Divider />
      <CollectionDetails handleStep={() => setStep([...step, '3'])} />
      <Divider />
      <NftDetails />
    </OnboardingWrapper>
  );
};

export default Onboarding;
