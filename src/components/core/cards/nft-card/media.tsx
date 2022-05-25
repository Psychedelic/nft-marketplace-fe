import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  HoverMessageContainer,
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
  hoverStartDelay?: number;
  containerRef: React.RefObject<HTMLDivElement>;
};

export const Media = ({
  location = '',
  preview,
  containerRef,
  hoverStartDelay = 1500,
  previewCard,
}: MediaProps): JSX.Element => {
  const { t } = useTranslation();
  const [previewTriggered, setPreviewTriggered] =
    useState(previewCard);
  const [startedHovering, setStartedHovering] = useState(false);

  useEffect(() => {
    if (!previewCard && containerRef.current) {
      let triggerTimeout: NodeJS.Timeout;
      const hoverInCallback = () => {
        setStartedHovering(true);
        if (!previewTriggered) {
          triggerTimeout = setTimeout(() => {
            setPreviewTriggered(true);
          }, hoverStartDelay);
        }
      };
      const hoverOutCallback = () => {
        clearTimeout(triggerTimeout);
        setPreviewTriggered(false);
        setStartedHovering(false);
      };

      containerRef.current.addEventListener(
        'mouseenter',
        hoverInCallback,
      );
      containerRef.current.addEventListener(
        'mouseleave',
        hoverOutCallback,
      );

      return () => {
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
    hoverStartDelay,
    previewCard,
  ]);

  useEffect(() => {
    if (!previewCard && containerRef.current) {
      if (previewTriggered) {
        containerRef.current.style.transform = 'scale(1.03)';
      } else {
        containerRef.current.style.transform = '';
      }
    }
  }, [previewCard, previewTriggered, containerRef]);

  return (
    <MediaWrapper>
      <PreviewDetails>
        {previewTriggered ? (
          <PreviewCardVideo
            src={location}
            poster={preview}
            autoPlay
            loop
          />
        ) : (
          <PreviewImage src={preview} alt="nft-card" />
        )}
      </PreviewDetails>
      {!previewCard && startedHovering && !previewTriggered && (
        <HoverMessageContainer>
          {t('translation:nftCard.hoverToPreview')}
        </HoverMessageContainer>
      )}
    </MediaWrapper>
  );
};
