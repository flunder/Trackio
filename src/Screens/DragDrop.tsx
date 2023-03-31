import React, { useRef, useState, useEffect } from "react";

import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming
} from "react-native-reanimated";
import {
  LongPressGestureHandler,
  PanGestureHandler,
  GestureHandlerRootView,
  GestureDetector,
  Gesture
} from "react-native-gesture-handler";

import { Box, Text } from "@app/Components";
import { Colors, Corners, Grid, Sizes } from "@app/theme";

const items = ["por", "para"];

const getDistance = (ax, ay, bx, by) => {
  "worklet";
  const dx = bx - ax;
  const dy = by - ay;
  return Math.sqrt(dx * dx + dy * dy);
};

const Draggable = ({
  text,
  x,
  y,
  dropArea
}: {
  text: string;
  x: number;
  y: number;
  dropArea: any;
}): JSX.Element => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const zIndex = useSharedValue(0);
  const scale = useSharedValue(1);
  const context = useSharedValue({ x: 0, y: 0 });

  const panGesture = Gesture.Pan()
    .onStart((event) => {
      zIndex.value = 1;
      context.value = { x: translateX.value, y: translateY.value };
    })
    .onUpdate((event) => {
      translateX.value = event.translationX + context.value.x;
      translateY.value = event.translationY + context.value.y;

      const middleX = translateX.value + x;

      // console.log(translateX.value - event.x);
    })
    .onEnd((event) => {
      zIndex.value = 0;

      const absoluteX = translateX.value + x;
      const absoluteY = translateY.value + y;

      const distance = getDistance(
        absoluteX,
        absoluteY,
        dropArea.value.x,
        dropArea.value.y
      );

      if (distance < 100) {
        translateX.value = withSpring(dropArea.value.x - x, { stiffness: 100 });
        translateY.value = withSpring(dropArea.value.y - y, { stiffness: 100 });
      }

      if (absoluteX > dropArea.value.x) {
        console.log("left edge");
      }

      if (absoluteY > dropArea.value.y) {
        console.log("top edge");
      }
    });

  const pressGesture = Gesture.LongPress()
    .onStart((event) => {
      scale.value = 1.2;
    })
    .onEnd((event) => {
      scale.value = 1;
    });

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value
        },
        {
          translateY: translateY.value
        },
        { scale: withTiming(scale.value, { duration: 200 }) }
      ],
      zIndex: zIndex.value
    };
  });

  const leftStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value
        },
        {
          translateY: translateY.value
        }
      ]
    };
  });

  return (
    <GestureDetector gesture={Gesture.Simultaneous(panGesture, pressGesture)}>
      <Animated.View>
        <Animated.View style={style}>
          <Box
            borderRadius={Corners.regular}
            backgroundColor={Colors.primary}
            paddingVertical={Sizes[2]}
            paddingHorizontal={Sizes[3]}
            alignContent="center"
            marginRight={Sizes[2]}
            position="absolute"
            left={x}
            top={y}
            width={100}
          >
            <Text fontSize={20} color={Colors.white}>
              {text}
            </Text>
          </Box>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

const DragDrop = (): JSX.Element => {
  const dropArea = useSharedValue({ x: 150, y: 300, width: 100, height: 40 });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Box flex={1} backgroundColor={Colors.gray100}>
        <Box flexDirection="row">
          {items.map((item, i) => (
            <Draggable
              key={item}
              text={item}
              dropArea={dropArea}
              x={i * 100}
              y={i * 100 + 100}
            />
          ))}
        </Box>
        <Box
          position="absolute"
          top={dropArea.value.y}
          left={dropArea.value.x}
          width={dropArea.value.width}
          height={dropArea.value.height}
          backgroundColor="white"
          borderRadius={Corners.regular}
          zIndex={-1}
        />
      </Box>
    </GestureHandlerRootView>
  );
};

export { DragDrop };
