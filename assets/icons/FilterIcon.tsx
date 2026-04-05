import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
import { COLORS } from "../../constants/theme";

export const FilterIcon = (props: SvgProps) => (
  <Svg
    width={props.width || 20}
    height={props.height || 20}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path
      d="M4 5L10 5M10 5C10 6.10457 10.8954 7 12 7C13.1046 7 14 6.10457 14 5M10 5C10 3.89543 10.8954 3 12 3C13.1046 3 14 3.89543 14 5M14 5L20 5M4 12L16 12M16 12C16 13.1046 16.8954 14 18 14C19.1046 14 20 13.1046 20 12C20 10.8954 19.1046 10 18 10C16.8954 10 16 10.8954 16 12ZM8 19L20 19M8 19C8 17.8954 7.10457 17 6 17C4.89543 17 4 17.8954 4 19C4 20.1046 4.89543 21 6 21C7.10457 21 8 20.1046 8 19Z"
      stroke={props.color || COLORS.textPrimary}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </Svg>
);
