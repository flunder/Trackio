import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const write = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log("Error writing AsyncStorage", key, e);
  }
};

export const read = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : {};
  } catch (e) {
    console.log("Error reading AsyncStorage", key, e);
  }
};

export const erase = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log("Error erasing AsyncStorage", key, e);
  }
};
