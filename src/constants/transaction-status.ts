export enum TransactionStatus {
  notStarted = 'notStarted',
  inProgress = 'inProgress',
  completed = 'completed',
}

export type TransactionStatusType = keyof typeof TransactionStatus;

export enum TransactionApprovals {
  sale = 'sale',
  offer = 'offer',
  list = 'list',
  check = 'check',
}

export type TransactionApprovalType =
  keyof typeof TransactionApprovals;
