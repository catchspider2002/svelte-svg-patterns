<script>
  import constants from "./_constants.js";
  import { onMount } from "svelte";
  import "./_monolith.min.css";

  let Pickr;

  onMount(async () => {
    const module = await import("@simonwep/pickr");
    Pickr = module.default;
    createColorPickers();
  });

  let svgPattern = (color1, color2, stroke, scale) => {
    return (
      "<svg xmlns='http://www.w3.org/2000/svg' width='" +
      scale * width +
      "' height='" +
      scale * height +
      "' viewBox='0 0 " +
      viewBoxWidth +
      " " +
      viewBoxHeight +
      "'><rect x='0' y='0' width='" +
      width +
      "' height='" +
      height +
      "' fill='" +
      color1 +
      "'/><g fill='none' stroke='" +
      color2 +
      "' stroke-width='" +
      Math.round(stroke * 50) / 100 +
      "'>" +
      path +
      "</g></svg>"
    );
  };

  const patterns = constants.patterns[constants.randomInteger(0, 3)];

  const colors = patterns.colors,
    maxStroke = patterns.maxStroke,
    maxScale = patterns.maxScale,
    width = patterns.width,
    height = patterns.height,
    viewBoxWidth = patterns.viewBoxWidth,
    viewBoxHeight = patterns.viewBoxHeight,
    path = patterns.path;

const presetPatterns =  [
    {
      id: 1,
      color1: "white",
      color2: "black",
      stroke: 1,
      scale: 1
    },
    {
      id: 2,
      color1: constants.randomColor(0.8),
      color2: constants.randomColor(1),
      stroke: constants.randomNumber(1, maxStroke),
      scale: constants.randomNumber(1, maxScale/2)
    },
    {
      id: 3,
      color1: constants.randomColor(1),
      color2: constants.randomColor(1),
      stroke: constants.randomNumber(1, maxStroke),
      scale: constants.randomNumber(1, maxScale/2)
    },
    {
      id: 4,
      color1: constants.randomColor(0.9),
      color2: constants.randomColor(1),
      stroke: constants.randomNumber(1, maxStroke),
      scale: constants.randomNumber(1, maxScale/2)
    }
  ]

  let selectedPattern = presetPatterns[0];
  $: svgFile = svgPattern(
    selectedPattern.color1,
    selectedPattern.color2,
    selectedPattern.stroke,
    selectedPattern.scale
  );

  let outputWidth = 1080,
    outputHeight = 1080;

  $: cssOutput = 'background-image: url("data:image/svg+xml,' + svgFile + '")';

  function check() {
    const elements = document.getElementsByClassName("pcr-app");
    while (elements.length > 0) elements[0].remove();

    for (var j = 0; j < presetPatterns.length; j++) {
      if ("pattern" + presetPatterns[j].id === this.id) {
        selectedPattern = presetPatterns[presetPatterns[j].id - 1];
        createColorPickers();
      }
    }
  }

  function randomPattern() {
    selectedPattern = {
      id: 5,
      color1: constants.randomColor(0.8),
      color2: constants.randomColor(1),
      stroke: constants.randomNumber(1, maxStroke),
      scale: constants.randomNumber(1, maxScale)
	};
    svgFile = svgPattern(selectedPattern.color1, selectedPattern.color2, selectedPattern.stroke, selectedPattern.scale);

    createColorPickers();
  }

  function downloadSVG() {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.setAttribute("href", "data:image/svg+xml," + svgFile);
    a.setAttribute("download", "pattern.svg");
    a.click();
    a.remove();
  }

  function downloadPNG() {
    var image = new Image();
    image.src =
      "data:image/svg+xml;base64," +
      window.btoa(unescape(encodeURIComponent(svgFile)));

    image.onload = function() {
      console.log("Start");
      console.log(outputWidth);
      var canvas = document.createElement("canvas");
      canvas.width = outputWidth;
      canvas.height = outputHeight;
      var context = canvas.getContext("2d");
      var ptrn = context.createPattern(image, "repeat");
      context.fillStyle = ptrn;
      context.fillRect(0, 0, canvas.width, canvas.height);

      var a = document.createElement("a");
      a.download = "image.png";
      a.href = canvas.toDataURL("pattern/png");
      document.body.appendChild(a);
      a.click();
      a.remove();
    };
  }

  function copyText(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
  }

  function createColorPickers() {
    for (let i = 1; i <= colors; i++)
      createPicker("color" + i + "Div", "color" + i);
  }

  function createPicker(parentDiv, colorId) {
    var colorDiv = document.getElementById(parentDiv);

    while (colorDiv.hasChildNodes()) colorDiv.removeChild(colorDiv.firstChild);

    const newElement = document.createElement("div");
    document.getElementById(parentDiv).appendChild(newElement);

    const pickr = Pickr.create({
      el: newElement,
      theme: "monolith",
      autoReposition: true,
      comparison: false,
      default: selectedPattern[colorId],
      // lockOpacity: true,
      swatches: [
        "rgba(244, 67, 54, 1)",
        "rgba(233, 30, 99, 1)",
        "rgba(156, 39, 176, 1)",
        "rgba(103, 58, 183, 1)",
        "rgba(63, 81, 181, 1)",
        "rgba(3, 169, 244, 1)",
        "rgba(0, 188, 212, 1)",
        "rgba(0, 150, 136, 1)",
        "rgba(76, 175, 80, 1)",
        "rgba(139, 195, 74, 1)",
        "rgba(205, 220, 57, 1)",
        "rgba(255, 235, 59, 1)",
        "rgba(255, 193, 7, 1)",
        "rgba(233, 30, 99, 1)"
      ],
      components: {
        // preview: true,
        hue: true,
        opacity: true,
        // Input / output Options
        interaction: {
          hex: true,
          rgba: true,
          hsla: true,
          hsva: true,
          cmyk: false,
          input: true,
          clear: false
        }
      }
    });
    pickr.on("change", (color, instance) => {
      selectedPattern[colorId] = color.toHSLA().toString();
    });
  }
