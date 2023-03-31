import React, { useRef, useState, useEffect } from "react";
import { View } from "react-native";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS
} from "react-native-reanimated";
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture
} from "react-native-gesture-handler";

import { Box, Text } from "@app/Components";
import { Colors, Corners, Grid, Sizes } from "@app/theme";
import { useMeasure, usePlaySound, getDistance } from "@app/Utils";

const items = ["por", "para"];

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

  const { playSound } = usePlaySound();

  const panGesture = Gesture.Pan()
    .onStart((event) => {
      zIndex.value = 1;
      context.value = { x: translateX.value, y: translateY.value };
    })
    .onUpdate((event) => {
      translateX.value = event.translationX + context.value.x;
      translateY.value = event.translationY + context.value.y;
    })
    .onEnd(async (event) => {
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
        translateX.value = withSpring(dropArea.value.x - x, { mass: 0.3 });
        translateY.value = withSpring(dropArea.value.y - y, { mass: 0.3 });
        runOnJS(playSound)({ delay: distance });
      }

      // if (absoluteX > dropArea.value.x) {
      //   console.log("left edge");
      // }

      // if (absoluteY > dropArea.value.y) {
      //   console.log("top edge");
      // }
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
  const { myRef, onLayout, size } = useMeasure();

  const dropArea = useSharedValue({
    x: 0,
    y: 300,
    width: 100,
    height: 40
  });

  useEffect(() => {
    if (!size) return;
    dropArea.value = {
      x: size.px,
      y: size.py,
      width: size.width,
      height: size.height
    };
  }, size);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Box flex={1} backgroundColor={Colors.gray100}>
        <Box
          position="absolute"
          bottom={200}
          width="100%"
          flexDirection="row"
          alignItems="center"
          flexWrap="wrap"
          justifyContent="center"
        >
          <Text fontSize={22}>Compré los huevos </Text>
          <View
            style={{
              width: dropArea.value.width,
              height: dropArea.value.height,
              backgroundColor: "white",
              borderRadius: Corners.regular,
              zIndex: -1
            }}
            ref={myRef}
            onLayout={onLayout}
          />
          <Text fontSize={22}>el desayuno.</Text>
        </Box>
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
      </Box>
    </GestureHandlerRootView>
  );
};

export { DragDrop };
