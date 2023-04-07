import moment from "moment";
import React, { useRef, useState, useEffect } from "react";
import { generateCalendar } from "./useCalendar";

type Months = { month: number; year: number; calendar: any }[];

export const useMonthsToShow = (): {
  monthsData: Months;
  isLoading: boolean;
} => {
  const monthsToShow = useRef(6).current;
  const [months, setMonths] = useState<Months>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const monthsData = [...Array(monthsToShow)].map((_, i) => {
      const newDate = moment().subtract(monthsToShow - (i + 1), "months");
      const month = parseInt(newDate.format("M"));
      const year = parseInt(newDate.format("yyyy"));
      const calendar = generateCalendar(month - 1, year);

      return {
        month,
        year,
        calendar
      };
    });

    setMonths(monthsData);
    setIsLoading(false);
  }, []);

  return {
    monthsData: months,
    isLoading: isLoading
  };
};
