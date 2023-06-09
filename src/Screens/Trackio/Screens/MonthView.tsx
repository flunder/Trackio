import React, { useRef, useState, useEffect } from "react";
import { Animated, ActivityIndicator } from "react-native";

import { viewPort } from "@app/Utils";
import { Box, Text } from "@app/Components";
import { Colors, Fonts, Sizes } from "@app/theme";

import { Cell } from "../Components/Cell";
import { Calendar } from "../Components/Calendar";
import { useMonthsToShow } from "../Hooks/useMonthsToShow";
import { titleHeight, monthHeight, months, weekdays } from "../const";
import { useDaysByColors } from "../queries";

const MonthView = React.memo((): JSX.Element => {
  const offsetY = useRef(new Animated.Value(0)).current;
  const { data, isLoading: x } = useDaysByColors();
  const [isFirstRender, setIsFirstRender] = useState(true);

  const monthOffsetY = useRef(
    offsetY.interpolate({
      inputRange: [0, monthHeight],
      outputRange: [0, -titleHeight],
      extrapolate: "extend"
    })
  ).current;

  const { monthsData, isLoading } = useMonthsToShow();

  console.log("monthsData", monthsData);

  useEffect(() => {
    // if (!isLoading) setIsFirstRender(false);
    setTimeout(() => {
      setIsFirstRender(false);
    }, 1000);
  }, [isLoading]);

  const Weekdays = () => (
    <Box flexDirection="row" alignSelf="center">
      {weekdays.map((weekday) => (
        <Cell key={weekday} text={weekday} color={Colors.gray900} />
      ))}
    </Box>
  );

  const Title = () => {
    return (
      <Box
        marginLeft={Sizes[6] + 2}
        paddingTop={Sizes[3]}
        marginBottom={Sizes[2]}
      >
        <Box height={titleHeight} overflow="hidden">
          <Box as={Animated.View} transform={[{ translateY: monthOffsetY }]}>
            {monthsData.map((item, i) => {
              return (
                <Text
                  key={i}
                  height={titleHeight}
                  fontSize={30}
                  fontFamily={Fonts.Bold}
                >
                  {months[item.month - 1]} {item.year}
                </Text>
              );
            })}
          </Box>
        </Box>
      </Box>
    );
  };

  const renderItem = ({ item: { month, year, calendar } }) => (
    <Calendar
      month={month - 1}
      year={year}
      calendar={calendar}
      data={data}
      isFirstRender={isFirstRender}
    />
  );

  return (
    <Box flex={1}>
      <Box
        height={monthHeight}
        paddingTop={viewPort.statusBar + 20}
        backgroundColor="white"
      >
        {isLoading && <ActivityIndicator />}
        {!isLoading && (
          <>
            <Title />
            <Weekdays />
            <Animated.FlatList
              data={monthsData}
              keyExtractor={({ month, year }) => `${month}${year}`}
              renderItem={renderItem}
              snapToInterval={monthHeight}
              decelerationRate="fast"
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              bounces={false}
              initialScrollIndex={monthsData.length - 1}
              getItemLayout={(data, index) => ({
                length: monthHeight,
                offset: monthHeight * index,
                index
              })}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: offsetY } } }],
                { useNativeDriver: true }
              )}
            />
          </>
        )}
      </Box>
    </Box>
  );
});

export { MonthView };
