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
      const [video, setVideo] = useState<HTMLVideoElement>();
      const onLoad = () => setLoaded(true);

      useEffect(() => {
        if (!src) return;
        const videoElement = VideoCache.get(src);

        if (!videoElement) {
          VideoCache.store(src, onLoad)
            .then((videoEl) => {
              setLoaded(true);
              setVideo(videoEl);
            })
            .catch((err) => {
              AppLog.warn('Failed to load video', err);
            });
        } else {
          setLoaded(true);
          setVideo(videoElement);
        }

        return () => {
          VideoCache.removeListener(src);
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
            src={video && video.src}
            {...props}
            ref={ref}
          />
          {(!loaded || !video) && (
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
