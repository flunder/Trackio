import React, { useRef, useState, useEffect } from "react";
import { Box, Text } from "@app/Components";
import { Colors, Corners, Grid, Sizes } from "@app/theme";
import { viewPort } from "@app/Utils";
import { navigationHeight } from "../const";
import { Potion } from "./Potion";

interface Props {
  onChange: (
    index: number,
    color: "string",
    amount: "full" | "half" | "empty"
  ) => void;
}

const ColorPicker = ({ onChange, potions, ...props }: Props): JSX.Element => {
  return (
    <Box
      height={200}
      alignItems="center"
      width={viewPort.width}
      marginBottom={navigationHeight}
    >
      <Box
        width="100%"
        flex={1}
        backgroundColor={`${Colors.white}AA`}
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
      >
        {potions.map((pot, i) => (
          <Potion
            scale={0.4}
            marginRight={Sizes[2]}
            color={pot.main}
            topColor={pot.top}
            onChange={onChange}
            index={i}
          />
        ))}
      </Box>
    </Box>
  );
};

export { ColorPicker };
