type Err = Record<string, any>;

const toErrorMessage = (errorKey: string) => {
  // TODO: Error messages should use intl translate
  switch (errorKey) {
    case 'InsufficientFungibleBalance':
    case 'InsufficientBalance':
      return 'Oops! Insufficient fungible balance';
    case 'Unauthorized':
      return 'Oops! Marketplace is not authorized to perform the transaction';
    default:
      return 'Oops! Unknown error';
  }
};

const extractErrorKey = (err: Err) => {
  const keys = Object.keys(err);

  if (!keys.length) return;

  return keys[0];
};

const otherErrorParser = (err: Err) => {
  const key = extractErrorKey(err);

  if (!key) return;

  const errorKey = err[key];

  return errorKey;
};

const parseError = (err: Err) => {
  const errorKey = extractErrorKey(err);

  // If the value of error[key] is a string
  // then we need to compute the Other(string)
  // otherwise we return errorKey
  if (!errorKey || typeof err[errorKey] === 'string') {
    return otherErrorParser(err);
  }

  return errorKey;
};

export const errorMessageHandler = (err: Err) => {
  try {
    const errorKey = parseError(err);

    return toErrorMessage(errorKey);
  } catch (error) {
    console.warn(error);

    return toErrorMessage('');
  }
};

