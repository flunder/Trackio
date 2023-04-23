import moment from "moment";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Colors } from "@app/theme";
import { useDaysByColors } from "../queries";

interface Day {
  id: number;
  date: string;
  color: string;
}

interface Returns {
  data: Day[];
  isReady: boolean;
  setData: Dispatch<SetStateAction<Day[]>>;
}

export const useDaySwipeData = (daysToShow: number = 14): Returns => {
  const [data, setData] = useState<Day[]>([]);
  const { data: colorData, isLoading } = useDaysByColors();
  const isReady = data.length > 0;

  const createSwiperData = async () => {
    const today = moment().startOf("day");
    const totalDays = daysToShow;
    const data = [...Array(totalDays)].map((_, i) => {
      const date = today
        .clone()
        .subtract(totalDays / 2 - i, "day")
        .format("DD/MM/YYYY");
      const color = colorData?.[date] || Colors.gray100;
      return { id: i, date, color };
    });
    setData(data);
  };

  useEffect(() => {
    if (!isLoading) createSwiperData();
  }, [isLoading]);

  return {
    data,
    setData,
    isReady
  };
};
