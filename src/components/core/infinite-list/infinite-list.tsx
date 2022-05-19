import InfiniteLoader from 'react-window-infinite-loader';
import { FixedSizeList } from 'react-window';
import React from 'react';
import { Icon } from '../../icons';

export interface InfiniteListProps<T extends object> {
  // Are there more items to load?
  // (This information comes from the most recent API request.)
  hasNextPage: boolean;

  // Are we currently loading a page of items?
  // (This may be an in-flight flag in your Redux store for example.)
  isNextPageLoading: boolean;

  // Array of items loaded so far.
  items: T[];

  // Callback function responsible for loading the next page of items.
  loadNextPage: () => void;

  ItemRender: React.VFC<{
    componentProps: T;
    htmlProps: React.HTMLAttributes<HTMLDivElement>;
  }>;
  Skeleton?: React.VFC;
}

// type FixedSizeListProps<T extends object> = Pick<
//   InfiniteListProps<T>,
//   'ItemRender' | 'Skeleton'
// > &
//   Omit<FixedSizeList<T[]>['props'], 'children'> & {
//     mRef: React.Ref<FixedSizeList<T[]>>;
//   };

// const List = <T extends object>({
//   Skeleton = () => <Icon icon="spinner" />,
//   ItemRender,
//   mRef,
//   ...listProps
// }: FixedSizeListProps<T>) => (

// );

export const InfiniteList = <T extends object>({
  loadNextPage,
  hasNextPage,
  isNextPageLoading,
  items,
  ItemRender,
  Skeleton = () => <Icon icon="spinner" />,
}: InfiniteListProps<T>): JSX.Element => {
  const itemCount = hasNextPage ? items.length + 1 : items.length;

  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;

  const isItemLoaded = (index: number) =>
    // console.log(index);
    !hasNextPage || index < items.length;
  console.log('isNextPageLoading', isNextPageLoading);
  console.log('itemCount', itemCount);
  console.log('items', items);

  return (
    <InfiniteLoader
      itemCount={itemCount}
      loadMoreItems={loadMoreItems}
      isItemLoaded={isItemLoaded}
    >
      {({ onItemsRendered, ref }) => (
        <FixedSizeList<T[]>
          width={300}
          height={1000}
          itemCount={itemCount}
          itemSize={316}
          onItemsRendered={onItemsRendered}
          ref={ref}
        >
          {({ index, style }) =>
            items[index] ? (
              <ItemRender
                componentProps={{ ...items[index] }}
                htmlProps={{ style }}
              />
            ) : (
              <Skeleton />
            )
          }
        </FixedSizeList>
      )}
    </InfiniteLoader>
  );
};
