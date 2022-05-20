/* eslint-disable react/prop-types */
import React, { forwardRef, useMemo, useState } from 'react';
import { SkeletonBox } from '../core';
import { ImagePreloadStyles } from './styles';

export type ImagePreloadProps = React.ComponentProps<
  typeof ImagePreloadStyles
>;

export const ImagePreload = forwardRef<
  HTMLImageElement,
  ImagePreloadProps
>(({ src, ...props }, ref) => {
  const [loaded, setLoaded] = useState(false);

  useMemo(() => {
    if (src) {
      setLoaded(false);
      const image = new Image();
      image.src = src;
      image.onload = () => setLoaded(true);
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
});
