import React, { useRef, useState, useEffect } from "react";
import { Animated, FlatList, ScrollView } from "react-native";
import { Box, Text } from "@app/Components";
import { Colors, Fonts, Grid, Sizes } from "@app/theme";
import { viewPort } from "@app/Utils";
import { navigationHeight } from "../const";
import { DayViewScrollView } from "../Components/DayViewScrollView";

const DayView = (): JSX.Element => {
  const scrollViewY = useRef(new Animated.Value(0)).current;

  const renderItem = ({ item, index }) => {
    return (
      <Box
        width={viewPort.width}
        height={viewPort.height}
        alignItems="center"
        justifyContent="center"
      >
        <DayViewScrollView item={item} scrollViewY={scrollViewY} />
      </Box>
    );
  };

  return (
    <Box flex={1}>
      <Box
        flexDirection="row"
        top={525}
        position="absolute"
        width="100%"
        justifyContent="center"
        as={Animated.View}
        transform={[{ translateY: Animated.multiply(scrollViewY, -1) }]}
        pointerEvents="none"
      >
        <Text fontSize={20} marginRight={Sizes[1]}>
          January
        </Text>
        <Text fontSize={20}>2023</Text>
      </Box>
      <FlatList
        data={[11, 12, 13, 14]}
        keyExtractor={(item) => item}
        renderItem={renderItem}
        horizontal
        snapToInterval={viewPort.width}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        // scrollEnabled={false}
        // onViewableItemsChanged={this.handleViewableItemsChanged}
        // viewabilityConfig={this.viewabilityConfig}
      />
    </Box>
  );
};

export { DayView };
