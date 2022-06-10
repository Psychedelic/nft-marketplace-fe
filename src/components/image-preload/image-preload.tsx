/* eslint-disable react/prop-types */
import React, {
  forwardRef,
  useMemo,
  useState,
  useEffect,
} from 'react';
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
      const onLoad = () => setLoaded(true);

      useEffect(() => {
        if (!src) return;

        try {
          ImageCache.store(src, onLoad);
        } catch (err) {
          AppLog.warn('Failed to load image', err);
        }

        return () => {
          ImageCache.removeListener(src);
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
