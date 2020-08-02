const randomNumber = (min, max) => Math.random() * (max - min) + min;

const randomInteger = (min, max) => Math.floor(Math.random() * max + min);

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

// Inverted triangles
// const pattern1 = {
//   colors: 2,
//   maxStroke: 7,
//   maxScale: 16,
//   width: 40,
//   height: 40,
//   viewBoxWidth: 40,
//   viewBoxHeight: 40,
//   path:
//     "<path d='M-7.5 33.505h15L0 46.495zM-7.5-6.495h15L0 6.495zM7.5 26.495h-15L0 13.505zM27.5 6.495h-15L20-6.495zM12.5 13.505h15L20 26.495zM27.5 46.495h-15l7.5-12.99zM32.5 33.505h15L40 46.495zM32.5-6.495h15L40 6.495zM47.5 26.495h-15l7.5-12.99z'/>"
// };

// // Chevron
// const pattern2 = {
//   colors: 2,
//   maxStroke: 7,
//   maxScale: 16,
//   width: 40,
//   height: 40,
//   viewBoxWidth: 10.583,
//   viewBoxHeight: 10.583,
//   path:
//     "<path d='M0 13.276l5.292-5.292 5.291 5.292'/><path d='M-2.646 10.63l7.938-7.937 7.937 7.937'/><path d='M-2.646 5.338l7.938-7.937 7.937 7.937'/>"
// };

// // Honeycomb
// const pattern3 = {
//   colors: 2,
//   maxStroke: 7,
//   maxScale: 16,
//   width: 56,
//   height: 100,
//   viewBoxWidth: 56,
//   viewBoxHeight: 100,
//   path: "<path d='M28 26L0 10v-34l28-16 28 16v34L28 26v34M28 126L0 110V76l28-16 28 16v34l-28 16v34'/>"
// };

// const patterns = [pattern1, pattern2, pattern3];

export default { randomNumber, randomInteger, randomColor };
