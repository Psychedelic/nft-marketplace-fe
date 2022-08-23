import { useAppSelector } from '../../hooks';
import { selectOnboardingState } from './onboarding-slice';

export const useOnboardingStore = () =>
  useAppSelector(selectOnboardingState);
