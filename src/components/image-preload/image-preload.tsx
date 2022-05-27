/* eslint-disable react/prop-types */
import React, { forwardRef, useMemo, useState } from 'react';
import { ImageCache } from '../../utils/image-cache';
import { AppLog } from '../../utils/log';
import { SkeletonBox } from '../core';
import { ImagePreloadStyles } from './styles';

export type ImagePreloadProps = React.ComponentProps<
  typeof ImagePreloadStyles
>;

export const ImagePreload = React.memo(
  forwardRef<HTMLImageElement, ImagePreloadProps>(
    ({ src, ...props }, ref) => {
      const [loaded, setLoaded] = useState(false);

      useMemo(() => {
        if (src) {
          const image = ImageCache.get(src);

          if (!image) {
            ImageCache.store(src)
              .then(() => setLoaded(true))
              .catch((err) =>
                AppLog.warn('Failed to load image', err),
              );
          } else {
            setLoaded(true);
          }
        }
      }, [src, setLoaded]);

      if (!loaded) {
        return (
          <SkeletonBox
            style={props.style}
            className={props.className}
            ref={ref}
          />
        );
      }

      return <ImagePreloadStyles src={src} {...props} ref={ref} />;
    },
  ),
);
