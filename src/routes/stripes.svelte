<script>
  import constants from "./_constants.js";
  import { onMount } from "svelte";
  import "./_monolith.min.css";

  let Pickr;

  onMount(async () => {
    const module = await import("@simonwep/pickr");
    Pickr = module.default;
    createPicker("color1Div", "color1");
    createPicker("color2Div", "color2");
  });

  let svgPattern1 = (scale, color1, color2, strokeSize) => {
    return (
      "<svg xmlns='http://www.w3.org/2000/svg' width='" +
      scale * 40 +
      "' height='" +
      scale * 40 +
      "' viewBox='0 0 40 40'><rect x='0' y='0' width='40' height='40' fill='" +
      color1 +
      "'/><g fill='none' stroke='" +
      color2 +
      "' stroke-width='" +
      Math.round(strokeSize * 50) / 100 +
      "'><path d='M-7.5 33.505h15L0 46.495zM-7.5-6.495h15L0 6.495zM7.5 26.495h-15L0 13.505zM27.5 6.495h-15L20-6.495zM12.5 13.505h15L20 26.495zM27.5 46.495h-15l7.5-12.99zM32.5 33.505h15L40 46.495zM32.5-6.495h15L40 6.495zM47.5 26.495h-15l7.5-12.99z'/></g></svg>"
    );
  };

  const maxStroke = 14,
    maxScale = 16;

  const patterns = [
    {
      id: 1,
      color1: "white",
      color2: "black",
      strokeSize: 1,
      scale: 1
    },
    {
      id: 2,
      color1: "pink",
      color2: "red",
      strokeSize: 3,
      scale: 2
    },
    {
      id: 3,
      color1: "hsla(100, 70.82650433153829%, 46.00795346001784%, 0.8)",
      color2: "hsla(250, 70.82650433153829%, 46.00795346001784%, 1)",
      strokeSize: 14,
      scale: 4
    },
    {
      id: 4,
      color1: "hsla(50, 70.82650433153829%, 46.00795346001784%, 0.8)",
      color2: "hsla(123, 70.82650433153829%, 46.00795346001784%, 1)",
      strokeSize: 8,
      scale: 3
    }
  ];

  let constantPatterns = patterns;

  //   let clickedId = 0;
  let selectedPattern = patterns[0];
  $: svgFile = svgPattern1(
    selectedPattern.scale,
    selectedPattern.color1,
    selectedPattern.color2,
    selectedPattern.strokeSize
  );

  let width = 1080,
    height = 1080;

  $: cssOutput = 'background-image: url("data:image/svg+xml,' + svgFile + '")';

  function check() {
    const elements = document.getElementsByClassName("pcr-app");
    while (elements.length > 0) elements[0].remove();

    for (var j = 0; j < patterns.length; j++) {
      if ("pattern" + patterns[j].id === this.id) {
        // clickedId = patterns[j].id - 1;
        selectedPattern = patterns[patterns[j].id - 1];
        createPicker("color1Div", "color1");
        createPicker("color2Div", "color2");
      }
    }
  }

  function randomPattern() {
    let randomScale = constants.randomNumber(1, maxScale),
      randomStroke = constants.randomNumber(1, maxStroke),
      randomColor1 = constants.hexToHSL(constants.randomColor(), 0.8),
      randomColor2 = constants.hexToHSL(constants.randomColor(), 1);
    svgFile = svgPattern1(
      randomScale,
      randomColor1,
      randomColor2,
      randomStroke
    );
    selectedPattern = {
      id: 5,
      color1: randomColor1,
      color2: randomColor2,
      strokeSize: randomStroke,
      scale: randomScale
    };

    createPicker("color1Div", "color1");
    createPicker("color2Div", "color2");
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
      var canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
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
    // cssText = "Copied";
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

  .button {
    background-color: rgb(255, 218, 6);
    color: #1a202c;
    text-align: center;
    cursor: pointer;
    padding: 0.5rem 1rem;
  }

  .samples {
    display: grid;
    /*grid-template-columns: 1fr 1fr;*/
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    column-gap: 16px;
    row-gap: 16px;
    align-items: center;
    padding: 2em 0;
  }

  .pattern {
    /*height: 240px;
    width: 240px;*/
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
    padding-bottom: calc(10/16 * 100%);
}

  .sampleOutput {
    width: 100%;
    height: 500px;
  }

  @media (min-width: 1024px) {
    /*.samples {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }*/
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
      {#each constantPatterns as pattern}
        <div
          id="pattern{pattern.id}"
          class="pattern"
          on:click={check}
          style={'background-image: url("data:image/svg+xml,' + svgPattern1(pattern.scale, pattern.color1, pattern.color2, pattern.strokeSize) + '"' + ')'} >1</div>
      {/each}
    </div>

    <div class="button" on:click={randomPattern} title="Random">Random</div>
    <div class="inputs">
      <label>Scale</label>
      <input
        type="range"
        bind:value={selectedPattern.scale}
        min="1"
        max={maxScale} />
      <label>Stroke Size</label>
      <input
        type="range"
        bind:value={selectedPattern.strokeSize}
        min="1"
        max={maxStroke} />
      <label for="color1">Color 1</label>
      <div>
        <div id="color1Div" />
      </div>
      <label for="color2">Color 2</label>
      <div>
        <div id="color2Div" />
      </div>
    </div>
    <div class="sampleOutput" style={cssOutput} />
    <br />
    <div class="grid">
      <span>Copy</span>
      <div class="button" on:click={copyText(cssOutput)} title="CSS">CSS</div>
      <div class="button" on:click={copyText(svgFile)} title="SVG">SVG</div>
      <span>Download</span>
      <div class="button" on:click={downloadSVG} title="Download as SVG file">
        SVG
      </div>
      <div class="button" on:click={downloadPNG} title="Download as PNG file">
        PNG
      </div>
      Width
      <input type="number" bind:value={width} min="0" />
      <div />
      Height
      <input type="number" bind:value={height} min="0" />
    </div>
  </div>
</div>
