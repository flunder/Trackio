import React, { useRef, useState, useEffect } from "react";
import Animated, { useSharedValue } from "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet, View } from "react-native";

import { Box, Text } from "@app/Components";
import { Colors } from "@app/theme";
import { Draggable } from "./Draggable";
import { Question } from "./Question";
import { data } from "./data";

const DragDrop = (): JSX.Element => {
  const [selected, setSelected] = useState<string[]>([]);
  const dropAreas = useRef([
    useSharedValue({ x: 0, y: 0 }),
    useSharedValue({ x: 0, y: 0 })
  ]).current;

  const question = data[0];
  const answers = question.parts
    .filter((i) => i.type === "answer")
    .map((i) => i.text);

  console.log(answers);

  return (
    <GestureHandlerRootView style={styles.wrap}>
      <Box position="absolute" top={100}>
        {selected.map((text, i) => (
          <Text key={i}>{text}</Text>
        ))}
      </Box>

      <Question dropAreas={dropAreas} data={question} />

      {answers.map((item, i) => (
        <Draggable
          key={item}
          text={item}
          x={i * 120}
          y={300}
          setSelected={setSelected}
          dropAreas={dropAreas}
        />
      ))}
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: Colors.gray100 }
});

export { DragDrop };
