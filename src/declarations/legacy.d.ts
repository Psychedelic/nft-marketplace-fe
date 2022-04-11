export type NFTMetadata = {
  id: string;
  name: string;
  traits: Record<string, any>;
  rendered: boolean;
  preview: string;
  location: string;
  price: string;
  lastOffer: string;
  isOwner: boolean;
  isListed: boolean;
  owner: string;
};
