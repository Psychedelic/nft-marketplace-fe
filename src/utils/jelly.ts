import { Collection, JellyUtils } from '@psychedelic/jelly-js';

export const getJellyCollection = async ({
  jellyInstance,
  collectionId,
}: {
  // TODO: add jelly type
  jellyInstance: JellyUtils;
  collectionId: string;
}) => {
  const collections: Collection[] =
    await jellyInstance.getCollections();
  console.log(collections);
  const collection = collections.find(
    (c: Collection) => c.id.toText() === collectionId,
  );

  if (!collection) return;

  return collection;
};
