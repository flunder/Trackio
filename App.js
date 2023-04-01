import React, { useEffect } from "react";
import { Audio } from "expo-av";

import { DragDrop } from '@app/Screens/DragDrop';
import { PlaySound } from '@app/Screens/PlaySound';

export default function App() {
  useEffect(() => {
    const setAudio = async () => {
      await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    };
    setAudio();
  }, []);

  return <DragDrop />
}