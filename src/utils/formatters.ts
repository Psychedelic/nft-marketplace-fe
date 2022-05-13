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

export const parseAmountToE8SAsNum = (amount: string) => {
  if (!amount) return '';

  const computedNumber = Number(parseAmountToE8S(amount));

  return computedNumber;
}

const fixStringEnding = (str: string): string =>
  str.replace(/0+$/, '').replace(/\.$/, '');

export const formatAmountDecimals = (amount?: string | number) => {
  const fixedAmount = Number(amount).toFixed(8);
  if (fixedAmount === 'NaN' || fixedAmount === 'Infinity' || !amount)
    return '0.00';

  return fixStringEnding(fixedAmount);
};

export const formatAmountAbbreviation = (
  amount?: string | number,
): string => {
  const fixedAmount = Number(amount).toFixed(8);
  if (fixedAmount === 'NaN' || fixedAmount === 'Infinity' || !amount)
    return '0.00';

  const [nat = '0', decimals = '0'] = fixedAmount
    .replace(/^0+/, '')
    .split('.');

  if (Number(nat) === 0 && Number(decimals) === 0) return '0.00';

  const isNegative = Math.sign(Number(fixedAmount)) === -1;

  const thousands = Math.floor(Math.log10(Math.abs(Number(nat))));

  if (thousands < 3) {
    if (!Number(nat) && /^00/.test(decimals)) {
      return `${isNegative ? '> -' : '< '}0.01`;
    }
    return fixStringEnding(`${nat || 0}.${decimals.slice(0, 2)}`);
  }
  if (thousands < 6) {
    return `${fixStringEnding(
      `${nat.slice(0, -3)}.${nat.slice(-3, -1)}`,
    )}k`;
  }
  if (thousands < 9) {
    return `${fixStringEnding(
      `${nat.slice(0, -6)}.${nat.slice(-6, -4)}`,
    )}M`;
  }
  return `${isNegative ? '< -' : '> '}999M`;
};
