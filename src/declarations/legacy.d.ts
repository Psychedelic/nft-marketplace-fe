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
