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
  currentPrice?: bigint;
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

