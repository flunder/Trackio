import React, { useRef, Dispatch, SetStateAction } from "react";
import { Box, Touchable } from "@app/Components";
import { Colors } from "@app/theme";
import { CalendarDay, CalendarWeek } from "@app/Components/Icons";
import { navigationHeight } from "../const";
import { Screen } from "../types";

interface Props {
  selectedPage: string;
  setSelectedPage: Dispatch<SetStateAction<Screen>>;
}

const borderColor = "#f0f0f0";

const Navigation = ({ selectedPage, setSelectedPage }: Props): JSX.Element => {
  const navigationItems = [
    {
      id: 1,
      icon: <CalendarWeek opacity={selectedPage === "month" ? 1 : 0.3} />,
      onPress: () => {
        setSelectedPage("month");
      },
      extraStyles: { borderRightWidth: 1 }
    },
    {
      id: 2,
      icon: <CalendarDay opacity={selectedPage === "day" ? 1 : 0.3} />,
      onPress: () => {
        setSelectedPage("day");
      }
    }
  ];

  return (
    <Box
      flexDirection="row"
      height={navigationHeight}
      backgroundColor={Colors.white}
      borderTopWidth={1}
      borderColor={borderColor}
    >
      {navigationItems.map(({ id, onPress, icon, extraStyles }) => (
        <Touchable
          flex={1}
          key={id}
          alignItems="center"
          justifyContent="center"
          borderColor="#f0f0f0"
          paddingBottom={10}
          onPress={onPress}
          {...extraStyles}
        >
          {icon}
        </Touchable>
      ))}
    </Box>
  );
};

export { Navigation };
