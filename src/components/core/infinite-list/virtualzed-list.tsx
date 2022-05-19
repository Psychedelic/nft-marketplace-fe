import { Fragment, useEffect } from 'react';
import useVirtual from 'react-cool-virtual';

export type VirtualizedListProps<T extends object> = {
  items: T[];
  ItemRenderer: React.VFC<T>;
  Skeleton: React.VFC;
};

export const VirtualizedList = <T extends object>({
  items,
  ItemRenderer,
}: VirtualizedListProps<T>) => {
  const colItems = 3;

  const row = useVirtual<HTMLDivElement, HTMLDivElement>({
    itemCount: Math.ceil(items.length / colItems),
    itemSize: 320,
  });
  const col = useVirtual<HTMLDivElement, HTMLDivElement>({
    horizontal: true,
    itemCount: colItems,
    itemSize: 280,
  });

  const getItemIndex = (rowIndex: number, colIndex: number) =>
    rowIndex * colItems + colIndex;

  useEffect(() => {
    const { current: reference } = row.outerRef;
    if (reference) {
      const headerSize = 76;
      const documentHeight = document.documentElement.scrollHeight;
      const { top: initialTop, height } =
        reference.getBoundingClientRect();
      const topFullDistance =
        initialTop + window.scrollY - headerSize;
      const extraSpace = documentHeight - height + headerSize;
      const scrollCallback = () => {
        const windowRollingDistance = documentHeight - extraSpace;
        const scrollCoefficient =
          reference.scrollHeight / windowRollingDistance;
        const y =
          (window.scrollY - topFullDistance) * scrollCoefficient;

        reference.scrollTo(0, y);
      };
      window.addEventListener('scroll', scrollCallback);
      return () =>
        window.removeEventListener('scroll', scrollCallback);
    }
  }, [row.outerRef, col.outerRef]);

  return (
    <div
      id="outerId"
      style={{
        width: '100%',
        height: '1500px',
        overflow: 'auto',
      }}
      ref={(el) => {
        row.outerRef.current = el;
        col.outerRef.current = el;
      }}
    >
      <div
        style={{ position: 'relative' }}
        ref={(el) => {
          row.innerRef.current = el;
          col.innerRef.current = el;
        }}
      >
        {row.items.map((rowItem) => (
          <Fragment key={rowItem.index}>
            {col.items.map(
              (colItem) =>
                items[getItemIndex(rowItem.index, colItem.index)] && (
                  <div
                    key={colItem.index}
                    style={{
                      position: 'absolute',
                      height: `${rowItem.size}px`,
                      width: `${colItem.size}px`,
                      transform: `translateX(${colItem.start}px) translateY(${rowItem.start}px)`,
                    }}
                  >
                    <ItemRenderer
                      key={colItem.index}
                      {...items[
                        getItemIndex(rowItem.index, colItem.index)
                      ]}
                    />
                  </div>
                ),
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};
