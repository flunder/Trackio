import React, { SetStateAction, Dispatch } from "react";
import { LayoutAnimation } from "react-native";
import { Box, Touchable } from "@app/Components";
import { Colors, Corners, Grid, Shadow, Sizes } from "@app/theme";

const ColorOptions = ["#5F5449", "#9B6A6C", "#B09398", "#CEDFD9", "#EBFCFB"];

export const ColorPickerSimpler = ({
  color,
  setColor
}: {
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
}) => (
  <Box
    // position="absolute"
    // bottom={100}
    paddingHorizontal={Grid.gutter_width}
    width="100%"
    height={220}
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
                // LayoutAnimation.configureNext({
                //   duration: 500,
                //   create: { type: "linear", property: "scaleXY" },
                //   update: { type: "linear", property: "scaleXY" },
                //   delete: { type: "linear", property: "scaleXY" }
                // });

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
