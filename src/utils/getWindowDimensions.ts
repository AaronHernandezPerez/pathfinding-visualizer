export interface WindowDimensions {
  width: number;
  height: number;
}

export function getWindowDimensions(): WindowDimensions {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}
