import React, { useRef, useState, useEffect } from "react";
import { Box, Text, Touchable } from "@app/Components";
import { Corners, Colors, Grid, Sizes } from "@app/theme";
import { viewPort } from "@app/Utils";
import { CalendarDay, CalendarWeek } from "@app/Components/Icons";
import { MonthView } from "./MonthView";
import { DayView } from "./DayView";
import { Navigation } from "./Navigation";

const Trackio = (): JSX.Element => {
  const [selectedPage, setSelectedPage] = useState<"month" | "day">("month"); // month or day

  return (
    <Box flex={1} backgroundColor={Colors.gray100}>
      {selectedPage === "month" ? <MonthView /> : <DayView />}
      <Navigation setSelectedPage={setSelectedPage} />
    </Box>
  );
};

export { Trackio };
