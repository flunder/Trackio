import { SharedValue } from "react-native-reanimated";

/* Drag Drop */

export interface Question {
  id: number;
  parts: { type: "text" | "answer"; text: string }[];
}

export type DropArea = SharedValue<{ x: number; y: number; holds: number }>;
