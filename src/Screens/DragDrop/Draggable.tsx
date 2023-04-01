import React from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { Box, Text } from "@app/Components";
import { Colors, Corners, Sizes } from "@app/theme";
import { usePlaySound, getDistance } from "@app/Utils";

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
      <Animated.View style={style}>
        <Box
          borderRadius={Corners.regular}
          backgroundColor={Colors.primary}
          paddingVertical={Sizes[1]}
          paddingHorizontal={Sizes[3]}
          alignContent="center"
          marginRight={Sizes[2]}
          position="absolute"
          left={x}
          top={y}
          width={70}
        >
          <Text fontSize={18} color={Colors.white} textAlign="center">
            {text}
          </Text>
        </Box>
      </Animated.View>
    </GestureDetector>
  );
};

export { Draggable };
