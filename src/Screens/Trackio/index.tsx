import React, { useState } from "react";
import { Box } from "@app/Components";
import { Colors } from "@app/theme";
import { MonthView } from "./Screens/MonthView";
import { DayView } from "./Screens/DayView";
import { Navigation } from "./Components/Navigation";
import { Screen } from "./types";

const Trackio = (): JSX.Element => {
  const [selectedPage, setSelectedPage] = useState<Screen>("month");

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
