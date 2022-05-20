import { Fragment, useEffect, useRef } from 'react';
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
  const wrapperRef = useRef<HTMLDivElement>(null);

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
    const scrollerReference = row.outerRef.current;
    const wrapperReference = wrapperRef.current;
    if (scrollerReference && wrapperReference) {
      // Constant offset of header
      const headerOffset = 76;

      // Set scroller height to cover the view
      scrollerReference.style.height = `${
        window.innerHeight - headerOffset
      }px`;

      // Calculate the scroll distance between the
      // top of the page and the top of the list
      const initialTop =
        scrollerReference.getBoundingClientRect().top;
      const topFullDistance =
        initialTop + window.scrollY - headerOffset;

      // Scroll listener to update list scroll
      const scrollListener = () => {
        // Window scroll applicable to scroller
        const windowRelativeScroll =
          document.documentElement.scrollHeight - topFullDistance;

        // Coefficient between window scroll and scroller container
        const scrollCoefficient =
          scrollerReference.scrollHeight / windowRelativeScroll;

        // New scroll Y position
        const scrollerY = Math.max(
          (window.scrollY - topFullDistance) * scrollCoefficient,
          0,
        );
        scrollerReference.scrollTo(0, scrollerY);

        // New offset of the scroller inside the wrapper
        const offsetInWrapper = Math.min(
          Math.max(window.scrollY - topFullDistance, 0),
          wrapperReference.getBoundingClientRect().height -
            scrollerReference.offsetHeight,
        );
        scrollerReference.style.transform = `translateY(${offsetInWrapper}px)`;
      };

      // Update scroll position on first render
      scrollListener();

      // Update scroll position on window scroll
      window.addEventListener('scroll', scrollListener);
      return () =>
        window.removeEventListener('scroll', scrollListener);
    }
  }, [row.outerRef, col.outerRef, wrapperRef]);

  useEffect(() => {
    const scrollerReference = row.outerRef.current;
    const wrapperReference = wrapperRef.current;
    if (wrapperReference && scrollerReference) {
      // Update wrapper height when total items change
      wrapperReference.style.height = `${scrollerReference.scrollHeight}px`;
    }
  }, [items.length, row.outerRef, wrapperRef]);

  return (
    <div ref={wrapperRef}>
      <div
        id="outerId"
        style={{
          width: '100%',
          overflow: 'hidden',
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
                  items[
                    getItemIndex(rowItem.index, colItem.index)
                  ] && (
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
    </div>
  );
};
