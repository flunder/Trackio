import React, { useEffect } from "react";
import { View } from "react-native";

import { Corners } from "@app/theme";
import { useMeasure } from "@app/Utils";

const DropArea = ({ dropArea }): JSX.Element => {
  const { myRef, onLayout, size } = useMeasure();

  useEffect(() => {
    if (size) dropArea.value = { x: size.px, y: size.py };
  }, [size]);

  return (
    <View
      style={{
        width: 70,
        height: 30,
        backgroundColor: "white",
        borderRadius: Corners.regular,
        zIndex: -1,
        marginVertical: 5,
        marginHorizontal: 8
      }}
      ref={myRef}
      onLayout={onLayout}
    />
  );
};

export { DropArea };
