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
import nextStepIcon from '../../../assets/next-step.svg';
import { TransactionStatus } from '../../../constants/transaction-status';

/* --------------------------------------------------------------------------
 * Insufficient Balance Step Component
 * --------------------------------------------------------------------------*/

export type TransactionStepProps = {
  name: string;
  status: TransactionStatus;
  iconSrc: string;
  nextStepAvailable?: boolean;
};

export const TransactionStep = ({
  name,
  status,
  iconSrc,
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
          <TransactionIcon
            src={iconSrc}
            alt="transaction-logo"
            status={status}
          />
        </TransactionIconContainer>
        <TransactionStepName status={status}>
          {name}
        </TransactionStepName>
      </TransactionStepDetails>
      {nextStepAvailable && (
        <NextStepContainer status={status}>
          <NextStepIcon src={nextStepIcon} alt="next-step" />
        </NextStepContainer>
      )}
    </TransactionStepContainer>
  );
};
