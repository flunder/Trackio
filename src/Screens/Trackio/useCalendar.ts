import moment from "moment";
import { useState, useEffect } from "react";

export const generateCalendar = (month, year) => {
  const calendar = [];
  const startDate = moment([year, month])
    .clone()
    .startOf("month")
    .startOf("week");
  const endDate = moment([year, month]).clone().endOf("month");
  const day = startDate.clone().subtract(0, "day");

  // looping a month by a week
  while (day.isBefore(endDate, "day")) {
    calendar.push(
      Array(7)
        .fill(0)
        .map(() => day.add(1, "day").clone().format("D"))
    );
  }

  return calendar;
};

export const useCalendar = (month, year) => {
  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    const calendar = generateCalendar(month, year);
    setCalendar(calendar);
  }, []);

  return { calendar };
};
