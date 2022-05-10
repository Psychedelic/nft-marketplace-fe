import React from 'react';

export interface PlugIconProps
  extends React.HTMLProps<HTMLSpanElement> {
  dark?: boolean;
}

export const PlugIcon = ({ dark, ...props }: PlugIconProps) => (
  <span
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
    {...props}
  >
    <svg
      viewBox="0 0 15 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1460_41)">
        <path
          d="M2.80469 0.35249C2.80469 0.157815 2.95387 0 3.1379 0H4.65955C4.84358 0 4.99276 0.157815 4.99276 0.35249V5.6751H2.80469V0.35249Z"
          fill={dark ? 'white' : 'black'}
        />
        <path
          d="M9.96094 0.35249C9.96094 0.157815 10.1101 0 10.2941 0H11.8158C11.9999 0 12.149 0.157815 12.149 0.35249V5.6751H9.96094V0.35249Z"
          fill={dark ? 'white' : 'black'}
        />
        <path
          d="M0 6.60471C0 6.09272 0.39231 5.67773 0.876248 5.67773H14.1186C14.6025 5.67773 14.9948 6.09272 14.9948 6.60471V11.222C14.9948 15.6024 11.6381 19.1533 7.49739 19.1533C3.35671 19.1533 0 15.6024 0 11.222V6.60471Z"
          fill="url(#paint0_linear_1460_41)"
        />
        <path
          d="M4.99219 18.481H9.99775V19.1415C9.99775 20.1014 9.26219 20.8795 8.3548 20.8795H6.63516C5.72778 20.8795 4.99219 20.1014 4.99219 19.1415V18.481Z"
          fill="url(#paint1_linear_1460_41)"
        />
        <path
          d="M5.80469 20.6016H9.18921V21.8414C9.18921 22.4813 8.69884 23.0001 8.0939 23.0001H6.9C6.29512 23.0001 5.80469 22.4813 5.80469 21.8414V20.6016Z"
          fill="url(#paint2_linear_1460_41)"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.4012 14.32C13.246 9.85916 9.38636 6.58105 4.80294 6.58105C3.06122 6.58105 1.42401 7.05445 0 7.88621V11.2216C0 14.6735 2.08456 17.6103 4.99462 18.7002V19.1413C4.99462 19.7798 5.32012 20.3379 5.80513 20.64V21.841C5.80513 22.481 6.29556 22.9997 6.90044 22.9997H8.09433C8.69928 22.9997 9.18965 22.481 9.18965 21.841V20.64C9.67469 20.3379 10.0002 19.7798 10.0002 19.1413V18.7002C11.9834 17.9574 13.5833 16.3568 14.4012 14.32Z"
          fill="url(#paint3_linear_1460_41)"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.6086 17.0245C12.2413 12.5555 8.69561 9.04932 4.37577 9.04932C2.7688 9.04932 1.26895 9.53452 0 10.374V11.2218C0 14.6737 2.08456 17.6105 4.99462 18.7004V19.1415C4.99462 19.78 5.32012 20.3381 5.80513 20.6403V21.8413C5.80513 22.4812 6.29556 23 6.90044 23H8.09434C8.69928 23 9.18965 22.4812 9.18965 21.8413V20.6403C9.67469 20.3381 10.0002 19.78 10.0002 19.1415V18.7004C10.979 18.3339 11.8644 17.7583 12.6086 17.0245Z"
          fill="url(#paint4_linear_1460_41)"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.0081 18.6991C9.85242 15.057 7.01192 12.1548 3.53061 12.1548C2.32065 12.1548 1.18808 12.5054 0.21875 13.1158C0.821475 15.7185 2.63847 17.8168 4.99833 18.7007V19.1417C4.99833 19.7802 5.32383 20.3383 5.80886 20.6405V21.8415C5.80886 22.4814 6.29924 23.0002 6.90418 23.0002H8.09807C8.70302 23.0002 9.19339 22.4814 9.19339 21.8415V20.6405C9.67843 20.3383 10.0039 19.7802 10.0039 19.1417V18.7007C10.0053 18.7001 10.0068 18.6996 10.0081 18.6991Z"
          fill="url(#paint5_linear_1460_41)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_1460_41"
          x1="10.0057"
          y1="10.6717"
          x2="15.7035"
          y2="5.28002"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#46FF47" />
          <stop offset="1" stopColor="#9CFF9D" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1460_41"
          x1="10.0032"
          y1="10.6714"
          x2="15.7011"
          y2="5.27976"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#46FF47" />
          <stop offset="1" stopColor="#9CFF9D" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_1460_41"
          x1="10.0052"
          y1="10.6716"
          x2="15.7031"
          y2="5.27995"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#46FF47" />
          <stop offset="1" stopColor="#9CFF9D" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_1460_41"
          x1="8.70228"
          y1="11.7662"
          x2="11.5519"
          y2="8.18934"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#10D9ED" />
          <stop offset="1" stopColor="#10D9ED" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_1460_41"
          x1="8.11077"
          y1="13.0931"
          x2="10.0774"
          y2="9.51058"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FA51D3" />
          <stop
            offset="0.958774"
            stopColor="#FA51D3"
            stopOpacity="0"
          />
        </linearGradient>
        <linearGradient
          id="paint5_linear_1460_41"
          x1="5.6241"
          y1="18.4929"
          x2="8.59255"
          y2="11.318"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFE700" />
          <stop offset="1" stopColor="#FFE700" stopOpacity="0" />
        </linearGradient>
        <clipPath id="clip0_1460_41">
          <rect width="15" height="23" fill="white" />
        </clipPath>
      </defs>
    </svg>
  </span>
);

