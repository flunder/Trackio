import moment, { Moment } from "moment";
import React, { useState, useRef } from "react";
import { ActivityIndicator } from "react-native";

import { Box } from "@app/Components";
import { Cell } from "./Cell";
import { monthHeight } from "../const";
import { useDaysByColors } from "../queries";
import { mergeColors } from "../Utils/";

const padInt = (num, count) => {
  return [Math.pow(10, count - num.toString().length), num].join("").substr(1);
};

const Calendar = ({ month, year, calendar }): JSX.Element => {
  const { data, isLoading } = useDaysByColors();
  const today = moment().format("YYYY-MM-DD");
  const [selectedDate, setSelectedDate] = useState<Moment>();

  const isExtraDays = useRef((week, date) => {
    if (week === 0 && date > 10) {
      return true;
    } else if (week === 5 && date < 10) {
      return true;
    } else if (week === 4 && date < 10) {
      return true;
    } else {
      return false;
    }
  }).current;

  if (isLoading) return <ActivityIndicator />;
  // console.log(data);

  return (
    <Box height={monthHeight} alignItems="center">
      {calendar.map((week, index) => (
        <Box key={index} flexDirection="row">
          {week.map((day) => {
            const currentDay = moment([year, month + 1, day], "YYYY-MM-DD");
            const isSame = moment(currentDay).isSame(today);
            const isBefore = moment(currentDay).isBefore(today);
            const isSelected = currentDay.isSame(selectedDate);
            const onPress = () => setSelectedDate(currentDay);
            const variant = isBefore
              ? "isBefore"
              : isSame
              ? "isSame"
              : "isAfter";
            const key = [year, padInt(month + 1, 2), day].join("-");
            const colors = data?.[key];
            const color = mergeColors(colors);

            return (
              <Box key={day} flexDirection="column">
                {isExtraDays(index, day) ? (
                  <Cell />
                ) : (
                  <Cell
                    text={day}
                    variant={variant}
                    onPress={onPress}
                    isSelected={isSelected}
                    dayColor={color}
                  />
                )}
              </Box>
            );
          })}
        </Box>
      ))}
    </Box>
  );
};

export { Calendar };
