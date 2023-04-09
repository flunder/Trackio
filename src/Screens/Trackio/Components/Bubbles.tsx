import React, { useRef, useState, useEffect } from "react";
import { Animated, FlatList, ViewStyle } from "react-native";
import { Box, Text, Touchable } from "@app/Components";
import { Colors, Grid, Sizes } from "@app/theme";
import { pickViewStyleProps } from "@app/Utils/pickStyleProps";
import Svg, { G, Circle } from "react-native-svg";
import { randomNumberBetween } from "@app/Utils";

const Bubble = ({
  scale = 1,
  offsetX,
  offsetY,
  speed,
  delay,
  ...props
}): JSX.Element => {
  useEffect(() => {
    startBubbling();
  }, []);

  const startBubbling = () => {
    Animated.timing(offsetY, {
      delay: delay,
      toValue: -10,
      duration: speed * 5000,
      useNativeDriver: true
    }).start(() => {
      offsetY.setValue(160);
      startBubbling();
    });
  };

  return (
    <Box
      position="absolute"
      transform={[{ translateX: offsetX }, { translateY: offsetY }]}
      as={Animated.View}
    >
      <Svg
        width={8 * scale}
        height={8 * scale}
        viewBox="0 0 8 8"
        fill="none"
        {...props}
      >
        <G opacity={0.4}>
          <Circle
            cx={4}
            cy={4}
            r={3.5}
            fill="#fff"
            fillOpacity={0.4}
            stroke="#fff"
          />
          <Circle
            opacity={0.3}
            cx={4.19888}
            cy={3.30997}
            r={2.42105}
            fill="#FF5325"
          />
        </G>
      </Svg>
    </Box>
  );
};

const Bubbles = ({ fillAmount }) => {
  const height = fillAmount.interpolate({
    inputRange: [0, 220],
    outputRange: [100, 20]
  });

  const refs = [...Array(10)].map(
    (_, i) =>
      useRef({
        id: i,
        scale: randomNumberBetween(0, 20) / 20,
        speed: Math.random() + 1,
        offsetX: Math.random() * 25 + 5,
        offsetY: new Animated.Value(160),
        delay: Math.random() * 5000
      }).current
  );

  return (
    <Box
      bottom={3}
      left={2}
      width={40}
      height={height}
      position="absolute"
      borderTopLeftRadius={5}
      borderTopRightRadius={5}
      borderBottomLeftRadius={100}
      borderBottomRightRadius={100}
      overflow="hidden"
      as={Animated.View}
    >
      {refs.map((b) => (
        <Bubble key={b.id} {...b} />
      ))}
    </Box>
  );
};

export { Bubble, Bubbles };
