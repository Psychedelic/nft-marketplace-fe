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
  FormSectionContainer,
} from './styles';
import NftDetails from './nft-details';
import { ApproveXTC } from '../modals/approve-xtc';
import {
  onboardingActions,
  useAppDispatch,
  useOnboardingStore,
} from '../../store';

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
  const { collectionDetails } = useOnboardingStore();
  const dispatch = useAppDispatch();

  const handleCollectionDetailsSubmit = () => {
    dispatch(
      onboardingActions.setCollectionDetails({
        ...collectionDetails,
        formErrors: validateFields(collectionDetails),
      }),
    );
  };

  const validateFields = (values: any) => {
    const errors = {
      logo: '',
      name: '',
      royalties: '',
    };

    if (!values.logo) {
      errors.logo = t('translation:onboarding.emptyFieldError');
    }

    if (!values.name) {
      errors.name = t('translation:onboarding.emptyFieldError');
    }

    if (!values.royalties) {
      errors.royalties = t('translation:onboarding.emptyFieldError');
    }

    return errors;
  };

  const handleStep = () => {
    if (step.length === 1) {
      setStep([...step, '2']);
    } else if (step.length === 2) {
      handleCollectionDetailsSubmit();

      if (
        collectionDetails.formErrors.logo !== '' ||
        collectionDetails.formErrors.name !== '' ||
        collectionDetails.formErrors.royalties !== ''
      ) {
        setStep([...step, '3']);
      } else return;
    } else return;
  };

  return (
    <>
      <OnboardingWrapper>
        <Progress>
          <ProgressStepBarContainer>
            {progressBarItem.map((item, index) => (
              <ProgressStepBarWrapper key={index}>
                <ProgressStepBarText isActive={setIsActive(item.id)}>
                  {item.name}
                </ProgressStepBarText>
                <ProgressStepBar isActive={setIsActive(item.id)} />
              </ProgressStepBarWrapper>
            ))}
          </ProgressStepBarContainer>
          <ButtonWrapper>
            {step.includes('3') ? (
              <ApproveXTC />
            ) : (
              <StyledActionButton
                type="active"
                size="small"
                onClick={() => handleStep()}
                disabled={step.length <= 1 && true}
              >
                {t('translation:common.next')}
              </StyledActionButton>
            )}
          </ButtonWrapper>
        </Progress>
        <Divider />
        <div>
          <ConnectCanisterId handleStep={handleStep} />
        </div>
        <Divider />
        <FormSectionContainer
          disable={!step.includes('2') && true}
          enable={step.includes('2') && true}
        >
          <CollectionDetails handleStep={handleStep} />
        </FormSectionContainer>
        <Divider />
        <FormSectionContainer
          disable={!step.includes('3') && true}
          enable={step.includes('3') && true}
        >
          <NftDetails />
        </FormSectionContainer>
      </OnboardingWrapper>
    </>
  );
};

export default Onboarding;
