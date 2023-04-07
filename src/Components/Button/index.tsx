import React, { ReactNode, useState } from "react";
import {
  ActivityIndicator,
  TouchableOpacityProps,
  ViewStyle
} from "react-native";
import { Text } from "@app/Components/Text";
import { pickViewStyleProps } from "@app/Utils/pickStyleProps";
import { Colors, Sizes } from "@app/theme";
import { Box, Touchable } from "@app/Components";

export interface ButtonProps extends TouchableOpacityProps, ViewStyle {
  children?: ReactNode;
  variant?: "primary" | "ghost" | "link" | "box";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  iconRight?: ReactNode;
  iconLeft?: ReactNode;
  as?: React.ComponentType;
}

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  iconRight,
  iconLeft,
  isLoading,
  disabled,
  ...props
}: ButtonProps): JSX.Element => {
  const {
    justifyContent = "center",
    paddingHorizontal = Sizes[5],
    paddingVertical = size === "sm" ? Sizes[2] : Sizes[3],
    ...style
  } = pickViewStyleProps(props);

  const bgc = {
    primary: Colors.white,
    ghost: "transparent",
    link: "transparent",
    box: "transparent"
  }[variant];

  const textSize = {
    md: Sizes[4],
    lg: Sizes[5]
  }[size];

  return (
    <Touchable
      disabled={disabled}
      backgroundColor={bgc}
      paddingHorizontal={paddingHorizontal}
      paddingVertical={paddingVertical}
      borderWidth={variant === "ghost" ? 0 : 1}
      borderColor={Colors.black}
      borderRadius={100}
      {...props}
    >
      <Box
        flexDirection="row"
        justifyContent={justifyContent}
        alignItems="center"
        opacity={isLoading ? 0 : 1}
      >
        {iconLeft}
        {children && (
          <Text color={Colors.black} textAlign="center" fontSize={textSize}>
            {children}
          </Text>
        )}
        {iconRight}
      </Box>
    </Touchable>
  );
};
