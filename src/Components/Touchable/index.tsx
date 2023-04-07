import React, { ReactNode } from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle
} from "react-native";
import { pickViewStyleProps } from "@app/Utils/pickStyleProps";

export const defaultProps = {
  activeOpacity: 0.85,
  hitSlop: { top: 10, bottom: 10, left: 10, right: 10 }
};

export interface TouchableProps extends TouchableOpacityProps, ViewStyle {
  children?: ReactNode;
  as?: React.ComponentType;
}

export const Touchable = ({
  children,
  as,
  style,
  ...props
}: TouchableProps): JSX.Element => {
  const styleProps = pickViewStyleProps(props);
  const Component = as ?? TouchableOpacity;
  return (
    <Component {...defaultProps} style={[style, styleProps]} {...props}>
      {children}
    </Component>
  );
};
