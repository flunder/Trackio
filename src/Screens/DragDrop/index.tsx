import React, { useRef, useState, useEffect } from "react";
import Animated, { useSharedValue } from "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet, View } from "react-native";

import { Box, Text } from "@app/Components";
import { Colors, Corners } from "@app/theme";
import { Draggable } from "./Draggable";
import { Question } from "./Question";

const items = ["por", "para"];

const data = [
  {
    id: 1,
    parts: [
      {
        type: "text",
        text: "Compré los huevos"
      },
      {
        type: "answer",
        text: "por"
      },
      {
        type: "text",
        text: "el desayuno."
      },
      {
        type: "text",
        text: "Y fui a la calle"
      },
      {
        type: "answer",
        text: "por"
      },
      {
        type: "text",
        text: "la noche."
      }
    ]
  }
];

const DragDrop = (): JSX.Element => {
  const [selected, setSelected] = useState();
  const dropArea = useSharedValue({ x: 0, y: 0 });

  return (
    <GestureHandlerRootView style={styles.wrap}>
      <Box position="absolute" top={100}>
        <Text>{selected}</Text>
      </Box>

      <Question dropArea={dropArea} data={data[0]} />

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
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: Colors.gray100 }
});

export { DragDrop };
