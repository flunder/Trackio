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
import { DropArea as DropAreaType } from "@app/types";

const Draggable = ({
  id,
  text,
  x,
  y,
  dropAreas,
  setSelected
}: {
  id: number;
  text: string;
  x: number;
  y: number;
  dropAreas: DropAreaType[];
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

  const setSelectedWrapper = (index, value) => {
    setSelected((state) => {
      const newState = [...state];
      newState[index] = value;
      return newState;
    });
  };

  const getClosestDropArea = (dragItemX, dragItemY) => {
    "worklet";

    return dropAreas
      .map((dropArea, index) => {
        return {
          index: index,
          distance: getDistance(
            dragItemX,
            dragItemY,
            dropArea.value.x,
            dropArea.value.y
          )
        };
      })
      .filter((item) => item.distance < 75)
      .sort((a, b) => a.distance - b.distance)?.[0];
  };

  const panGesture = Gesture.Pan()
    .onStart((event) => {
      zIndex.value = 1;
      context.value = { x: translateX.value, y: translateY.value };
      // runOnJS(setSelectedWrapper)(closestArea.index, text);
    })
    .onUpdate((event) => {
      translateX.value = event.translationX + context.value.x;
      translateY.value = event.translationY + context.value.y;
    })
    .onEnd(async (event) => {
      zIndex.value = 0;

      const absoluteX = translateX.value + x;
      const absoluteY = translateY.value + y;
      const closestArea = getClosestDropArea(absoluteX, absoluteY);

      if (!isNaN(closestArea?.index)) {
        snapTo({
          x: dropAreas[closestArea.index].value.x - x,
          y: dropAreas[closestArea.index].value.y - y
        });
        dropAreas[closestArea.index].value.holds = 5;
        runOnJS(setSelectedWrapper)(closestArea.index, text);
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
