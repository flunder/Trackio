import React, { useRef, useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { Audio } from "expo-av";

const mySound = require("../../assets/switch_005.mp3");

const PlaySound = (): JSX.Element => {
  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(mySound);
    await sound.playAsync();
  }

  return (
    <View style={{ top: 300 }}>
      <Button title="Play Sound" onPress={playSound} />
    </View>
  );
};

export { PlaySound };
