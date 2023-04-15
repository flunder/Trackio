import React from "react";

interface RGBModel {
  red: number;
  green: number;
  blue: number;
  name?: string;
}

interface CMYKModel {
  cyan: number;
  magenta: number;
  yellow: number;
  key: number;
}

export const convertRgbToCmyk = (rgbColor: RGBModel): CMYKModel => {
  const { red, green, blue } = rgbColor;
  const cyan = 255 - red;
  const magenta = 255 - green;
  const yellow = 255 - blue;
  const key = Math.min(cyan, magenta, yellow);
  const divider = key === 255 ? 1 : 255 - key;

  return {
    cyan: (cyan - key) / divider,
    magenta: (magenta - key) / divider,
    yellow: (yellow - key) / divider,
    key: key / 255
  };
};

export const mixRgbColorsSubtractively = (rgbColors: RGBModel[]): RGBModel => {
  const cmykColors = rgbColors.map((rgbColor) => convertRgbToCmyk(rgbColor));
  let cyan = 0;
  let magenta = 0;
  let yellow = 0;
  let key = 0;
  cmykColors.forEach((cmykColor) => {
    cyan += cmykColor.cyan;
    magenta += cmykColor.magenta;
    yellow += cmykColor.yellow;
    key += cmykColor.key;
  });
  const cmykColor = {
    cyan: cyan / cmykColors.length,
    magenta: magenta / cmykColors.length,
    yellow: yellow / cmykColors.length,
    key: key / cmykColors.length
  };
  return convertCmykToRgb(cmykColor);
};

export const convertCmykToRgb = ({
  cyan,
  magenta,
  yellow,
  key
}: CMYKModel): RGBModel => {
  return {
    red: 255 * (1 - cyan) * (1 - key),
    green: 255 * (1 - magenta) * (1 - key),
    blue: 255 * (1 - yellow) * (1 - key)
  };
};

export const hexToRgb = (hex: string): RGBModel => {
  let alpha = false;
  let h = hex.slice(hex.startsWith("#") ? 1 : 0);
  if (h.length === 3) h = [...h].map((x) => x + x).join("");
  else if (h.length === 8) alpha = true;
  h = parseInt(h, 16);

  return {
    red: h >>> (alpha ? 24 : 16),
    green: (h & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8),
    blue: (h & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0)
  };
};

export const rgbToHex = (rgbColor: RGBModel): string => {
  const { red, green, blue } = rgbColor;
  return (
    "#" + ((1 << 24) | (red << 16) | (green << 8) | blue).toString(16).slice(1)
  );
};

export const mixColors = (colors: string[]): string | undefined => {
  if (!colors || colors.length === 0) return;
  // console.log("x", colors);
  const RGBcolors = colors.map((c) => hexToRgb(c));
  // console.log("y", RGBcolors);
  const mixed = mixRgbColorsSubtractively(RGBcolors);
  // console.log("mixed", mixed);
  const hex = rgbToHex(mixed);
  // console.log("hex", hex);
  return hex;
};

/* RAW ====== */

export const convertRgbToCmykRaw = (rgbColor: number[]): CMYKModel => {
  const cyan = 255 - rgbColor[0];
  const magenta = 255 - rgbColor[1];
  const yellow = 255 - rgbColor[2];
  const key = Math.min(cyan, magenta, yellow);
  const divider = key === 255 ? 1 : 255 - key;

  return {
    cyan: (cyan - key) / divider,
    magenta: (magenta - key) / divider,
    yellow: (yellow - key) / divider,
    key: key / 255
  };
};

export const mixRgbColorsSubtractivelyRaw = (rgbColors) => {
  const cmykColors = rgbColors.map((rgbColor) => convertRgbToCmykRaw(rgbColor));
  let cyan = 0;
  let magenta = 0;
  let yellow = 0;
  let key = 0;
  cmykColors.forEach((cmykColor) => {
    cyan += cmykColor.cyan;
    magenta += cmykColor.magenta;
    yellow += cmykColor.yellow;
    key += cmykColor.key;
  });
  const cmykColor = {
    cyan: cyan / cmykColors.length,
    magenta: magenta / cmykColors.length,
    yellow: yellow / cmykColors.length,
    key: key / cmykColors.length
  };
  return convertCmykToRgbRaw(cmykColor);
};

export const convertCmykToRgbRaw = ({
  cyan,
  magenta,
  yellow,
  key
}: CMYKModel) => {
  return [
    255 * (1 - cyan) * (1 - key),
    255 * (1 - magenta) * (1 - key),
    255 * (1 - yellow) * (1 - key)
  ];
};
