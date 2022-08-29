import { useEffect, useState } from 'react';
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
  const dispatch = useAppDispatch();
  const [step, setStep] = useState<Array<string>>(['1']);
  const [isNftDetailsSubmitting, setIsNftDetailsSubmitting] =
    useState(false);
  const [
    isCollectionDetailsSubmitting,
    setIsCollectionDetailsSubmitting,
  ] = useState(false);
  const [
    isCollectionDetailsSubmitted,
    setIsCollectionDetailsSubmitted,
  ] = useState(false);
  const [isNftDetailsSubmitted, setIsNftDetailsSubmitted] =
    useState(false);
  const [isCanisterIdSubmitted, setIsCanisterIdSubmitted] =
    useState(false);
  const { collectionDetails } = useOnboardingStore();
  const setIsActive = (id: string) => step.includes(id);
  const setCanisterIdFilled = (id: string) =>
    id === '1' && isCanisterIdSubmitted;
  const setCollectionDetailsFilled = (id: string) =>
    id === '2' && isCollectionDetailsSubmitted;
  const setNftDetailsFilled = (id: string) =>
    id === '3' && isNftDetailsSubmitted;

  useEffect(() => {
    dispatch(
      onboardingActions.setCollectionDetails({
        ...collectionDetails,
        formErrors: validateFields(collectionDetails),
      }),
    );
  }, [
    collectionDetails.logo,
    collectionDetails.name,
    collectionDetails.royalties,
  ]);

  const handleCollectionDetailsSubmit = () => {
    setIsCollectionDetailsSubmitting(true);
    if (!collectionDetails.formErrors.error) {
      setStep([...step, '3']);
      setIsCollectionDetailsSubmitted(true);
    } else return;
  };

  const validateFields = (values: any) => {
    const errors = {
      logo: '',
      name: '',
      royalties: '',
      error: false,
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

    if (!values.royalties || !values.name || !values.logo) {
      errors.error = true;
    }

    return errors;
  };

  const handleStep = () => {
    switch (step.length) {
      case 1:
        setStep([...step, '2']);
        break;
      case 2:
        handleCollectionDetailsSubmit();
        break;
      default:
        break;
    }
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
                <ProgressStepBar
                  isActive={setIsActive(item.id)}
                  isCanisterIdSubmitted={setCanisterIdFilled(item.id)}
                  isCollectionDetailsSubmitted={setCollectionDetailsFilled(
                    item.id,
                  )}
                  isNftDetailsSubmitted={setNftDetailsFilled(item.id)}
                />
              </ProgressStepBarWrapper>
            ))}
          </ProgressStepBarContainer>
          <ButtonWrapper>
            {step.includes('3') ? (
              <ApproveXTC
                type="active"
                setIsSubmitting={setIsNftDetailsSubmitting}
                setIsNftDetailsSubmitted={setIsNftDetailsSubmitted}
              />
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
          <ConnectCanisterId
            handleStep={handleStep}
            setIsCanisterIdSubmitted={setIsCanisterIdSubmitted}
          />
        </div>
        <Divider />
        <FormSectionContainer
          disable={!step.includes('2') && true}
          enable={step.includes('2') && true}
        >
          <CollectionDetails
            handleStep={handleStep}
            isSubmitting={isCollectionDetailsSubmitting}
          />
        </FormSectionContainer>
        <Divider />
        <FormSectionContainer
          disable={!step.includes('3') && true}
          enable={step.includes('3') && true}
        >
          <NftDetails
            isSubmitting={isNftDetailsSubmitting}
            setIsSubmitting={setIsNftDetailsSubmitting}
            setIsNftDetailsSubmitted={setIsNftDetailsSubmitted}
          />
        </FormSectionContainer>
      </OnboardingWrapper>
    </>
  );
};

export default Onboarding;
