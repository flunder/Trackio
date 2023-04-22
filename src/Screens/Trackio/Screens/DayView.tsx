import React, { useRef, useState, useEffect } from "react";
import { Animated, FlatList } from "react-native";
import { Box, Text } from "@app/Components";
import { Sizes } from "@app/theme";
import { viewPort } from "@app/Utils";
import { DayViewScrollView } from "../Components/DayViewScrollView";
import { write, read, erase } from "@app/Utils/localStorage";
import { ASYNC_STORAGE_KEYS } from "../const";
import { useAnimatedColor } from "../Hooks/useAnimatedColor";
import { useDaySwipeData } from "../Hooks/useDaySwipeData";

const { width, height } = viewPort;

const DayView = (): JSX.Element => {
  const daysToShow = 14;
  const scrollViewY = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);
  const { color, setColor, animatedColor } = useAnimatedColor();
  const { data: daysData } = useDaySwipeData(daysToShow);

  const days = ["red", "green", "blue"];

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems?.[0]) setActiveIndex(viewableItems[0].index);
  }).current;

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    // alert(activeIndex);
    // setColor(days[activeIndex]);
  }, [activeIndex]);

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
          setColor={setColor}
        />
      </Box>
    );
  };

  if (!daysData || daysData.length === 0) return null;

  return (
    <Box flex={1} as={Animated.View} backgroundColor={animatedColor}>
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
        data={daysData}
        keyExtractor={(item) => item}
        renderItem={renderItem}
        horizontal
        snapToInterval={viewPort.width}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        initialScrollIndex={daysToShow / 2}
        getItemLayout={(data, index) => ({
          length: height,
          offset: width * index,
          index
        })}
      />
    </Box>
  );
};

export { DayView };
