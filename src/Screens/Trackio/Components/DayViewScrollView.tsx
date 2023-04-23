import React, { useRef, useState, useEffect } from "react";
import { Animated, FlatList, ScrollView } from "react-native";
import { Box, Text } from "@app/Components";
import { Colors, Fonts, Grid, Sizes } from "@app/theme";
import { viewPort } from "@app/Utils";
import { navigationHeight } from "../const";
import { ColorPicker, ColorPickerSimpler } from "./";
import { ASYNC_STORAGE_KEYS } from "../const";

const { COLOR_DATA_KEY } = ASYNC_STORAGE_KEYS;

interface Props {
  // item: string | number;
  scrollViewY: Animated.Value;
  isActive: boolean;
  setColor: any;
}

const DayViewScrollView = ({
  item: dayData,
  scrollViewY,
  isActive,
  setColor
}: Props): JSX.Element => {
  const translateY = useRef(
    scrollViewY.interpolate({
      inputRange: [0, 220],
      outputRange: [-100, -220],
      extrapolate: "clamp"
    })
  ).current;

  const renderItem = ({ item, index }) => {
    return item === 0 ? (
      <Box height={viewPort.height - navigationHeight}>
        <Box flex={1} alignItems="center" justifyContent="center">
          <Text fontSize={280} fontFamily={Fonts.Bold} letterSpacing={-10}>
            {dayData.date.split("/")[0]}
          </Text>
        </Box>
      </Box>
    ) : (
      <Box
        as={Animated.View}
        transform={[{ translateY: translateY }]}
        top={200}
        width={300}
      >
        {isActive && <ColorPickerSimpler setColor={setColor} />}
      </Box>
    );
  };

  return (
    <Animated.FlatList
      data={[0, 1]}
      keyExtractor={(item) => item}
      renderItem={renderItem}
      snapToOffsets={[0, viewPort.height - navigationHeight]}
      decelerationRate="fast"
      showsVerticalScrollIndicator={false}
      bounces={false}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollViewY } } }],
        { useNativeDriver: true }
      )}
    />
  );
};

export { DayViewScrollView };
