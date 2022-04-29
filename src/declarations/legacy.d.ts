export type NFTMetadata = {
  id: string;
  name: string;
  traits: Record<string, any>;
  rendered: boolean;
  preview: string;
  location: string;
  price: string;
  lastOffer: string;
  isOwner?: boolean;
  isListed?: boolean;
  owner?: string;
};

export interface MetadataPart {
  data: Array<number>;
  key_val_data: Array<MetadataKeyVal>;
  purpose: MetadataPurpose;
}

export type MetadataDesc = Array<MetadataPart>;

export interface OffersTableItem {
  item: {
    name: string,
    tokenId: bigint,
    logo?: string;
  },
  price: bigint,
  floorDifference: string,
  fromDetails: {
    formattedAddress: string,
    address: string,
  }
  time: string,
  computedCurrencyPrice?: number,
  callerDfinityExplorerUrl?: string,
}
