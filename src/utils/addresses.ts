import { getICNSName } from './icns';
import { formatAddress } from './formatters';

export const formatUserAddress = async (principal?: string) => {
  if (!principal) return '';

  const icnsName = await getICNSName(principal);

  if (icnsName) return icnsName;

  return formatAddress(principal);
};
