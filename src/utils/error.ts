type Err = Record<string, any>;

const toErrorMessage = (errorKey: string) => {
  console.warn(errorKey);

  // TODO: Error messages should use intl translate
  switch (errorKey) {
    case 'InsufficientFungibleBalance':
    case 'InsufficientBalance':
      return 'Oops! It looks like the buyer does not have enough fungible balance to complete the sale';
    case 'Unauthorized':
      return 'Oops! Marketplace is not authorized to perform the transaction';
    case 'InvalidOperator':
    case 'InvalidOwner':
      return "Oops! Can't be purchased at this time, possibly because token was transferred outside Jelly marketplace to a new wallet";
    case 'NoDeposit':
      return 'Oops! Missing deposit';
    case 'InvalidOffer':
    case 'InvalidOfferStatus':
      return 'Oops! The offer is not valid';
    case 'NonExistentCollection':
      return 'Oops! Unknown collection';
    case 'InvalidListing':
      return 'Oops! The listing is invalid or was not found at this time';
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

