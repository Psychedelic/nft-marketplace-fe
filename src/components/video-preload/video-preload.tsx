/* eslint-disable react/prop-types */
import React, { forwardRef, useEffect, useState } from 'react';
import { VideoCache } from '../../utils/video-cache';
import { AppLog } from '../../utils/log';
import { SkeletonBox } from '../core';
import {
  VideoPreloadContainer,
  VideoPreloadSpinner,
  VideoPreloadStyles,
} from './styles';

export type VideoPreloadProps = React.ComponentProps<
  typeof VideoPreloadStyles
>;

export const VideoPreload = React.memo(
  forwardRef<HTMLVideoElement, VideoPreloadProps>(
    ({ src, ...props }, ref) => {
      const [loaded, setLoaded] = useState(false);
      const [videoBlob, setVideoBlob] = useState<Blob>();

      useEffect(() => {
        let isMounted = true;

        if (src) {
          const blob = VideoCache.get(src);

          if (!blob) {
            VideoCache.store(src)
              .then((newBlob) => {
                if (isMounted) {
                  setLoaded(true);
                  setVideoBlob(newBlob);
                }
              })
              .catch((err) =>
                AppLog.warn('Failed to load video', err),
              );
          } else {
            setLoaded(true);
            setVideoBlob(blob);
          }
        }

        return () => {
          isMounted = false;
        };
      }, [src, setLoaded]);

      if (!loaded && !props.poster) {
        return (
          <SkeletonBox
            style={props.style}
            className={props.className}
          />
        );
      }

      return (
        <VideoPreloadContainer
          style={props.style}
          className={props.className}
        >
          <VideoPreloadStyles
            src={videoBlob && window.URL.createObjectURL(videoBlob)}
            {...props}
            ref={ref}
          />
          {(!loaded || !videoBlob) && (
            <VideoPreloadSpinner
              icon="spinner"
              extraIconProps={{ size: '60px' }}
            />
          )}
        </VideoPreloadContainer>
      );
    },
  ),
);
