import moment from "moment";
import React, { useState, useRef } from "react";
import { Box } from "@app/Components";
import { Cell } from "./Cell";
import { monthHeight } from "./const";

const Calendar = ({ month, year, calendar }): JSX.Element => {
  const today = moment().format("YYYY-MM-DD");
  const [selectedDate, setSelectedDate] = useState("");

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

  return (
    <Box height={monthHeight} alignItems="center">
      {calendar.map((week, index) => (
        <Box key={index} flexDirection="row">
          {week.map((day) => {
            const currentDay = moment([year, month, day]).format("YYYY-MM-DD");
            const isSame = moment(currentDay).isSame(today);
            const isBefore = moment(currentDay).isBefore(today);
            const variant = isBefore
              ? "isBefore"
              : isSame
              ? "isSame"
              : "isAfter";

            return (
              <Box key={day} flexDirection="column">
                <Box>
                  {isExtraDays(index, day) ? (
                    <Cell />
                  ) : (
                    <Cell
                      text={day}
                      variant={variant}
                      onPress={() => {
                        // if (isBefore || isSame) {
                        setSelectedDate(currentDay);
                        // }
                      }}
                      isSelected={currentDay === selectedDate}
                    />
                  )}
                </Box>
              </Box>
            );
          })}
        </Box>
      ))}
    </Box>
  );
};

export { Calendar };
