export enum OperationTypes {
  makeListing = 'list',
  directBuy = 'sale',
  makeOffer = 'offer',
  denyOffer = 'Deny Offer',
  cancelOffer = 'Cancel Offer',
  cancelListing = 'Cancel Listing',
  acceptOffer = 'sale',
}

export type OperationType = keyof typeof OperationTypes;