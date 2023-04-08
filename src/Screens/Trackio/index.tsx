import React, { useState } from "react";
import { Box } from "@app/Components";
import { Colors } from "@app/theme";
import { MonthView } from "./MonthView";
import { DayView } from "./DayView";
import { Navigation } from "./Navigation";

const Trackio = (): JSX.Element => {
  const [selectedPage, setSelectedPage] = useState<"month" | "day">("month"); // month or day

  return (
    <Box flex={1} backgroundColor={Colors.gray100}>
      {selectedPage === "month" ? <MonthView /> : <DayView />}
      <Navigation
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
      />
    </Box>
  );
};

export { Trackio };
