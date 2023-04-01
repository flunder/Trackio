import React, { useRef, useState, useEffect } from "react";
import { View } from "react-native";
import { Box, Text } from "@app/Components";
import { Corners, Colors, Grid, Sizes } from "@app/theme";
import { useMeasure } from "@app/Utils";

const Question = ({ dropArea, data }): JSX.Element => {
  const { myRef, onLayout, size } = useMeasure();
  const { id, parts } = data;

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
    <Box
      position="absolute"
      bottom={200}
      width="100%"
      flexDirection="row"
      alignItems="center"
      flexWrap="wrap"
      justifyContent="center"
      padding={20}
    >
      {parts.map(({ type, text }, index) => {
        if (type === "text") {
          return (
            <Text key={index} fontSize={22}>
              {text}
            </Text>
          );
        }
        if (type === "answer") {
          return (
            <View
              key={index}
              style={{
                width: 70,
                height: 30,
                backgroundColor: "white",
                borderRadius: Corners.regular,
                zIndex: -1,
                marginVertical: 5,
                marginHorizontal: 8
              }}
              ref={myRef}
              onLayout={onLayout}
            />
          );
        }
      })}
    </Box>
  );
};

export { Question };
