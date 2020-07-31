const randomNumber = (min, max) => Math.random() * (max - min) + min;

const randomInteger = (min, max) => Math.floor(Math.random() * max + min);

// Inverted triangles
const pattern1 = [
  2, // colors
  7, // maxStroke
  16, // maxScale
  40, // width
  40, // height
  40, // viewBoxWidth
  40, // viewBoxHeight
  "<path d='M-7.5 33.505h15L0 46.495zM-7.5-6.495h15L0 6.495zM7.5 26.495h-15L0 13.505zM27.5 6.495h-15L20-6.495zM12.5 13.505h15L20 26.495zM27.5 46.495h-15l7.5-12.99zM32.5 33.505h15L40 46.495zM32.5-6.495h15L40 6.495zM47.5 26.495h-15l7.5-12.99z'/>",
  [
    {
      id: 1,
      color1: "white",
      color2: "black",
      stroke: 1,
      scale: 1,
    },
    {
      id: 2,
      color1: "pink",
      color2: "red",
      stroke: 3,
      scale: 2,
    },
    {
      id: 3,
      color1: "hsla(100, 70%, 46%, 0.8)",
      color2: "hsla(250, 70%, 46%, 1)",
      stroke: 7,
      scale: 4,
    },
    {
      id: 4,
      color1: "hsla(50, 70%, 46%, 0.8)",
      color2: "hsla(123, 70%, 46%, 1)",
      stroke: 5,
      scale: 3,
    },
  ],
];

// Chevron
const pattern2 = [
  2, // colors
  7, // maxStroke
  16, // maxScale
  40, // width
  40, // height
  10.583, // viewBoxWidth
  10.583, // viewBoxHeight
  "<path d='M0 13.276l5.292-5.292 5.291 5.292'/><path d='M-2.646 10.63l7.938-7.937 7.937 7.937'/><path d='M-2.646 5.338l7.938-7.937 7.937 7.937'/>",
  [
    {
      id: 1,
      color1: "white",
      color2: "black",
      stroke: 1,
      scale: 1,
    },
    {
      id: 2,
      color1: "pink",
      color2: "red",
      stroke: 3,
      scale: 2,
    },
    {
      id: 3,
      color1: "hsla(100, 70%, 46%, 0.8)",
      color2: "hsla(250, 70%, 46%, 1)",
      stroke: 7,
      scale: 4,
    },
    {
      id: 4,
      color1: "hsla(50, 70%, 46%, 0.8)",
      color2: "hsla(123, 70%, 46%, 1)",
      stroke: 5,
      scale: 3,
    },
  ],
];

// Honeycomb
const pattern3 = [
  2, // colors
  7, // maxStroke
  16, // maxScale
  56, // width
  100, // height
  56, // viewBoxWidth
  100, // viewBoxHeight
  "<path d='M28 26L0 10v-34l28-16 28 16v34L28 26v34M28 126L0 110V76l28-16 28 16v34l-28 16v34'/>",
  [
    {
      id: 1,
      color1: "white",
      color2: "black",
      stroke: 1,
      scale: 1,
    },
    {
      id: 2,
      color1: "pink",
      color2: "red",
      stroke: 3,
      scale: 2,
    },
    {
      id: 3,
      color1: "hsla(100, 70%, 46%, 0.8)",
      color2: "hsla(250, 70%, 46%, 1)",
      stroke: 7,
      scale: 4,
    },
    {
      id: 4,
      color1: "hsla(50, 70%, 46%, 0.8)",
      color2: "hsla(123, 70%, 46%, 1)",
      stroke: 5,
      scale: 3,
    },
  ],
];

const patterns = [pattern1, pattern2, pattern3];

export default { randomNumber, randomInteger, patterns };
