import { Fragment, useEffect, useMemo, useRef } from 'react';
import useVirtual from 'react-cool-virtual';

export type VirtualizedListProps<T extends object> = {
  items: T[];
  ItemRenderer: React.VFC<T>;
  Skeleton: React.VFC;
};

const DefaultProps = {
  width: 210,
  height: 300,
  headerOffset: 76,
  columns: 3,
};

export const VirtualizedList = <T extends object>({
  items,
  ItemRenderer,
}: VirtualizedListProps<T>) => {
  const scrollThreshold = 300;
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [colItems, spacingCoefficient] = useMemo(() => {
    const wrapperReference = wrapperRef.current;
    if (wrapperReference) {
      const innerWidth =
        wrapperReference.getBoundingClientRect().width;

      const newColItems = Math.floor(innerWidth / DefaultProps.width);

      const newSpacingCoefficient =
        1 +
        (innerWidth - DefaultProps.width * newColItems) /
          (newColItems - 1) /
          DefaultProps.width;

      console.log(newColItems, newSpacingCoefficient);

      return [newColItems, newSpacingCoefficient];
    }
    return [DefaultProps.columns, 1.2];
  }, [wrapperRef, wrapperRef.current?.scrollWidth]);

  const row = useVirtual<HTMLDivElement, HTMLDivElement>({
    itemCount: Math.ceil(items.length / colItems),
    itemSize: DefaultProps.height,
  });
  const col = useVirtual<HTMLDivElement, HTMLDivElement>({
    horizontal: true,
    itemCount: colItems,
    itemSize: DefaultProps.width,
  });

  const getItemIndex = (rowIndex: number, colIndex: number) =>
    rowIndex * colItems + colIndex;

  useEffect(() => {
    const scrollerReference = row.outerRef.current;
    const wrapperReference = wrapperRef.current;
    if (scrollerReference && wrapperReference) {
      // Constant offset of header
      const { headerOffset } = DefaultProps;

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
          document.documentElement.scrollHeight +
          scrollThreshold / 2 -
          topFullDistance;

        // Coefficient between window scroll and scroller container
        const scrollCoefficient =
          scrollerReference.scrollHeight / windowRelativeScroll;

        const currentWindowRelativeScroll =
          window.scrollY - topFullDistance;

        // New scroll Y position
        const scrollerY = Math.max(
          currentWindowRelativeScroll * scrollCoefficient,
          0,
        );
        scrollerReference.scrollTo(0, scrollerY);

        const topThreshold = scrollThreshold / 4;
        // New offset of the scroller inside the wrapper
        const minimalOffset = Math.max(
          currentWindowRelativeScroll - topThreshold,
          0,
        );

        const realOffset =
          wrapperReference.getBoundingClientRect().height -
          scrollerReference.offsetHeight;
        const offsetInWrapper = Math.min(minimalOffset, realOffset);
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
  }, [wrapperRef, row.outerRef, row.outerRef.current?.scrollHeight]);

  return (
    <div ref={wrapperRef}>
      <div
        id="outerId"
        style={{
          width: '100%',
          paddingBottom: `${scrollThreshold / 2}px`,
          overflow: 'hidden',
          scrollBehavior: 'unset',
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
                        transform: `translateX(${
                          colItem.start * spacingCoefficient
                        }px) translateY(${rowItem.start * 1.2}px)`,
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
