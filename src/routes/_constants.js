const randomNumber = (min, max) => Math.round(Math.random() * (max - min) + min);

const randomAngle = () => Math.floor(Math.random() * 6) * 5;

const randomColor = (opacity) =>
  "hsla(" +
  Math.round(randomNumber(0, 360), 2) +
  "," +
  Math.round(randomNumber(0, 100), 2) +
  "%," +
  Math.round(randomNumber(0, 100), 2) +
  "%, " +
  opacity +
  ")";

const hexToHSL = (H) => {
  // Convert hex to RGB first
  let r = 0,
    g = 0,
    b = 0;
  if (H.length == 4) {
    r = "0x" + H[1] + H[1];
    g = "0x" + H[2] + H[2];
    b = "0x" + H[3] + H[3];
  } else if (H.length == 7) {
    r = "0x" + H[1] + H[2];
    g = "0x" + H[3] + H[4];
    b = "0x" + H[5] + H[6];
  }
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

  return "hsla(" + h + "," + s + "%," + l + "%,1)";
};

function HSLAToHexA(hsla) {
  let sep = hsla.indexOf(",") > -1 ? "," : " ";
  hsla = hsla.substr(5).split(")")[0].split(sep);

  // Strip the slash
  if (hsla.indexOf("/") > -1) hsla.splice(3, 1);

  let h = hsla[0],
    s = hsla[1].substr(0, hsla[1].length - 1) / 100,
    l = hsla[2].substr(0, hsla[2].length - 1) / 100,
    a = hsla[3];

  if (h.indexOf("deg") > -1) h = h.substr(0, h.length - 3);
  else if (h.indexOf("rad") > -1) h = Math.round(h.substr(0, h.length - 3) * (180 / Math.PI));
  else if (h.indexOf("turn") > -1) h = Math.round(h.substr(0, h.length - 4) * 360);
  if (h >= 360) h %= 360;

  // s /= 100;
  // l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  
  // Having obtained RGB, convert channels to hex
  r = Math.round((r + m) * 255).toString(16);
  g = Math.round((g + m) * 255).toString(16);
  b = Math.round((b + m) * 255).toString(16);

  a = Math.round(a * 255).toString(16);

  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;
  if (a.length == 1) a = "0" + a;

  if (a === "ff") return r + g + b;
  else return r + g + b + a;
}

const colorPalettes = [
  [hexToHSL('#005D00'), hexToHSL('#C73408'), hexToHSL('#FFC246'), hexToHSL('#FFFFFF'), hexToHSL('#870A1E')],
];

const icons = {
  github:
    "M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5",
  dark: "M12 3c0.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z",
  light:
    "m 3,12 h 1 m 8,-9 v 1 m 8,8 h 1 m -9,8 v 1 M 5.6,5.6 6.3,6.3 M 18.4,5.6 17.7,6.3 m 0,11.4 0.7,0.7 M 6.3,17.7 5.6,18.4 M 16,12 a 4,4 0 0 1 -4,4 4,4 0 0 1 -4,-4 4,4 0 0 1 4,-4 4,4 0 0 1 4,4 z",
  twitter:
    "M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z",
  instagram:
    "M16.5 7.5v.001M15 12a3 3 0 01-3 3 3 3 0 01-3-3 3 3 0 013-3 3 3 0 013 3zM8 4h8c2.216 0 4 1.784 4 4v8c0 2.216-1.784 4-4 4H8c-2.216 0-4-1.784-4-4V8c0-2.216 1.784-4 4-4z",
  facebook: "M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3",
  trending: "M14 7h7v7M3 17l6-6 4 4 8-8",
  license: "M9 11h4M9 7h4m2 14H6a3 3 0 01-3-3v-1h10v2a2 2 0 004 0V5a2 2 0 112 2h-2m2-4H8a3 3 0 00-3 3v11",
  release: "M11 9a2 2 0 01-2 2 2 2 0 01-2-2 2 2 0 012-2 2 2 0 012 2zm0-6l9 9a1.5 1.5 0 010 2l-6 6a1.5 1.5 0 01-2 0l-9-9V7a4 4 0 014-4h4",
  download: "M9 14l3 3 3-3m-3-3v6m5 4H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2zM14 3v4a1 1 0 001 1h4",
  search: "M10 3a7 7 0 00-7 7 7 7 0 007 7 7 7 0 007-7 7 7 0 00-7-7zm5 12l6 6-6-6z",
  cancel: "M6 6l12 12m0-12L6 18",
};

export default { randomNumber, randomAngle, randomColor, icons, hexToHSL, HSLAToHexA, colorPalettes };
