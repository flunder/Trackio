import React, { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { LogBox } from 'react-native';
import { setCustomText } from 'react-native-global-props'
import { useFonts, Outfit_400Regular, Outfit_700Bold } from '@expo-google-fonts/outfit';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

import { DragDrop } from '@app/Screens/DragDrop';
import { PlaySound } from '@app/Screens/PlaySound';
import { Trackio } from '@app/Screens/Trackio';
import { EndlessFlatlist } from '@app/Screens/EndlessFlatlist';
import { ColorSwitch } from '@app/Screens/ColorSwitch/ColorSwitch-animated';

const queryClient = new QueryClient()

export default function App() {
  const [fontsLoaded] = useFonts({ Outfit_400Regular, Outfit_700Bold });

  const setDefaultFont = () => {
    const customTextProps = { style: { fontFamily: 'Outfit_400Regular' } }
    setCustomText(customTextProps)
  }

  const enableAudio = () => {
    const setAudio = async () => {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true
      });
    };
    setAudio();
  }

  const disableLogs = () => {
    LogBox.ignoreLogs([
      /^Require cycle:/
    ])
  }

  useEffect(() => {
    enableAudio()
    disableLogs();
  }, []);

  useEffect(() => {
    if (fontsLoaded) setDefaultFont();
  }, [fontsLoaded])

  if (!fontsLoaded) return null;

  return (
    <QueryClientProvider client={queryClient}>
      {/* <ColorSwitch /> */}
      <Trackio />
      {/* <EndlessFlatlist /> */}
    </QueryClientProvider>
  )
}