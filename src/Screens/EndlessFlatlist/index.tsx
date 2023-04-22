import moment from "moment";
import React, { useRef, useState, useEffect } from "react";
import { FlatList } from "react-native";
import { Box, Text } from "@app/Components";
import { Colors, Fonts, Grid, Sizes } from "@app/theme";
import { viewPort } from "@app/Utils";

const { width, height } = viewPort;

const useSwiperData = () => {
  const [data, setData] = useState([]);

  const createSwiperData = () => {
    const today = moment();
    const totalDays = 14;

    const data = [...Array(totalDays)].map((_, i) => {
      return today.clone().subtract(totalDays / 2 - i, "day");
    });

    setData(data);
  };

  useEffect(() => {
    createSwiperData();
  }, []);

  return {
    data
  };
};

const EndlessFlatlist = (): JSX.Element => {
  const { data } = useSwiperData();

  const renderItem = ({ item, index }) => {
    return (
      <Box
        width={width}
        height={height}
        alignItems="center"
        justifyContent="center"
      >
        <Text fontFamily={Fonts.Bold} fontSize={60}>
          {item.format("DD.MM.YYYY")}
        </Text>
      </Box>
    );
  };

  if (!data || !data.length) return null;

  return (
    <Box flex={1} backgroundColor={Colors.gray100}>
      <FlatList
        data={data}
        keyExtractor={(item) => item}
        renderItem={renderItem}
        horizontal
        snapToInterval={width}
        decelerationRate="fast"
        onEndReachedThreshold={1}
        initialScrollIndex={7}
        getItemLayout={(data, index) => ({
          length: height,
          offset: width * index,
          index
        })}
      />
    </Box>
  );
};

export { EndlessFlatlist };
