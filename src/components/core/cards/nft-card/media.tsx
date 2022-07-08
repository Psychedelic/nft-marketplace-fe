import { useEffect, useState, useRef } from 'react';
import { VideoCache } from '../../../../utils/video-cache';
import {
  MediaWrapper,
  PreviewCardVideo,
  PreviewDetails,
  PreviewImage,
} from './styles';

export type MediaProps = {
  disableVideo?: boolean;
  previewCard?: boolean;
  location?: string;
  preview?: string;
  videoLoadDelay?: number;
  containerRef: React.RefObject<HTMLDivElement>;
};

export const Media = ({
  location = '',
  preview,
  containerRef,
  videoLoadDelay = 500,
  previewCard,
}: MediaProps): JSX.Element => {
  const [previewTriggered, setPreviewTriggered] =
    useState(previewCard);
  const [startedHovering, setStartedHovering] = useState(false);
  let triggerTimeout = useRef<NodeJS.Timeout>();

  const resetTimeout = () => {
    clearTimeout(triggerTimeout.current);
    triggerTimeout.current = undefined;
  };

  const hoverInCallback = () => {
    setStartedHovering(true);

    if (location !== '' && VideoCache.get(location)) {
      return setPreviewTriggered(true);
    }

    if (!previewTriggered && !triggerTimeout.current) {
      triggerTimeout.current = setTimeout(() => {
        setPreviewTriggered(true);
      }, videoLoadDelay);
    }
  };

  const hoverOutCallback = () => {
    setPreviewTriggered(false);
    setStartedHovering(false);
    resetTimeout();
  };

  useEffect(() => {
    if (!previewCard && containerRef.current) {
      containerRef.current.addEventListener(
        'mouseenter',
        hoverInCallback,
      );
      containerRef.current.addEventListener(
        'mouseleave',
        hoverOutCallback,
      );

      return () => {
        resetTimeout();
        if (containerRef.current) {
          containerRef.current.removeEventListener(
            'mouseenter',
            hoverInCallback,
          );
          containerRef.current.removeEventListener(
            'mouseleave',
            hoverOutCallback,
          );
        }
      };
    }
  }, [
    setPreviewTriggered,
    setStartedHovering,
    containerRef,
    previewTriggered,
    videoLoadDelay,
    previewCard,
    location,
  ]);

  useEffect(() => {
    if (!containerRef.current) return;
    if (startedHovering) {
      containerRef.current.style.transform = 'scale(1.03)';
    } else {
      containerRef.current.style.transform = '';
    }
  }, [previewCard, startedHovering, containerRef]);

  return (
    <MediaWrapper>
      <PreviewDetails>
        {previewTriggered ? (
          <PreviewCardVideo
            src={location}
            poster={preview}
            autoPlay
            loop
            muted
          />
        ) : (
          <PreviewImage src={preview} alt="nft-card" />
        )}
      </PreviewDetails>
    </MediaWrapper>
  );
};
