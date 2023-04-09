import React, { useRef } from "react";
import { Animated, ViewStyle } from "react-native";
import { Box, Touchable } from "@app/Components";
import { pickViewStyleProps } from "@app/Utils/pickStyleProps";
import Svg, {
  Path,
  Ellipse,
  G,
  Circle,
  Defs,
  LinearGradient,
  Stop,
  Mask
} from "react-native-svg";
import { Bubbles } from "./";

const amounts = {
  full: 0,
  half: 120,
  empty: 220
};

interface Props extends ViewStyle {
  scale?: number;
  color: string;
  topColor: string;
  onChange: (index: number, color: string) => void;
  index: number;
}

const Potion = ({
  scale = 1,
  color,
  topColor,
  onChange,
  index,
  ...props
}: Props): JSX.Element => {
  const style = pickViewStyleProps(props);
  const AnimatedFill = Animated.createAnimatedComponent(G);
  const fillAmount = useRef(new Animated.Value(amounts.empty)).current;

  const animateTo = (amount: number) => {
    onChange(index, color);
    Animated.timing(fillAmount, {
      toValue: amount,
      duration: 500,
      useNativeDriver: false
    }).start();
  };

  return (
    <Box {...style}>
      <Svg
        width={112 * scale}
        height={370 * scale}
        viewBox="0 0 112 370"
        fill="none"
        {...props}
      >
        <Path fill="#F2DFDF" d="M30 18H82V56H30z" />
        <Path
          d="M0 104c0-30.928 25.072-56 56-56s56 25.072 56 56v210c0 30.928-25.072 56-56 56S0 344.928 0 314V104z"
          fill="#F2DFDF"
        />
        <Ellipse cx={56} cy={18.5} rx={26} ry={4.84314} fill="#F2DFDF" />
        <Mask
          id="a"
          style={{
            maskType: "alpha"
          }}
          maskUnits="userSpaceOnUse"
          x={5}
          y={82}
          width={102}
          height={282}
        >
          <Path
            d="M5 82h102v231c0 28.167-22.834 51-51 51S5 341.167 5 313V82z"
            fill="white"
          />
        </Mask>
        <G mask="url(#a)">
          <AnimatedFill translateY={fillAmount}>
            <Path
              d="M5 93h102v220c0 28.166-22.834 51-51 51S5 341.166 5 313V93z"
              fill={color}
            />
            <Ellipse cx={56} cy={92.5} rx={51} ry={9.5} fill={topColor} />
            <G opacity={0.4}>
              <Circle
                opacity={0.3}
                cx={41.1989}
                cy={317.31}
                r={2.42105}
                fill="#FF5325"
              />
            </G>
          </AnimatedFill>
        </G>
        <Path d="M32 7h48l-4 36H36L32 7z" fill="#BD7D02" />
        <Ellipse cx={56} cy={6} rx={24} ry={6} fill="#F6D459" />
        <Path
          d="M76 42.5c-.245 3.028-9.434 7.128-20.443 6.237-11.01-.89-19.737-2.71-19.492-5.737.245-3.028 9.369-4.76 20.378-3.87 11.01.891 19.802.342 19.557 3.37z"
          fill="#BD7D02"
        />
        <Path
          d="M56 33.5c0 1.105-1.12 2.5-2.5 2.5s-3.5.105-3.5-1 2.12-3 3.5-3 2.5.395 2.5 1.5z"
          fill="#712200"
        />
        <Path
          opacity={0.8}
          d="M44 19.818C44 21.576 42.88 23 41.5 23S39 21.576 39 19.818c0-1.757.12-3.818 1.5-3.818s3.5 2.061 3.5 3.818z"
          fill="#712200"
        />
        <Path
          opacity={0.8}
          d="M49 4.09c0 .503-1.12.91-2.5.91S44 4.593 44 4.09C44 3.59 44.12 3 45.5 3s3.5.589 3.5 1.09z"
          fill="#FCE593"
        />
        <Path
          opacity={0.8}
          d="M65 4.09c0 .503-2.239.91-5 .91-2.762 0-5-.407-5-.91C55 3.59 55.238 3 58 3c2.761 0 7 .589 7 1.09z"
          fill="#803400"
          fillOpacity={0.24}
        />
        <Path
          opacity={0.8}
          d="M74 7.91c0-.503-1.343-.91-3-.91s-3 .407-3 .91C68 8.41 68.143 9 69.8 9S74 8.411 74 7.91zM46 6.91c0-.503 1.343-.91 3-.91s3 .407 3 .91C52 7.41 51.857 8 50.2 8S46 7.411 46 6.91z"
          fill="#803400"
          fillOpacity={0.34}
        />
        <Path
          opacity={0.8}
          d="M75 4.91c0-.503-1.12-.91-2.5-.91s-2.5.407-2.5.91C70 5.41 70.12 6 71.5 6S75 5.411 75 4.91z"
          fill="#FCF193"
        />
        <Path
          opacity={0.8}
          d="M64 6.455c0-.252.672-.455 1.5-.455.829 0 1.5.204 1.5.455 0 .25-.072.545-.9.545-.828 0-2.1-.294-2.1-.545z"
          fill="#FCE593"
        />
        <Path
          opacity={0.8}
          d="M50 8.455c0-.252.672-.455 1.5-.455s1.5.204 1.5.455c0 .25-.072.545-.9.545-.828 0-2.1-.294-2.1-.545z"
          fill="#FEE17A"
        />
        <Path
          opacity={0.8}
          d="M73.11 18.756a1.258 1.258 0 10-.651-2.43c-.672.18-1.444.448-1.264 1.12.18.67 1.244 1.49 1.915 1.31z"
          fill="#793D23"
        />
        <Path
          d="M79 18.78c0 2.366-10.297 4.284-23 4.284s-23-1.918-23-4.285"
          stroke="#F2DFDF"
          strokeWidth={5.30769}
        />
      </Svg>

      <Bubbles fillAmount={fillAmount} />

      <Svg
        width={112 * scale}
        height={370 * scale}
        viewBox="0 0 112 370"
        fill="none"
        {...props}
        style={{ position: "absolute" }}
      >
        <Path
          opacity={0.2}
          d="M66.97 31.137a4.745 4.745 0 015.426-3.947l.12.018a2.252 2.252 0 011.873 2.576l-3.1 19.636a4.894 4.894 0 01-5.597 4.07 2.224 2.224 0 01-1.85-2.544l3.127-19.81z"
          fill="#fff"
        />
        <Path
          opacity={0.09}
          d="M19 94c0-11.046 8.954-20 20-20h27c5.523 0 10 4.477 10 10v180.769C76 291.406 54.406 313 27.77 313a8.77 8.77 0 01-8.77-8.769V94z"
          fill="#fff"
        />
        <Path
          opacity={0.2}
          d="M27 142c0-11.046 8.954-20 20-20h7c5.523 0 10 4.477 10 10v121.563C64 267.611 52.611 279 38.562 279 32.178 279 27 273.823 27 267.437V142z"
          fill="url(#paint0_linear_23_272)"
        />
        <Path
          opacity={0.29}
          d="M8 88c0-11.046 8.954-20 20-20h30.5a6.5 6.5 0 016.5 6.5v32.312C65 128.455 47.455 146 25.812 146 15.976 146 8 138.025 8 128.187V88z"
          fill="#fff"
        />
        <Path
          opacity={0.21}
          d="M69.328 118.434a5.534 5.534 0 016.48-4.388 3.32 3.32 0 012.562 4.185L67.493 155.76a5.519 5.519 0 01-2.202 3.03c-1.582 1.073-3.672-.304-3.31-2.181l7.347-38.175z"
          fill="#D9D9D9"
        />
        <Path opacity={0.45} fill="#F2DFDF" d="M33 23H79V49H33z" />
        <Path
          opacity={0.29}
          d="M15 82c0-9.941 8.059-18 18-18h22.75c2.9 0 5.25 2.35 5.25 5.25v26.125C61 112.841 46.841 127 29.375 127 21.435 127 15 120.564 15 112.625V82z"
          fill="#fff"
        />
        <Path
          opacity={0.39}
          d="M21 79c0-11.046 8.954-20 20-20h6.273A3.727 3.727 0 0151 62.727v10C51 87.79 38.79 100 23.727 100A2.727 2.727 0 0121 97.273V79z"
          fill="#fff"
        />
        <Defs>
          <LinearGradient
            id="paint0_linear_23_272"
            x1={17}
            y1={228.5}
            x2={64}
            y2={230.5}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#fff" stopOpacity={0} />
            <Stop offset={0.583333} stopColor="#fff" />
            <Stop offset={1} stopColor="#fff" stopOpacity={0} />
          </LinearGradient>
        </Defs>
      </Svg>

      <Box position="absolute" height="100%">
        <Touchable
          flex={1}
          onPress={() => animateTo(amounts.full)}
          width={44}
          paddingTop={20}
        />
        <Touchable
          flex={1}
          onPress={() => animateTo(amounts.half)}
          width={44}
        />
        <Touchable
          flex={1}
          onPress={() => animateTo(amounts.empty)}
          width={44}
        />
      </Box>
    </Box>
  );
};

export { Potion };
