import React, { useRef, useState, useEffect } from "react";
import { Animated, FlatList } from "react-native";
import { Box, Text } from "@app/Components";
import { Sizes } from "@app/theme";
import { viewPort } from "@app/Utils";
import { DayViewScrollView } from "../Components/DayViewScrollView";
import { write, read, erase } from "@app/Utils/localStorage";
import { ASYNC_STORAGE_KEYS } from "../const";

const DayView = (): JSX.Element => {
  const scrollViewY = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);

  const backgroundColorRaw = useRef(new Animated.Value(0)).current;
  const backgroundColor = useRef(
    backgroundColorRaw.interpolate({
      inputRange: [0, 1],
      outputRange: ["green", "red"]
    })
  ).current;

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems?.[0]) setActiveIndex(viewableItems[0].index);
  }).current;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {};

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
    <Box flex={1} as={Animated.View} backgroundColor={backgroundColor}>
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
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 75 }}
      />
    </Box>
  );
};

export { DayView };
