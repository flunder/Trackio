import React, {
  useRef,
  useState,
  useEffect,
  SetStateAction,
  Dispatch
} from "react";
import { Box, Text, Touchable } from "@app/Components";
import { Colors, Corners, Grid, Shadow, Sizes } from "@app/theme";
import { viewPort } from "@app/Utils";

const ColorOptions = ["#5F5449", "#9B6A6C", "#B09398", "#CEDFD9", "#EBFCFB"];

const Picker = ({
  setColor
}: {
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
          <Touchable
            flex={1}
            height={20}
            backgroundColor={c}
            onPress={() => {
              setColor(c);
            }}
          />
        ))}
      </Box>
    </Box>
  </Box>
);

const ColorSwitch = (): JSX.Element => {
  const [color, setColor] = useState<string>(ColorOptions[0]);

  return (
    <Box flex={1} backgroundColor={color}>
      <Picker setColor={setColor} />
    </Box>
  );
};

export { ColorSwitch };
