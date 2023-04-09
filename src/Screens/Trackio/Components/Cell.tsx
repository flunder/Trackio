import React, { useRef, useState, useEffect } from "react";
import { ViewStyle, TextStyle } from "react-native";
import { Box, Text, Touchable } from "@app/Components";
import { Colors, Fonts, Grid, Sizes } from "@app/theme";
import { viewPort } from "@app/Utils";
import {
  pickViewStyleProps,
  pickTextStyleProps
} from "@app/Utils/pickStyleProps";

const cellWidth = (viewPort.width - Grid.gutter_width * 2) / 7;

interface CellProps extends ViewStyle, TextStyle {
  text?: number | string;
  onPress?: () => void;
  isSelected?: boolean;
  variant?: "isBefore" | "isSame" | "isAfter";
  dayColor?: string;
}

const Cell = ({
  text,
  onPress,
  variant,
  isSelected,
  dayColor,
  ...props
}: CellProps) => {
  const boxStyle = pickViewStyleProps(props);
  const textStyle = pickTextStyleProps(props);

  let color = {
    isBefore: Colors.gray200,
    isSame: Colors.gray800
  }[variant];

  let fontFamily = {
    isBefore: Fonts.Regular,
    isSame: Fonts.Bold
  }[variant];

  if (isSelected) {
    color = Colors.white;
  }

  return (
    <Touchable
      width={cellWidth}
      height={cellWidth}
      alignItems="center"
      justifyContent="center"
      disabled={!onPress}
      onPress={onPress}
      {...boxStyle}
    >
      {dayColor && (
        <Box
          position="absolute"
          width="80%"
          height="80%"
          borderRadius={9999}
          backgroundColor={dayColor}
          borderWidth={1}
        />
      )}
      {isSelected && (
        <Box
          position="absolute"
          width="80%"
          height="80%"
          borderRadius={9999}
          backgroundColor="#FFBB9E"
        />
      )}
      {text && (
        <Text
          fontSize={16}
          fontFamily={fontFamily}
          color={color}
          {...textStyle}
        >
          {text}
        </Text>
      )}
    </Touchable>
  );
};

export { Cell };
