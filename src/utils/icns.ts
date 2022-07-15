import { ICNSReverseController } from '@psychedelic/icns-js';
import { Principal } from '@dfinity/principal';

const reverseNameActor = new ICNSReverseController();

export const getICNSName = async (plugPrincipalId: string) => {
  const owner = Principal.fromText(plugPrincipalId);
  const icnsName = await reverseNameActor.getReverseName(owner);
  return icnsName;
};
