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
  const { data: daysData, setData, isReady } = useDaySwipeData(daysToShow);

  const onViewableItemsChanged = useRef(({ viewableItems, changed }) => {
    // Quicker bi-directional onViewableItemsChanged
    if (viewableItems?.length >= 2 && changed?.[0]?.isViewable) {
      setActiveIndex(changed?.[0].index);
    } else {
      if (viewableItems?.[0]) setActiveIndex(viewableItems[0].index);
    }
  }).current;

  useEffect(() => {
    if (!isReady) return;
    setColor(daysData[activeIndex].color);
  }, [activeIndex]);

  useEffect(() => {
    if (!isReady) return;
    updateData();
  }, [color]);

  const updateData = async () => {
    // Apply locally
    const newData = [...daysData];
    newData[activeIndex] = { ...newData[activeIndex], color: color };
    setData(newData);
    // Save to storage
    const data = await read(ASYNC_STORAGE_KEYS.COLOR_DATA_KEY);
    const currentDate = newData[activeIndex].date;
    data[currentDate] = color;
    await write(ASYNC_STORAGE_KEYS.COLOR_DATA_KEY, data);
  };

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

  // console.log("daysData", daysData);

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
          January
        </Text>
        <Text fontSize={20}>2023</Text>
      </Box>
      <FlatList
        data={daysData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        horizontal
        snapToInterval={viewPort.width}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        initialScrollIndex={daysToShow / 2}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index
        })}
      />
    </Box>
  );
};

export { DayView };
