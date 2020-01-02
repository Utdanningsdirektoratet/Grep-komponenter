const hexPattern = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
const hexPatternShorthand = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

const convertHex2rgb = (hex: string): number[] => {
  const match = hex
    .replace(hexPatternShorthand, (_m, r, g, b) => r + r + g + g + b + b)
    .match(hexPattern);
  match && match.shift();
  return match ? match.map((i: string) => parseInt(i, 16)) : [];
};

export const hex2rgb = (hex: string) => {
  const rgb = convertHex2rgb(hex);
  return rgb && `rgb(${rgb.join(',')})`;
};

export const hex2rgba = (hex: string, alpha: number) => {
  const rgb = convertHex2rgb(hex);
  rgb && rgb.push(alpha);
  return rgb && `rgba(${rgb.join(',')})`;
};

export const convertToRgba = (color: string, alpha: number) => {
  if (color.match(/^#/)) {
    return hex2rgba(color, alpha);
  }
  const [ , value] = color.match(/[(](.*)[)]/) || [];
  return value ? `rgba(${value}, ${alpha})` : color;
};
