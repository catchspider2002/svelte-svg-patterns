const randomNumber = (min, max) => Math.round(Math.random() * (max - min) + min);

const randomAngle = () => Math.floor(Math.random() * 37) * 5;

const randomColor = opacity =>
  "hsla(" +
  Math.round(randomNumber(0, 360), 2) +
  "," +
  Math.round(randomNumber(0, 100), 2) +
  "%," +
  Math.round(randomNumber(0, 100), 2) +
  "%, " +
  opacity +
  ")";

const icons = {
  github:
    "M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5",
  dark: "M12 3c0.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z",
  light:
    "m 3,12 h 1 m 8,-9 v 1 m 8,8 h 1 m -9,8 v 1 M 5.6,5.6 6.3,6.3 M 18.4,5.6 17.7,6.3 m 0,11.4 0.7,0.7 M 6.3,17.7 5.6,18.4 M 16,12 a 4,4 0 0 1 -4,4 4,4 0 0 1 -4,-4 4,4 0 0 1 4,-4 4,4 0 0 1 4,4 z",
  twitter: ""
};

export default { randomNumber, randomAngle, randomColor, icons };
