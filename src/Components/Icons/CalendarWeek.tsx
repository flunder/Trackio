import * as React from "react";
import Svg, { Path } from "react-native-svg";

const CalendarWeek = (props) => (
  <Svg width={32} height={32} fill="none" {...props}>
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M26 5H6a1 1 0 0 0-1 1v20a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1ZM22 3v4M10 3v4M5 11h22"
    />
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeWidth={2}
      d="M10 16h2M10 19h2M10 22h2M15 16h2M15 19h2M15 22h2M20 16h2M20 19h2M20 22h2"
    />
  </Svg>
);

export { CalendarWeek };