</script>

<style>
  .page {
    width: 100%;
    height: 100vh;
    display: block;
  }

  .container {
    /*width: 100%;*/
    margin: 0 auto;
    padding: 2em;
    background-color: #1a202c;
    color: #edf2f7;
  }

  .inputs {
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 16px;
    row-gap: 16px;
    align-items: center;
    padding: 2em 0;
  }
  .py-05 {
    padding: 0.5em 0;
  }

  input[type="number"] {
    color: #1a202c;
    /* border-color: rgb(159,122,234); */
    line-height: 1.25;
    padding: 0.5rem;
    font-size: 1rem;
    width: 80px;
  }

  /* Hide arrows for input number - Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Hide arrows for input number - Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }

  input[type="range"] {
    width: 100%;
    margin: 7.3px 0;
    background-color: transparent;
    -webkit-appearance: none;
  }
  input[type="range"]:focus {
    outline: none;
  }
  input[type="range"]::-webkit-slider-runnable-track {
    background: rgb(255, 218, 6);
    border: 0.2px solid #ffffff;
    border-radius: 15px;
    width: 100%;
    height: 11.4px;
    cursor: pointer;
  }
  input[type="range"]::-moz-range-track {
    background: rgb(255, 218, 6);
    border: 0.2px solid #ffffff;
    border-radius: 15px;
    width: 100%;
    height: 11.4px;
    cursor: pointer;
  }
  input[type="range"]:focus::-webkit-slider-runnable-track {
    background: rgba(255, 218, 6, 0.842);
  }
  input[type="range"]::-webkit-slider-thumb {
    margin-top: -7.5px;
    width: 26px;
    height: 26px;
    background: #00001e;
    border: 1.8px solid #ffffff;
    border-radius: 15px;
    cursor: pointer;
    -webkit-appearance: none;
  }
  input[type="range"]::-moz-range-thumb {
    width: 26px;
    height: 26px;
    background: #00001e;
    border: 1.8px solid #ffffff;
    border-radius: 15px;
    cursor: pointer;
  }

  .grid {
    display: grid;
    grid-template-columns: auto auto auto;
    justify-content: center;
    align-items: center;
    column-gap: 16px;
    row-gap: 16px;
  }

  button {
    display: inline-block;
    border: none;
    padding: 1rem 2rem;
    margin: 0;
    text-decoration: none;
    background-color: rgba(255, 218, 6, 1);
    color: #ffffff;
    font-family: inherit;
    font-size: 1rem;
    cursor: pointer;
    text-align: center;
    transition: background 250ms ease-in-out, transform 150ms ease;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  button:hover,
  button:focus {
    background-color: rgba(255, 218, 6, 0.8);
  }

  button:focus {
    outline: 1px solid #fff;
    /* outline-offset: -4px; */
  }

  button:active {
    transform: scale(0.99);
  }

  .button {
    color: #1a202c;
    text-align: center;
    cursor: pointer;
    padding: 0.5rem 1rem;
  }

  .samples {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    column-gap: 16px;
    row-gap: 16px;
    align-items: center;
    padding: 2em 0;
  }

  .pattern {
    width: 100%;
    cursor: pointer;
    display: flex;
    align-items: center;
    margin: 0 auto;
  }

  .pattern:before {
    content: "";
    display: block;
    height: 0;
    width: 0;
    padding-bottom: calc(10 / 16 * 100%);
  }

  .sampleOutput {
    width: 100%;
    height: 500px;
  }

  .text-center {
    text-align: center;
  }

  @media (max-width: 1024px) {
    .pattern:before {
      padding-bottom: calc(1 / 2 * 100%);
    }
  }
