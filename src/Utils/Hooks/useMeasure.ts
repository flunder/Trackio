import React, { useRef, useState } from "react";

export const useMeasure = () => {
  const myRef = useRef<any>();
  const [size, setSize] = useState<{
    a: number;
    b: number;
    width: number;
    height: number;
    px: number;
    py: number;
  }>();

  const measure = () => {
    if (!myRef.current) return;

    myRef.current.measure((a, b, width, height, px, py) => {
      setSize({ a, b, width, height, px, py });
    });
  };

  const onLayout = () => {
    measure();
  };

  return {
    myRef,
    onLayout,
    size
  };
};
