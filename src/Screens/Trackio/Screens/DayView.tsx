import React, { useRef, useState, useEffect } from "react";
import { Animated, FlatList, ScrollView } from "react-native";
import { Box, Text } from "@app/Components";
import { Colors, Fonts, Grid, Sizes } from "@app/theme";
import { viewPort } from "@app/Utils";
import { navigationHeight } from "../const";
import { DayViewScrollView } from "../Components/DayViewScrollView";

const DayView = (): JSX.Element => {
  const scrollViewY = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);

  const onViewableItemsChanged = useRef(({ viewableItems, changed }) => {
    console.log(viewableItems);
    if (viewableItems?.[0]) setActiveIndex(viewableItems[0].index);
  }).current;

  const renderItem = ({ item, index }) => {
    return (
      <Box
        width={viewPort.width}
        height={viewPort.height}
        alignItems="center"
        justifyContent="center"
      >
        <DayViewScrollView
          item={item}
          scrollViewY={scrollViewY}
          isActive={index === activeIndex}
        />
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
          January {activeIndex}
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
        // bounces={false}
        // scrollEnabled={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 75 }}
      />
    </Box>
  );
};

export { DayView };
