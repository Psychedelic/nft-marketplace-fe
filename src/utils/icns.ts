import { ICNSReverseController } from '@psychedelic/icns-js';
import { Principal } from '@dfinity/principal';

const reverseNameActor = new ICNSReverseController();

export const getICNSName = async (plugPrincipalId: string) => {
  const owner = Principal.fromText(plugPrincipalId);
  const icnsName = await reverseNameActor.getReverseName(owner);
  return icnsName;
};

export const formatICNSName = (name: string) => {
  if (!name) {
    return '';
  }

  if (name.length < 14) return name;

  return `${name.substring(0, 4)}...${name.substring(
    name.length - 6,
    name.length,
  )}`;
};
