/* eslint-disable react/prop-types */
import React, {
  forwardRef,
  useMemo,
  useState,
  useEffect,
} from 'react';
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
      const onLoad = () => setLoaded(true);

      useEffect(() => {
        if (!src) return;

        try {
          VideoCache.store(src, onLoad).then(() => {
            setLoaded(true);
          });
        } catch (err) {
          AppLog.warn('Failed to load video', err);
        }

        return () => {
          VideoCache.removeListener(src);
        };
      }, [src]);

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
          <VideoPreloadStyles src={src} {...props} ref={ref} />
          {(!loaded || !src) && (
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
