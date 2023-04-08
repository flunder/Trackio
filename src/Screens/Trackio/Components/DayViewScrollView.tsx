import React, { useRef, useState, useEffect } from "react";
import { Animated, FlatList, ScrollView } from "react-native";
import { Box, Text } from "@app/Components";
import { Colors, Fonts, Grid, Sizes } from "@app/theme";
import { viewPort } from "@app/Utils";
import { navigationHeight } from "../const";

interface Props {
  item: string | number;
  scrollViewY: Animated.Value;
}

const DayViewScrollView = ({
  item: dayItem,
  scrollViewY
}: Props): JSX.Element => {
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
      // <ColorPicker />
      <Box />
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
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollViewY } } }],
        { useNativeDriver: true }
      )}
      // scrollEnabled={false}
      // onViewableItemsChanged={this.handleViewableItemsChanged}
      // viewabilityConfig={this.viewabilityConfig}
    />
  );
};

export { DayViewScrollView };
