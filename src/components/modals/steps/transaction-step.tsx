import { useTranslation } from 'react-i18next';
import {
  TransactionStepContainer,
  NextStepContainer,
  TransactionStepDetails,
  TransactionIconContainer,
  TransactionLoadingOutline,
  TransactionLoader,
  CheckedIcon,
  TransactionIcon,
  NextStepIcon,
  TransactionStepName,
} from './styles';

import greenCheckIcon from '../../../assets/green-check.svg';
import { TransactionStatus } from '../../../constants/transaction-status';
import { Icon } from '../../icons';

/* --------------------------------------------------------------------------
 * Insufficient Balance Step Component
 * --------------------------------------------------------------------------*/

export type TransactionStepProps = {
  name: string;
  status: any;
  iconName: any;
  nextStepAvailable?: boolean;
};

export const TransactionStep = ({
  name,
  status,
  iconName,
  nextStepAvailable,
}: TransactionStepProps) => {
  const { t } = useTranslation();

  return (
    <TransactionStepContainer>
      <TransactionStepDetails>
        <TransactionIconContainer status={status}>
          {status === TransactionStatus.InProgress && (
            <TransactionLoadingOutline />
          )}
          {status === TransactionStatus.InProgress && (
            <TransactionLoader />
          )}
          {status === TransactionStatus.Completed && (
            <CheckedIcon src={greenCheckIcon} alt="checked" />
          )}
          <TransactionIcon status={status}>
            <Icon icon={iconName} />
          </TransactionIcon>
        </TransactionIconContainer>
        <TransactionStepName status={status}>
          {name}
        </TransactionStepName>
      </TransactionStepDetails>
      {nextStepAvailable && (
        <NextStepContainer status={status}>
          <NextStepIcon>
            <Icon icon="nextStep" />
          </NextStepIcon>
        </NextStepContainer>
      )}
    </TransactionStepContainer>
  );
};
