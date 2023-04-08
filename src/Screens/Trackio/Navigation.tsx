import React, { Dispatch, SetStateAction } from "react";
import { Box, Touchable } from "@app/Components";
import { Colors } from "@app/theme";
import { CalendarDay, CalendarWeek } from "@app/Components/Icons";

const Navigation = ({
  selectedPage,
  setSelectedPage
}: {
  selectedPage: string;
  setSelectedPage: Dispatch<SetStateAction<"month" | "day">>;
}): JSX.Element => {
  return (
    <Box flexDirection="row" height={100} backgroundColor={Colors.white}>
      <Touchable
        flex={1}
        alignItems="center"
        justifyContent="center"
        borderRightColor="#f0f0f0"
        borderRightWidth={1}
        paddingBottom={10}
        onPress={() => {
          setSelectedPage("month");
        }}
      >
        <CalendarWeek opacity={selectedPage === "month" ? 1 : 0.3} />
      </Touchable>
      <Touchable
        flex={1}
        alignItems="center"
        justifyContent="center"
        paddingBottom={10}
        onPress={() => {
          setSelectedPage("day");
        }}
      >
        <CalendarDay opacity={selectedPage === "day" ? 1 : 0.3} />
      </Touchable>
    </Box>
  );
};

export { Navigation };
