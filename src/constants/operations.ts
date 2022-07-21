export enum OperationTypes {
  makeListing = 'makeListing',
  directBuy = 'directBuy',
  makeOffer = 'makeOffer',
  denyOffer = 'denyOffer',
  cancelOffer = 'cancelOffer',
  cancelListing = 'cancelListing',
  acceptOffer = 'acceptOffer',
  mint = 'mint',
}

export type OperationType = keyof typeof OperationTypes;
