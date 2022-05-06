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

export const parseAmountToE8S = (amount: string) => {
  if (!amount) return BigInt(0);

  const computedAmount = Number(amount) * E8S_PER_ICP;

  return BigInt(computedAmount);
};

export const parseE8SAmountToWICP = (amount: bigint) => {
  if (!amount) return '';

  const computedWICP = Number(amount.toString()) / E8S_PER_ICP;

  return computedWICP.toString();
};
