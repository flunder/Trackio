import React, { ReactNode } from "react";
import { Animated, View, ViewStyle } from "react-native";
import { pickViewStyleProps } from "../../Utils/pickStyleProps";

export interface BoxProps extends ViewStyle {
  children?: ReactNode;
  transform?: any;
  as?: React.ComponentType;
}

export interface AnimatedBoxProps {
  children?: ReactNode;
  as?: typeof Animated.View;
  [key: string]: any;
}

export const Box = ({
  children,
  as,
  ...props
}: BoxProps | AnimatedBoxProps): JSX.Element => {
  const style = pickViewStyleProps(props);
  const Component = as ?? View;
  return <Component style={style}>{children}</Component>;
};
