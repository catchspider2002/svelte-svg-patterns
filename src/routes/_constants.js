const randomNumber = (min, max) => Math.random() * (max - min) + min;

const randomColor = () => "#" + Math.floor(Math.random() * 16777215).toString(16);

const hexToHSL = (H, t) => {
  // Convert hex to RGB first
  let r = 0,
    g = 0,
    b = 0;
  r = "0x" + H[1] + H[2];
  g = "0x" + H[3] + H[4];
  b = "0x" + H[5] + H[6];

  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta == 0) h = 0;
  else if (cmax == r) h = ((g - b) / delta) % 6;
  else if (cmax == g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return "hsla(" + h + "," + s + "%," + l + "%, " + t + ")";
};

export default { randomNumber, randomColor, hexToHSL };
