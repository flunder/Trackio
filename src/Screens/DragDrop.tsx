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
  dropArea,
  setSelected
}: {
  text: string;
  x: number;
  y: number;
  dropArea: any;
  setSelected: any;
  // setSelected: React.SetStateAction<string>;
}): JSX.Element => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const zIndex = useSharedValue(0);
  const context = useSharedValue({ x: 0, y: 0 });

  const { playSound } = usePlaySound();

  const snapTo = ({ x, y }) => {
    "worklet";
    translateX.value = withSpring(x, { mass: 0.3 });
    translateY.value = withSpring(y, { mass: 0.3 });
    runOnJS(playSound)({ delay: 50 });
  };

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
        snapTo({ x: dropArea.value.x - x, y: dropArea.value.y - y });
        runOnJS(setSelected)(text);
      } else {
        runOnJS(setSelected)(false);
      }

      // if (absoluteX > dropArea.value.x) {
      //   console.log("left edge");
      // }

      // if (absoluteY > dropArea.value.y) {
      //   console.log("top edge");
      // }
    });

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value
        },
        {
          translateY: translateY.value
        }
      ],
      zIndex: zIndex.value
    };
  });

  return (
    <GestureDetector gesture={panGesture}>
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
  const [selected, setSelected] = useState();

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
  }, [size]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Box flex={1} backgroundColor={Colors.gray100}>
        <Box position="absolute" top={100}>
          <Text>{selected}</Text>
        </Box>

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
              x={i * 120}
              y={300}
              setSelected={setSelected}
            />
          ))}
        </Box>
      </Box>
    </GestureHandlerRootView>
  );
};

export { DragDrop };
