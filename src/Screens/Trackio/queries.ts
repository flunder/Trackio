import React, { useState } from "react";
import { useQuery } from "react-query";
import { read } from "@app/Utils/localStorage";
import { ASYNC_STORAGE_KEYS } from "./const";

export const useDaysByColors = () => {
  return useQuery("colors", async () => {
    const res = await read(ASYNC_STORAGE_KEYS.COLOR_DATA_KEY);
    return res;
  });
};
