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

export default { randomNumber, randomAngle, randomColor };
