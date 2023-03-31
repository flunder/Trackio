import { randomNumberBetween } from "./randomNumber";

export const pickOne = (list: string[]) => {
  const index = randomNumberBetween(1, list.length);
  return list[index - 1];
};
