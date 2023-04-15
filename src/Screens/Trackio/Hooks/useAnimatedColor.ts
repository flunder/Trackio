import React, { useState, useRef, useEffect } from "react";
import { Animated } from "react-native";
import { Colors } from "@app/theme";

const defaultColor = Colors.gray100;

export const useAnimatedColor = () => {
  const [color, setColor] = useState<string>(defaultColor);
  const frColor = useRef(defaultColor);
  const toColor = useRef(defaultColor);
  const animatedColor = useRef(new Animated.Value(0)).current;
  const interpolatedColor = animatedColor.interpolate({
    inputRange: [0, 1],
    outputRange: [frColor.current, color]
  });

  useEffect(() => {
    animatedColor.setValue(0);
    toColor.current = color;

    Animated.timing(animatedColor, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false
    }).start(() => {
      frColor.current = color;
    });
  }, [color]);

  return {
    color,
    setColor,
    animatedColor: interpolatedColor
  };
};
