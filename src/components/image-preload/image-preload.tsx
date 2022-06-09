/* eslint-disable react/prop-types */
import React, { forwardRef, useEffect, useState } from 'react';
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

      useEffect(() => {
        let isMounted = true;

        if (src) {
          const image = ImageCache.get(src);

          if (!image) {
            ImageCache.store(src)
              .then(() => isMounted && setLoaded(true))
              .catch((err) =>
                AppLog.warn('Failed to load image', err),
              );
          } else {
            setLoaded(true);
          }
        }

        return () => {
          isMounted = false;
        };
      }, [src]);

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
