import { Collection } from '@psychedelic/jelly-js';

export const getJellyCollection = async ({
  jellyInstance,
  collectionId,
}: {
  // TODO: add jelly type
  jellyInstance: any;
  collectionId: string;
}) => {
  const collections: Collection[] =
    await jellyInstance.getCollections();
  const collection = collections.find(
    (c: Collection) => c.id.toText() === collectionId,
  );

  if (!collection) return;

  return collection;
};
