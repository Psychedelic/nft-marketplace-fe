import { collectionNames } from '../constants/collection-names';

export const isICNSCollection = (collectionName?: string) => {
  if (!collectionName) return;

  return collectionName.toLowerCase().includes(collectionNames.icns);
};

export const isCrownsCollection = (collectionName?: string) => {
  if (!collectionName) return;

  return collectionName
    .toLowerCase()
    .includes(collectionNames.crowns);
};
