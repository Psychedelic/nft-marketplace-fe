import { TransactionStatus } from '../constants/transaction-status';

export const isEmptyObject = (obj: any) => {
  return (
    obj && Object.keys(obj).length === 0 && obj.constructor === Object
  );
};

export const findTransactionStatus = (status: string) => {
  if (status === 'inProgress') return TransactionStatus.inProgress;

  if (status === 'completed') return TransactionStatus.completed;

  return TransactionStatus.notStarted;
};
