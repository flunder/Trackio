import React, { useRef, useState, useEffect } from "react";
import { Box, Text } from "@app/Components";
import { Colors, Corners, Grid, Sizes } from "@app/theme";
import { viewPort } from "@app/Utils";
import { navigationHeight } from "../const";
import { Potion } from "./Potion";
import { ASYNC_STORAGE_KEYS } from "../const";

const { COLOR_DATA } = ASYNC_STORAGE_KEYS;

interface Props {
  onChange: (index: number, color: "string") => void;
}

const ColorPicker = ({ onChange, ...props }: Props): JSX.Element => {
  return (
    <Box
      height={200}
      alignItems="center"
      width={viewPort.width}
      // paddingHorizontal={Grid.gutter_width}
      marginBottom={navigationHeight}
    >
      <Box
        width="100%"
        flex={1}
        backgroundColor={`${Colors.white}AA`}
        borderRadius={Corners.regular}
        padding={Sizes[6]}
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
      >
        <Potion
          scale={0.4}
          marginRight={Sizes[2]}
          color="#FF5325"
          topColor="#FFA188"
          onChange={onChange}
          index={1}
        />
        <Potion
          scale={0.4}
          marginRight={Sizes[2]}
          color="#8E5137"
          topColor="#B58B78"
          onChange={onChange}
          index={2}
        />
        <Potion
          scale={0.4}
          marginRight={Sizes[2]}
          color="green"
          topColor="cyan"
          onChange={onChange}
          index={3}
        />
      </Box>
    </Box>
  );
};

export { ColorPicker };
