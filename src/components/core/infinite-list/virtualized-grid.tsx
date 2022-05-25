import { Fragment, useEffect, useRef, useState } from 'react';
import useVirtual from 'react-cool-virtual';

const DefaultProps = {
  width: 210,
  height: 300,
  headerOffset: 76,
  columns: 3,
  scrollThreshold: 300,
  rowSpacing: 1.2,
  padding: 30,
};

export type VirtualizedGridProps<T extends object> = Partial<
  typeof DefaultProps
> & {
  items: T[];
  ItemRenderer: React.VFC<T>;
  Skeleton: React.VFC;
  loadingMore?: boolean;
};

export const VirtualizedGrid = <T extends object>({
  items,
  ItemRenderer,
  loadingMore,
  Skeleton,
  width = DefaultProps.width,
  height = DefaultProps.height,
  headerOffset = DefaultProps.headerOffset,
  columns = DefaultProps.columns,
  scrollThreshold = DefaultProps.scrollThreshold,
  rowSpacing = DefaultProps.rowSpacing,
  padding = DefaultProps.padding,
}: VirtualizedGridProps<T>) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [colItems, setColItems] = useState(columns);
  const [spacingCoefficient, setSpacingCoefficient] =
    useState(rowSpacing);

  // Calculate the total amount of columns and spacing
  useEffect(() => {
    const wrapperReference = wrapperRef.current;
    if (wrapperReference) {
      const resizeListener = () => {
        const innerWidth =
          wrapperReference.getBoundingClientRect().width -
          2 * padding;

        let newColItems = Math.floor(innerWidth / width);

        const getSpacingCoefficient = () =>
          (innerWidth - width * newColItems) /
          (newColItems - 1) /
          width;

        let newSpacingCoefficient = getSpacingCoefficient();

        if (newSpacingCoefficient * innerWidth < 100) {
          newColItems -= 1;
          newSpacingCoefficient = getSpacingCoefficient();
        }

        setColItems(newColItems);
        setSpacingCoefficient(newSpacingCoefficient + 1);
      };
      resizeListener();

      window.addEventListener('resize', resizeListener);
      return () => {
        window.removeEventListener('resize', resizeListener);
      };
    }
  }, [wrapperRef, width]);

  console.log(colItems, spacingCoefficient);

  const row = useVirtual<HTMLDivElement, HTMLDivElement>({
    itemCount:
      Math.ceil(items.length / colItems) + (loadingMore ? 2 : 0),
    itemSize: height,
  });

  const col = useVirtual<HTMLDivElement, HTMLDivElement>({
    horizontal: true,
    itemCount: colItems,
    itemSize: width,
  });

  const getItemIndex = (rowIndex: number, colIndex: number) =>
    rowIndex * colItems + colIndex;

  useEffect(() => {
    const scrollerReference = row.outerRef.current;
    const wrapperReference = wrapperRef.current;
    if (scrollerReference && wrapperReference) {
      // Constant offset of header

      // Set scroller height to cover the view
      scrollerReference.style.height = `${
        window.innerHeight - headerOffset
      }px`;

      // Calculate the scroll distance between the
      // top of the page and the top of the list
      const initialTop =
        scrollerReference.getBoundingClientRect().top;
      const topFullDistance =
        initialTop + window.scrollY - headerOffset - padding;

      // Scroll listener to update list scroll
      const updateListener = () => {
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
      setTimeout(updateListener);

      // Update scroll position on window scroll
      window.addEventListener('scroll', updateListener);
      window.addEventListener('resize', updateListener);
      return () => {
        window.removeEventListener('scroll', updateListener);
        window.removeEventListener('resize', updateListener);
      };
    }
  }, [row.outerRef, wrapperRef, scrollThreshold]);

  // Update wrapper list based on scroller
  useEffect(() => {
    const scrollerReference = row.outerRef.current;
    const wrapperReference = wrapperRef.current;
    if (wrapperReference && scrollerReference) {
      // Update wrapper height when total items change
      const scrollerResizeListener = () => {
        wrapperReference.style.height = `${scrollerReference.scrollHeight}px`;
      };

      scrollerResizeListener();
      scrollerReference.addEventListener(
        'resize',
        scrollerResizeListener,
      );
      return () => {
        scrollerReference.removeEventListener(
          'resize',
          scrollerResizeListener,
        );
      };
    }
  }, [
    wrapperRef,
    row.outerRef,
    row.outerRef.current?.scrollHeight,
    loadingMore,
  ]);

  return (
    <div
      ref={wrapperRef}
      style={{
        width: `100%`,
      }}
    >
      <div
        style={{
          width: `calc(100% - ${padding * 2}px)`,
          padding: `${padding}px`,
          paddingBottom: `${scrollThreshold}px`,
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
              {col.items.map((colItem) => (
                <div
                  key={colItem.index}
                  style={{
                    position: 'absolute',
                    height: `${rowItem.size}px`,
                    width: `${colItem.size}px`,
                    transform: `translateX(${
                      colItem.start * spacingCoefficient
                    }px) translateY(${rowItem.start * rowSpacing}px)`,
                  }}
                >
                  {items[
                    getItemIndex(rowItem.index, colItem.index)
                  ] && (
                    <ItemRenderer
                      {...items[
                        getItemIndex(rowItem.index, colItem.index)
                      ]}
                    />
                  )}
                  {!items[
                    getItemIndex(rowItem.index, colItem.index)
                  ] &&
                    loadingMore && <Skeleton />}
                </div>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
