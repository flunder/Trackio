import React from "react";
import { Audio } from "expo-av";

const mySound = require("../../../assets/switch_005.mp3");

export const usePlaySound = () => {
  async function playActualSound() {
    const { sound } = await Audio.Sound.createAsync(mySound, {
      rate: 1 + Math.random() / 10,
      volume: 0.5
    });
    await sound.playAsync();
  }

  const playSound = ({ delay }) => {
    setTimeout(playActualSound, delay);
  };

  return {
    playSound
  };
};