</style>

<svelte:head>
  <title>SVG Patterns</title>
</svelte:head>
<div id="page" class="page">
  <div class="container">
    <div>SVG Patterns</div>
    <p />
    <div class="samples">
      {#each presetPatterns as pattern}
        <button id="pattern{pattern.id}" class="pattern" on:click={check}
          style={'background-image: url("data:image/svg+xml,' + svgPattern(pattern.color1, pattern.color2, pattern.stroke, pattern.scale) + '"' + ')'} />
      {/each}
    </div>
    <!-- Business Card
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="525"
      height="300"
      viewBox="0 0 525 300">
      <rect x="0" y="0" width="525" height="300" fill="red" />
      <g fill="none" stroke="pink" stroke-width="0.5">
        <path
          d="M-7.5 33.505h15L0 46.495zM-7.5-6.495h15L0 6.495zM7.5 26.495h-15L0
          13.505zM27.5 6.495h-15L20-6.495zM12.5 13.505h15L20 26.495zM27.5
          46.495h-15l7.5-12.99zM32.5 33.505h15L40 46.495zM32.5-6.495h15L40
          6.495zM47.5 26.495h-15l7.5-12.99z" />
      </g>
    </svg> -->

    <button class="button" on:click={randomPattern} title="Random">Inspire Me</button>
    <div class="inputs">
      <label for="scale">Scale</label>
      <input id="scale" type="range" bind:value={selectedPattern.scale} min="1" max={maxScale} /> 
	  <label for="stroke">Stroke Size</label>
      <input id="stroke" type="range" bind:value={selectedPattern.stroke} min="1" max={maxStroke} />
      <label>Colors</label>
      <div class="inputs py-05">
        {#each { length: colors } as _, i}
          <div id="color{i + 1}Div" />
        {/each}
      </div>
    </div>
    <div class="sampleOutput" style={cssOutput} />
    <br />
    <div class="grid">
      <span>Copy</span>
      <button class="button" on:click={copyText(cssOutput)} title="CSS">CSS</button>
      <button class="button" on:click={copyText(svgFile)} title="SVG">SVG</button>
      <span>Download</span>
      <button class="button" on:click={downloadSVG} title="Download as SVG file">SVG</button>
      <button class="button" on:click={downloadPNG} title="Download as PNG file">PNG</button>
      <div />
      <label for="width" class="text-center">Width</label>
      <label for="height" class="text-center">Height</label>
      <span>Dimensions</span>
      <input id="width" type="number" bind:value={outputWidth} min="0" max="9999" 
	  on:input={e => {if (e.target.value.length > 4) e.target.value = e.target.value.slice(0,4)}}/>
      <input id="height" type="number" bind:value={outputHeight} min="0" max="9999" 
	  on:input={e => {if (e.target.value.length > 4) e.target.value = e.target.value.slice(0,4)}}/>
    </div>
  </div>
</div>
