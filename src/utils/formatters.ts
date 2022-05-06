import { E8S_PER_ICP } from '../constants/common';

export const formatAddress = (address: string) => {
  if (!address) {
    return '';
  }
  const split = address.split('-');

  return `${split[0]}...${split[split.length - 1]}`;
};

export const floorDiffPercentageCalculator = ({
  currentPrice,
  floorDifferencePrice,
}: {
  currentPrice?: string;
  floorDifferencePrice?: string;
}) => {
  if (!currentPrice || !floorDifferencePrice) return 'n/a';

  const difference =
    Number(currentPrice) - Number(floorDifferencePrice);
  const floorDifference = (
    (difference / Number(floorDifferencePrice)) *
    100
  ).toFixed(2);

  return `${floorDifference}%`;
};

export const formatPriceValue = (price: string) => {
  if (!price || price === 'n/a') return 'n/a';

  return Number(price).toFixed(2);
};

// Almost everytime we are getting amount type is string
// So we declared amount type: string instead of number
export const parseAmountToE8S = (amount: string) => {
  // TODO: handle error notification when amount is not available
  if (!amount) return BigInt(0);

  const computedAmount = Number(amount) * E8S_PER_ICP;

  return BigInt(computedAmount);
};

// parseE8SAmountToWICP is going to be used in different
// places where amount type can be string/number/bigint
// So we declared amount type: any and handled respective
// type while parsing
export const parseE8SAmountToWICP = (amount: any) => {
  let computedWICP: any = '';

  if (!amount) return amount;

  if (typeof amount === 'string') {
    computedWICP = Number(amount) / E8S_PER_ICP;
  }

  if (typeof amount === 'number') {
    computedWICP = amount / E8S_PER_ICP;
  }

  if (typeof amount === 'bigint') {
    computedWICP = Number(amount.toString()) / E8S_PER_ICP;
  }

  return computedWICP.toString();
};
