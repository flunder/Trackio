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

const Draggable = ({ text }: { text: string }): JSX.Element => {
  const panRef = useRef();
  const tapRef = useRef();

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const zIndex = useSharedValue(0);
  const scale = useSharedValue(1);

  const context = useSharedValue({ x: 0, y: 0 });

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context: { translateX: number; translateY: number }) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
      zIndex.value = 1;
      // scale.value = 1.2;
    },
    onEnd: (event, context) => {
      zIndex.value = 0;
      // scale.value = 1;
      // console.log(event);
      // if (event.absoluteY > 150) {
      // translateX.value = withSpring(0);
      // translateY.value = withSpring(0);
      // }
    }
  });

  const tapGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context) => {
      scale.value = 1.2;
    },
    onEnd: (event, context) => {
      scale.value = 1;
    },
    onFail: (event, context) => {
      scale.value = 1;
    }
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

  const gesture = Gesture.Pan()
    .onStart(() => {
      zIndex.value = 1;
      context.value = { x: translateX.value, y: translateY.value };
    })
    .onUpdate((event) => {
      translateX.value = event.translationX + context.value.x;
      translateY.value = event.translationY + context.value.y;
    })
    .onEnd((event) => {
      zIndex.value = 0;
    });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={style}>
        <Box
          borderRadius={Corners.regular}
          backgroundColor={Colors.primary}
          paddingVertical={Sizes[2]}
          paddingHorizontal={Sizes[3]}
          alignContent="center"
          marginRight={Sizes[2]}
        >
          <Text fontSize={20} color={Colors.white}>
            {text}
          </Text>
        </Box>
      </Animated.View>
    </GestureDetector>
  );
};

const DragDrop = (): JSX.Element => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Box flex={1} paddingTop={50} backgroundColor={Colors.gray100}>
        <Box padding={Sizes[4]} flexDirection="row">
          {items.map((item) => (
            <Draggable key={item} text={item} />
          ))}
        </Box>
        <Box
          position="absolute"
          bottom={100}
          left={150}
          width={100}
          height={40}
          backgroundColor="white"
          borderRadius={Corners.regular}
        />
      </Box>
    </GestureHandlerRootView>
  );
};

export { DragDrop };
