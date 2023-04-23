import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Box } from "@app/Components";
import { Colors } from "@app/theme";
import { viewPort } from "@app/Utils";
import { MonthView } from "./Screens/MonthView";
import { DayView } from "./Screens/DayView";
import { Navigation } from "./Components/Navigation";
import { Screen } from "./types";

const Trackio = (): JSX.Element => {
  const [selectedPage, setSelectedPage] = useState<Screen>("day");
  const scrollViewRef = useRef<ScrollView>();

  useEffect(() => {
    scrollViewRef?.current?.scrollTo({
      x: selectedPage === "month" ? 0 : viewPort.width,
      animated: false
    });
  }, [selectedPage]);

  return (
    <Box flex={1} backgroundColor={Colors.gray100}>
      {/* {selectedPage === "month" ? <MonthView /> : <DayView />} */}
      <Box flex={1}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          scrollEnabled={false}
          {...StyleSheet.absoluteFillObject}
        >
          <Box width={viewPort.width} height={viewPort.height}>
            <MonthView />
          </Box>
          <Box width={viewPort.width} height={viewPort.height}>
            <DayView />
          </Box>
        </ScrollView>
      </Box>
      <Navigation
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
      />
    </Box>
  );
};

export { Trackio };
