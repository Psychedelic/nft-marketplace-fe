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

const otherErrorParser = (Err: Err) => {
  const key = Object.keys(Err)[0];
  const errorKey = Err[key];

  return errorKey;
};

const parseError = (Err: Err) => {
  const errorKey = Object.keys(Err)[0];

  if (Err[errorKey]) {
    return otherErrorParser(Err);
  }

  return errorKey;
};

export const errorMessageHandler = (Err: Err) => {
  try {
    const errorKey = parseError(Err);

    return toErrorMessage(errorKey);
  } catch (err) {
    console.warn(err);

    return toErrorMessage('');
  }
};

