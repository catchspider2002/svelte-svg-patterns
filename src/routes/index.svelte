<script>
  //   import pattern1File from "./patterns/_pattern1.js";
  import { onMount } from "svelte";
  import "./_monolith.min.css";

  let Pickr;

  onMount(async () => {
    const module = await import("@simonwep/pickr");
    Pickr = module.default;
    createPicker("color1Div", "color1");
    createPicker("color2Div", "color2");
  });

  let patterns = [
    {
      id: 1,
      color1: "hsla(300, 70.82650433153829%, 46.00795346001784%, 0.8)",
      color2: "hsla(250, 70.82650433153829%, 46.00795346001784%, 1)",
      strokeSize: 1,
      scale: 1,
      svg: function() {
        return (
          "<svg xmlns='http://www.w3.org/2000/svg' width='" +
          (this.scale * 40) +
          "' height='" +
          (this.scale * 40) +
          "' viewBox='0 0 10.583 10.583'><rect x='0' y='0' height='40' width='40' fill='" +
          this.color1 +
          "'/><path d='M2.46 0L0 2.458v.375L2.835 0h-.376zm5.29 0l2.833 2.833v-.375L8.125 0h-.376zM5.291 2.458L0 7.75v.375l5.292-5.29 5.29 5.29h.001V7.75L5.292 2.458zm0 5.293l-2.833 2.832h.374l2.459-2.458 2.458 2.458h.374L5.292 7.751z' fill-rule='evenodd' fill='" +
          this.color2 +
          "' stroke='" +
          this.color2 +
          "' stroke-width='" +
          Math.round(this.strokeSize * 20) / 100 +
          "'/><path d='M2.458 0l5.29 5.292-5.29 5.29v.001h.375l5.292-5.291L2.833 0h-.375zM7.75 0l2.833 2.835v-.376L8.125 0H7.75zM0 2.46v.373l2.458 2.459L0 7.75v.374l2.832-2.832L0 2.459zm10.583 5.29L7.75 10.582h.375l2.458-2.458v-.376z' fill='" +
          this.color2 +
          "' fill-rule='evenodd' stroke='" +
          this.color2 +
          "' stroke-width='" +
          Math.round(this.strokeSize * 20) / 100 +
          "'/></svg>"
        );
      }
    },
    {
      id: 2,
      color1: "hsla(100, 70.82650433153829%, 46.00795346001784%, 0.8)",
      color2: "hsla(250, 70.82650433153829%, 46.00795346001784%, 1)",
      strokeSize: 1,
      scale: 1,
      svg: function() {
        return (
          "<svg xmlns='http://www.w3.org/2000/svg' width='" +
          (this.scale * 56) +
          "' height='" +
          (this.scale * 100) +
          "' viewBox='0 0 56 100'><rect x='0' y='0' height='100' width='56' fill='" +
          this.color1 +
          "'/><g fill='none' stroke='" +
          this.color2 +
          "' stroke-width='" +
          Math.round(this.strokeSize * 50) / 100 +
          "'><path d='M28 26L0 10v-34l28-16 28 16v34L28 26v34M28 126L0 110V76l28-16 28 16v34l-28 16v34'/></g></svg>"
        );
      }
    },
    {
      id: 3,
      color1: "hsla(100, 70.82650433153829%, 46.00795346001784%, 0.8)",
      color2: "hsla(250, 70.82650433153829%, 46.00795346001784%, 1)",
      strokeSize: 1,
      scale: 1,
      svg: function() {
        return (
          "<svg xmlns='http://www.w3.org/2000/svg' width='" +
          (this.scale * 40) +
          "' height='" +
          (this.scale * 40) +
          "' viewBox='0 0 10.583 10.583'><rect x='0' y='0' height='40' width='40' fill='" +
          this.color1 +
          "'/><g fill='none' stroke='" +
          this.color2 +
          "' stroke-width='" +
          Math.round(this.strokeSize * 20) / 100 +
          "'><path d='M0 13.276l5.292-5.292 5.291 5.292'/><path d='M-2.646 10.63l7.938-7.937 7.937 7.937'/><path d='M-2.646 5.338l7.938-7.937 7.937 7.937'/></g></svg>"
        );
      }
    },
    {
      id: 4,
      color1: "hsla(100, 70.82650433153829%, 46.00795346001784%, 0.8)",
      color2: "hsla(250, 70.82650433153829%, 46.00795346001784%, 1)",
      strokeSize: 1,
      scale: 1,
      svg: function() {
        return (
          "<svg xmlns='http://www.w3.org/2000/svg' width='" +
          (this.scale * 40) +
          "' height='" +
          (this.scale * 40) +
          "' viewBox='0 0 10.583 10.583'><rect x='0' y='0' height='40' width='40' fill='" +
          this.color1 +
          "'/><g fill='none' stroke='" +
          this.color2 +
          "' stroke-width='" +
          Math.round(this.strokeSize * 20) / 100 +
          "'><path d='M-2.693 0L2.6 5.292l-5.292 5.291'/><path d='M-.047-2.646l7.938 7.938-7.938 7.937'/><path d='M5.245-2.646l7.937 7.938-7.937 7.937'/></g></svg>"
        );
      }
    },
    {
      id: 5,
      color1: "hsla(100, 70.82650433153829%, 46.00795346001784%, 0.8)",
      color2: "hsla(250, 70.82650433153829%, 46.00795346001784%, 1)",
      strokeSize: 1,
      scale: 1,
      svg: function() {
        return (
          "<svg xmlns='http://www.w3.org/2000/svg' width='" +
          (this.scale * 40) +
          "' height='" +
          (this.scale * 40) +
          "' viewBox='0 0 10.583 10.583'><rect x='0' y='0' height='40' width='40' fill='" +
          this.color1 +
          "'/><g fill='none' stroke='" +
          this.color2 +
          "' stroke-width='" +
          Math.round(this.strokeSize * 15) / 100 +
          "'><path d='M-1.323 2.117h13.23M-1.323 4.763h13.23M-1.323 7.408h13.23M-1.323 10.054h13.23M-1.323-.53h13.23'/></g></svg>"
        );
      }
    },
    {
      id: 6,
      color1: "hsla(100, 70.82650433153829%, 46.00795346001784%, 0.8)",
      color2: "hsla(250, 70.82650433153829%, 46.00795346001784%, 1)",
      strokeSize: 1,
      scale: 1,
      svg: function() {
        return (
          "<svg xmlns='http://www.w3.org/2000/svg' width='" +
          (this.scale * 40) +
          "' height='" +
          (this.scale * 40) +
          "' viewBox='0 0 10.583 10.583'><rect x='0' y='0' height='40' width='40' fill='" +
          this.color1 +
          "'/><g fill='none' stroke='" +
          this.color2 +
          "' stroke-width='" +
          Math.round(this.strokeSize * 15) / 100 +
          "'><path d='M6.88-1.852v13.23M4.233-1.852v13.23M1.587-1.852v13.23M-1.058-1.852v13.23M9.525-1.852v13.23'/></g></svg>"
        );
      }
    },
    {
      id: 7,
      color1: "hsla(100, 70.82650433153829%, 46.00795346001784%, 0.8)",
      color2: "hsla(250, 70.82650433153829%, 46.00795346001784%, 1)",
      strokeSize: 1,
      scale: 1,
      svg: function() {
        return (
          "<svg xmlns='http://www.w3.org/2000/svg' width='" +
          (this.scale * 40) +
          "' height='" +
          (this.scale * 40) +
          "' viewBox='0 0 10.583 10.583'><rect x='0' y='0' height='40' width='40' fill='" +
          this.color1 +
          "'/><g fill='none' stroke='" +
          this.color2 +
          "' stroke-width='" +
          Math.round(this.strokeSize * 15) / 100 +
          "'><path d='M-1.323-.53h13.23zm0 2.647h13.23zm0 2.646h13.23zm0 2.645h13.23zm0 2.646h13.23zm.265-11.906v13.23zm2.646 0v13.23zm2.645 0v13.23zm2.646 0v13.23zm2.646 0v13.23z'/></g></svg>"
        );
      }
    },
    {
      id: 8,
      color1: "hsla(100, 70.82650433153829%, 46.00795346001784%, 0.8)",
      color2: "hsla(250, 70.82650433153829%, 46.00795346001784%, 1)",
      strokeSize: 1,
      scale: 1,
      svg: function() {
        return (
          "<svg xmlns='http://www.w3.org/2000/svg' width='" +
          (this.scale * 40) +
          "' height='" +
          (this.scale * 40) +
          "' viewBox='0 0 10.583 10.583'><rect x='0' y='0' height='40' width='40' fill='" +
          this.color1 +
          "'/><g fill='none' stroke='" +
          this.color2 +
          "' stroke-width='" +
          Math.round(this.strokeSize * 15) / 100 +
          "'><path d='M5.292 13.23l-7.938-7.938 7.938-7.938m5.291 15.875L2.646 5.292l7.937-7.938m2.646 13.23L7.938 5.291 13.229 0M5.292-2.646l7.937 7.938-7.937 7.937M0-2.646l7.938 7.938L0 13.229M-2.646 0l5.292 5.292-5.292 5.291'/></g></svg>"
        );
      }
    },
    {
      id: 9,
      color1: "hsla(100, 70.82650433153829%, 46.00795346001784%, 0.8)",
      color2: "hsla(250, 70.82650433153829%, 46.00795346001784%, 1)",
      strokeSize: 1,
      scale: 1,
      svg: function() {
        return (
          "<svg xmlns='http://www.w3.org/2000/svg' width='" +
          (this.scale * 40) +
          "' height='" +
          (this.scale * 40) +
          "' viewBox='0 0 10.583 10.583'><rect x='0' y='0' height='40' width='40' fill='" +
          this.color1 +
          "'/><g fill='none' stroke='" +
          this.color2 +
          "' stroke-width='" +
          Math.round(this.strokeSize * 15) / 100 +
          "'><path d='M13.182 5.245l-7.937 7.937-7.938-7.937M13.182-.047L5.245 7.891-2.693-.047m13.23-2.646L5.245 2.6-.047-2.693m5.292 0l7.937 7.938-7.937 7.937M-.047-2.693l7.938 7.938-7.938 7.937M-2.693-.047L2.6 5.245l-5.292 5.292'/></g></svg>"
        );
      }
    },
    {
      id: 10,
      color1: "hsla(50, 70.82650433153829%, 46.00795346001784%, 0.8)",
      color2: "hsla(200, 70.82650433153829%, 46.00795346001784%, 1)",
      strokeSize: 1,
      scale: 1,
      svg: function() {
        return (
          "<svg xmlns='http://www.w3.org/2000/svg' width='" +
          (this.scale * 40) +
          "' height='" +
          (this.scale * 40) +
          "' viewBox='0 0 10.583 10.583'><rect x='0' y='0' height='40' width='40' fill='" +
          this.color1 +
          "'/><g fill='" +
          this.color2 +
          "' fill-rule='evenodd' stroke='" +
          this.color2 +
          "' stroke-width='" +
          Math.round(this.strokeSize * 20) / 100 +
          "'><circle r='2.646' cy='5.292' cx='5.292' overflow='visible'/><path overflow='visible' d='M0 4.63h10.583v1.323H0z'/><path overflow='visible' d='M5.953 0v10.583H4.63V0z'/></g></svg>"
        );
      }
    }
  ];

  $: clickedId = 0;
  $: svgFile = patterns[clickedId].svg();

  let width = 1080,
    height = 1080;

  $: cssOutput = 'background-image: url("data:image/svg+xml,' + svgFile + '")';

  function check() {
    for (var j = 0; j < patterns.length; j++) {
      if ("pattern" + patterns[j].id === this.id) {
        clickedId = patterns[j].id - 1;
        createPicker("color1Div", "color1");
        createPicker("color2Div", "color2");
      }
    }
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
      default: patterns[clickedId][colorId],
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
      patterns[clickedId][colorId] = color.toHSLA().toString();
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
    width: 80%;
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

  .pattern {
    height: 80px;
    width: 80px;
    cursor: pointer;
    display: flex;
    align-items: center;
    margin: 0 auto;
  }

  @media (min-width: 480px) {
  }
</style>

<svelte:head>
  <title>SVG Patterns</title>
</svelte:head>
<div id="page" class="page" style={cssOutput}>
  <div class="container">
    <div>SVG Patterns</div>
    <p />

    <div class="inputs">
      {#each patterns as pattern}
        <div
          id="pattern{pattern.id}"
          class="pattern"
          on:click={check}
          style={'background-image: url("data:image/svg+xml,' + pattern.svg() + '"' + ')'} />
      {/each}
    </div>

    <div class="pickr1" />
    <div class="inputs">
      <label>Scale</label>
      <input
        type="range"
        bind:value={patterns[clickedId].scale}
        min="1"
        max="16" />
      <label>Stroke Size</label>
      <input
        type="range"
        bind:value={patterns[clickedId].strokeSize}
        min="1"
        max="16" />
      <label for="color1">Color 1</label>
      <div>
        <div id="color1Div" />
      </div>
      <label for="color2">Color 2</label>
      <div>
        <div id="color2Div" />
      </div>
    </div>
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
