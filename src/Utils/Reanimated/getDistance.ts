export const getDistance = (ax, ay, bx, by) => {
  "worklet";
  const dx = bx - ax;
  const dy = by - ay;
  return Math.sqrt(dx * dx + dy * dy);
};
