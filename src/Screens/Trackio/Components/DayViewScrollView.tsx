import React, { useRef, useState, useEffect } from "react";
import { Animated, FlatList, ScrollView } from "react-native";
import { Box, Text } from "@app/Components";
import { Colors, Fonts, Grid, Sizes } from "@app/theme";
import { viewPort } from "@app/Utils";
import { navigationHeight } from "../const";
import { ColorPicker } from "./";

interface Props {
  item: string | number;
  scrollViewY: Animated.Value;
  isActive: boolean;
}

const DayViewScrollView = ({
  item: dayItem,
  scrollViewY,
  isActive
}: Props): JSX.Element => {
  const translateY = useRef(
    scrollViewY.interpolate({
      inputRange: [0, 220],
      outputRange: [0, -220],
      extrapolate: "clamp"
    })
  ).current;

  // const onViewableItemsChanged = useRef(({ viewableItems, changed }) => {
  //   console.log(viewableItems);
  //   alert("x");
  // }).current;

  const renderItem = ({ item }) => {
    return item === 0 ? (
      <Box height={viewPort.height - navigationHeight}>
        <Box flex={1} alignItems="center" justifyContent="center">
          <Text fontSize={280} fontFamily={Fonts.Bold} letterSpacing={-10}>
            {dayItem}
          </Text>
        </Box>
      </Box>
    ) : (
      <Box
        as={Animated.View}
        transform={[{ translateY: translateY }]}
        top={200}
      >
        {isActive && <ColorPicker />}
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
      // scrollEnabled={false}
      // onViewableItemsChanged={onViewableItemsChanged}
      // viewabilityConfig={{
      //   itemVisiblePercentThreshold: 100
      // }}
    />
  );
};

export { DayViewScrollView };
