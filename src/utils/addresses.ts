import { getICNSName, formatICNSName } from './icns';
import { formatAddress } from './formatters';

export const formatUserAddress = async (principal?: string) => {
  if (!principal) return '';

  const icnsName = await getICNSName(principal);

  if (icnsName) return formatICNSName(icnsName);

  return formatAddress(principal);
};
