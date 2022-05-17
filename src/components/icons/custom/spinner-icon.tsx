import { styled } from '../../../stitches.config';

const Circle = styled('circle', {
  fill: 'currentColor',
});

export interface SpinnerIconProps {
  size?: string;
}

export const SpinnerIcon: React.VFC<SpinnerIconProps> = ({
  size = '24px',
}: SpinnerIconProps) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <g transform="translate(80,50)">
      <g transform="rotate(0)">
        <Circle cx="0" cy="0" r="6" fillOpacity="1">
          <animateTransform
            attributeName="transform"
            type="scale"
            begin="-0.875s"
            values="1.5 1.5;1 1"
            keyTimes="0;1"
            dur="1s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            keyTimes="0;1"
            dur="1s"
            repeatCount="indefinite"
            values="1;0"
            begin="-0.875s"
          />
        </Circle>
      </g>
    </g>
    <g transform="translate(71.21320343559643,71.21320343559643)">
      <g transform="rotate(45)">
        <Circle cx="0" cy="0" r="6" fillOpacity="0.875">
          <animateTransform
            attributeName="transform"
            type="scale"
            begin="-0.75s"
            values="1.5 1.5;1 1"
            keyTimes="0;1"
            dur="1s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            keyTimes="0;1"
            dur="1s"
            repeatCount="indefinite"
            values="1;0"
            begin="-0.75s"
          />
        </Circle>
      </g>
    </g>
    <g transform="translate(50,80)">
      <g transform="rotate(90)">
        <Circle cx="0" cy="0" r="6" fillOpacity="0.75">
          <animateTransform
            attributeName="transform"
            type="scale"
            begin="-0.625s"
            values="1.5 1.5;1 1"
            keyTimes="0;1"
            dur="1s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            keyTimes="0;1"
            dur="1s"
            repeatCount="indefinite"
            values="1;0"
            begin="-0.625s"
          />
        </Circle>
      </g>
    </g>
    <g transform="translate(28.786796564403577,71.21320343559643)">
      <g transform="rotate(135)">
        <Circle cx="0" cy="0" r="6" fillOpacity="0.625">
          <animateTransform
            attributeName="transform"
            type="scale"
            begin="-0.5s"
            values="1.5 1.5;1 1"
            keyTimes="0;1"
            dur="1s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            keyTimes="0;1"
            dur="1s"
            repeatCount="indefinite"
            values="1;0"
            begin="-0.5s"
          />
        </Circle>
      </g>
    </g>
    <g transform="translate(20,50.00000000000001)">
      <g transform="rotate(180)">
        <Circle cx="0" cy="0" r="6" fillOpacity="0.5">
          <animateTransform
            attributeName="transform"
            type="scale"
            begin="-0.375s"
            values="1.5 1.5;1 1"
            keyTimes="0;1"
            dur="1s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            keyTimes="0;1"
            dur="1s"
            repeatCount="indefinite"
            values="1;0"
            begin="-0.375s"
          />
        </Circle>
      </g>
    </g>
    <g transform="translate(28.78679656440357,28.786796564403577)">
      <g transform="rotate(225)">
        <Circle cx="0" cy="0" r="6" fillOpacity="0.375">
          <animateTransform
            attributeName="transform"
            type="scale"
            begin="-0.25s"
            values="1.5 1.5;1 1"
            keyTimes="0;1"
            dur="1s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            keyTimes="0;1"
            dur="1s"
            repeatCount="indefinite"
            values="1;0"
            begin="-0.25s"
          />
        </Circle>
      </g>
    </g>
    <g transform="translate(49.99999999999999,20)">
      <g transform="rotate(270)">
        <Circle cx="0" cy="0" r="6" fillOpacity="0.25">
          <animateTransform
            attributeName="transform"
            type="scale"
            begin="-0.125s"
            values="1.5 1.5;1 1"
            keyTimes="0;1"
            dur="1s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            keyTimes="0;1"
            dur="1s"
            repeatCount="indefinite"
            values="1;0"
            begin="-0.125s"
          />
        </Circle>
      </g>
    </g>
    <g transform="translate(71.21320343559643,28.78679656440357)">
      <g transform="rotate(315)">
        <Circle cx="0" cy="0" r="6" fillOpacity="0.125">
          <animateTransform
            attributeName="transform"
            type="scale"
            begin="0s"
            values="1.5 1.5;1 1"
            keyTimes="0;1"
            dur="1s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            keyTimes="0;1"
            dur="1s"
            repeatCount="indefinite"
            values="1;0"
            begin="0s"
          />
        </Circle>
      </g>
    </g>
  </svg>
);
