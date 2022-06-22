import { OperationTypes } from '../constants/operations';

type LogType = 'debug' | 'info' | 'warn' | 'error';

interface LogBaseParams {
  type: LogType;
  description: string;
  data?: Record<string, any>;
}

const RETRY_TIMEOUT = 1400;
const RETRY_MAX_ATTEMPTS = 1;

const logBase = (
  { type, description, data }: LogBaseParams,
  retryCount = 1,
): void => {
  if (!(window as any).DD_LOGS_IS_READY) {
    if (retryCount > RETRY_MAX_ATTEMPTS) {
      // eslint-disable-next-line no-console
      console.warn('Oops! Logger not ready, retry attempted...');

      return;
    }

    retryCount += 1;

    setTimeout(() => {
      // eslint-disable-next-line no-console
      console.warn('Oops! Logger not ready, retrying...');

      logBase(
        {
          type,
          description,
          data,
        },
        retryCount,
      );
    }, RETRY_TIMEOUT);
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    (window as any).DD_LOGS &&
      (window as any).DD_LOGS.logger[type](description, data);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Oops! Logger failed', err);
  }
};

type LogParams = Pick<LogBaseParams, 'type' | 'description' | 'data'>;

export const log = ({ type, description, ...data }: LogParams) =>
  logBase({
    type,
    description,
    data,
  });

type InfoParams = Pick<LogParams, 'description' | 'data'>;

export const logInfo = ({ description, ...args }: InfoParams) =>
  logBase({
    type: 'info',
    description,
    ...args,
  });

interface LogDescriptionParams {
  operation: keyof typeof OperationTypes;
  parts: string[];
}

export const getLogDescription = ({
  operation,
  parts,
}: LogDescriptionParams) => `${operation}:${parts.join(':')}`;

