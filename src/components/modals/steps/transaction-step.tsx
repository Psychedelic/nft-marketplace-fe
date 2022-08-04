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
import {
  TransactionStatus,
  TransactionStatusType,
  TransactionApprovalType,
} from '../../../constants/transaction-status';
import { Icon } from '../../icons';

/* --------------------------------------------------------------------------
 * Insufficient Balance Step Component
 * --------------------------------------------------------------------------*/

export type TransactionStepProps = {
  name: string;
  status: TransactionStatusType;
  iconName: TransactionApprovalType;
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
          {status === TransactionStatus.inProgress && (
            <TransactionLoadingOutline />
          )}
          {status === TransactionStatus.inProgress && (
            <TransactionLoader />
          )}
          {status === TransactionStatus.completed && (
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
