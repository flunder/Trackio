import Constants from "expo-constants";
import { Dimensions, Platform } from "react-native";

const isAndroid = Platform.OS === "android";
const { width, height } = Dimensions.get("window");

const viewPort = {
  width: width,
  height: height,
  statusBar: Constants.statusBarHeight
};

export { viewPort };
