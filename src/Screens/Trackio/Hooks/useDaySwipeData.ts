import moment from "moment";
import React, { useState, useEffect } from "react";

export const useDaySwipeData = (daysToShow: number = 14) => {
  const [data, setData] = useState([]);

  const createSwiperData = () => {
    const today = moment();
    const totalDays = daysToShow;

    const data = [...Array(totalDays)].map((_, i) =>
      today.clone().subtract(totalDays / 2 - i, "day")
    );

    setData(data);
  };

  useEffect(() => {
    createSwiperData();
  }, []);

  return {
    data
  };
};
