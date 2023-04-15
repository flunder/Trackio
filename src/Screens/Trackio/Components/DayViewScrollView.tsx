import React, { useRef, useState, useEffect } from "react";
import { Animated, FlatList, ScrollView } from "react-native";
import { Box, Text } from "@app/Components";
import { Colors, Fonts, Grid, Sizes } from "@app/theme";
import { viewPort } from "@app/Utils";
import { navigationHeight } from "../const";
import { ColorPicker } from "./";
import { write, read, erase } from "@app/Utils/localStorage";
import { ASYNC_STORAGE_KEYS } from "../const";
import {
  mixColors,
  mixRgbColorsSubtractively,
  mixRgbColorsSubtractivelyRaw
} from "../Utils";

const { COLOR_DATA_KEY } = ASYNC_STORAGE_KEYS;

const potions = [
  {
    top: "#FFA188",
    main: "rgb(255, 83, 37)"
  },
  {
    top: "#B58B78",
    main: "rgb(142, 81, 55)"
  },
  {
    top: "cyan",
    main: "rgb(51, 102, 153)"
  }
];

interface Props {
  item: string | number;
  scrollViewY: Animated.Value;
  isActive: boolean;
}

const DayViewScrollView = ({
  item: dayItem,
  scrollViewY,
  isActive,
  currentColor,
  nextColor,
  setTriggerRender
}: Props): JSX.Element => {
  const amounts = useRef<string[]>(["empty", "empty", "empty"]);

  const setAmount = (index, amount) => {
    const updatedAmounts = [...amounts.current];
    updatedAmounts[index] = amount;
    amounts.current = updatedAmounts;
  };

  const onChange = async (index, color, amount) => {
    console.log(index, color, amount);
    setAmount(index, amount);

    const colors = potions.map((p, i) => {
      return p.main
        .match(/\((.*)\)/)[1] // all inside ()
        .split(",")
        .map((rgbValue) => {
          const divisor = { full: 3, half: 2.5, empty: 0 }[amounts.current[i]];
          return parseInt(rgbValue) * divisor;
        });
    });

    const x = mixRgbColorsSubtractivelyRaw(colors);

    const y = `rgb(${x.join(",")})`;
    console.log("y", y);

    nextColor.current = `rgb(${x.join(",")})`;
    // currentColor.current = `rgb(${colors[0].join(",")})`;
    // setTriggerRender(Math.random());

    console.log("x", x);
    // mixRgbColorsSubtractively()

    /*
    const updatedColors = [...colors.current];
    updatedColors[index] = color;
    colors.current = updatedColors;

    // READ FROM LOCAL
    const dayData = await read(COLOR_DATA_KEY);

    // MERGE
    const date = `2023-01-${dayItem}`; // YYYY-MM-DD
    const newMix = mixColors(colors.current);
    console.log(newMix);

    dayData[date] = colors.current;

    // WRITE
    await write(COLOR_DATA_KEY, dayData);

    // READ FOR DEBUG
    const myNewData = await read(COLOR_DATA_KEY);
    console.log(myNewData);
    */
  };

  const translateY = useRef(
    scrollViewY.interpolate({
      inputRange: [0, 220],
      outputRange: [-100, -220],
      extrapolate: "clamp"
    })
  ).current;

  // const onViewableItemsChanged = useRef(({ viewableItems, changed }) => {
  //   console.log(viewableItems);
  //   alert("x");
  // }).current;

  const renderItem = ({ item, index }) => {
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
        {isActive && <ColorPicker onChange={onChange} potions={potions} />}
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
