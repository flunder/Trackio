import React, { ReactNode } from "react";
import { Text as TextBase, TextStyle } from "react-native";
import { pickTextStyleProps } from "../../Utils/pickStyleProps";

export interface TextProps extends TextStyle {
  children?: ReactNode;
}

export const Text = ({ children, ...props }: TextProps): JSX.Element => {
  const style = pickTextStyleProps(props);
  return <TextBase style={style}>{children}</TextBase>;
};
