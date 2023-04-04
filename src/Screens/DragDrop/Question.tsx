import React from "react";
import { Box, Text } from "@app/Components";
import { Question as QuestionType, DropArea as DropAreaType } from "@app/types";
import { DropArea } from "./DropArea";

interface Props {
  dropAreas: DropAreaType[];
  data: QuestionType;
}

const Question = ({ dropAreas, data: { parts } }: Props): JSX.Element => {
  let answerIndex: number = 0;

  return (
    <Box
      position="absolute"
      bottom={200}
      width="100%"
      flexDirection="row"
      alignItems="center"
      flexWrap="wrap"
      justifyContent="center"
      padding={20}
    >
      {parts.map(({ type, text, isAdditional }, index) => {
        if (type === "text") {
          return (
            <Text key={index} fontSize={22}>
              {text}
            </Text>
          );
        }
        if (type === "answer") {
          if (isAdditional) return;
          return <DropArea key={index} dropArea={dropAreas[answerIndex++]} />;
        }
      })}
    </Box>
  );
};

export { Question };
