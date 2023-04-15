import React, {
  useRef,
  useState,
  useEffect,
  SetStateAction,
  Dispatch
} from "react";
import { Animated, LayoutAnimation } from "react-native";
import { Box, Text, Touchable } from "@app/Components";
import { Colors, Corners, Grid, Shadow, Sizes } from "@app/theme";
import { viewPort } from "@app/Utils";

const ColorOptions = ["#5F5449", "#9B6A6C", "#B09398", "#CEDFD9", "#EBFCFB"];

const Picker = ({
  color,
  setColor
}: {
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
}) => (
  <Box
    position="absolute"
    bottom={100}
    paddingHorizontal={Grid.gutter_width}
    width="100%"
  >
    <Box
      backgroundColor={Colors.white}
      width="100%"
      padding={Sizes[4]}
      borderRadius={Corners.regular}
      {...Shadow.default}
    >
      <Box flexDirection="row" borderRadius={Corners.regular} overflow="hidden">
        {ColorOptions.map((c) => (
          <Box flex={1}>
            <Touchable
              key={c}
              activeOpacity={1}
              height={20}
              backgroundColor={c}
              alignItems="center"
              onPress={() => {
                LayoutAnimation.configureNext({
                  duration: 500,
                  create: { type: "linear", property: "scaleXY" },
                  update: { type: "linear", property: "scaleXY" },
                  delete: { type: "linear", property: "scaleXY" }
                });

                setColor(c);
              }}
            >
              {c === color && (
                <Box
                  position="absolute"
                  bottom={-6}
                  width={10}
                  height={10}
                  backgroundColor={Colors.white}
                  transform={[{ rotate: "45deg" }]}
                />
              )}
            </Touchable>
          </Box>
        ))}
      </Box>
    </Box>
  </Box>
);

const useAnimatedColor = () => {
  const [color, setColor] = useState<string>(ColorOptions[0]);
  const frColor = useRef(ColorOptions[0]);
  const toColor = useRef(ColorOptions[1]);
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

const ColorSwitch = (): JSX.Element => {
  const { color, setColor, animatedColor } = useAnimatedColor();

  return (
    <Box flex={1} backgroundColor={animatedColor} as={Animated.View}>
      <Picker color={color} setColor={setColor} />
    </Box>
  );
};

export { ColorSwitch };
