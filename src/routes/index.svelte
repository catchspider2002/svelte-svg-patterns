<script>
  //   import pattern1File from "./patterns/_pattern1.js";
  let patterns = [
    {
      id: 1,
      color1: "#ffaaff",
      color2: "#8b0aab",
      color1Trans: 1,
      color2Trans: 1,
      strokeSize: 1,
      scale: 1,
      svg: function() {
        return (
          "<svg xmlns='http://www.w3.org/2000/svg' width='" +
          (this.scale * 20 + 20) +
          "' height='" +
          (this.scale * 20 + 20) +
          "' viewBox='0 0 10.583 10.583'><rect x='0' y='0' height='40' width='40' fill='" +
          hexToHSL(this.color1, this.color1Trans) +
          "'/><path d='M2.46 0L0 2.458v.375L2.835 0h-.376zm5.29 0l2.833 2.833v-.375L8.125 0h-.376zM5.291 2.458L0 7.75v.375l5.292-5.29 5.29 5.29h.001V7.75L5.292 2.458zm0 5.293l-2.833 2.832h.374l2.459-2.458 2.458 2.458h.374L5.292 7.751z' fill-rule='evenodd' fill='" +
          hexToHSL(this.color2, this.color2Trans) +
          "' stroke='" +
          hexToHSL(this.color2, this.color2Trans) +
          "' stroke-width='" +
          Math.round(this.strokeSize * 20) / 100 +
          "'/><path d='M2.458 0l5.29 5.292-5.29 5.29v.001h.375l5.292-5.291L2.833 0h-.375zM7.75 0l2.833 2.835v-.376L8.125 0H7.75zM0 2.46v.373l2.458 2.459L0 7.75v.374l2.832-2.832L0 2.459zm10.583 5.29L7.75 10.582h.375l2.458-2.458v-.376z' fill='" +
          hexToHSL(this.color2, this.color2Trans) +
          "' fill-rule='evenodd' stroke='" +
          hexToHSL(this.color2, this.color2Trans) +
          "' stroke-width='" +
          Math.round(this.strokeSize * 20) / 100 +
          "'/></svg>"
        );
      }
    },
    {
      id: 2,
      color1: "#f00aff",
      color2: "#000aab",
      color1Trans: 1,
      color2Trans: 1,
      strokeSize: 1,
      scale: 1,
      svg: function() {
        return (
          "<svg xmlns='http://www.w3.org/2000/svg' width='" +
          (this.scale * 20 + 20) +
          "' height='" +
          (this.scale * 20 + 20) +
          "' viewBox='0 0 10.583 10.583'><rect x='0' y='0' height='40' width='40' fill='" +
          hexToHSL(this.color1, this.color1Trans) +
          "'/><path d='M7.752-5.292L-5.291 7.75v.376L8.127-5.291H7.75zm-5.293 0L15.873 8.125V7.75L2.835-5.29h-.377zm2.832 7.75L-5.291 13.041v.375L5.292 2.835l10.582 10.581h0v-.375L5.292 2.458zm0 5.293l-8.124 8.123h.374l7.75-7.749 7.75 7.75h.374L5.292 7.75z' fill='" +
          hexToHSL(this.color2, this.color2Trans) +
          "' fill-rule='evenodd' stroke='" +
          hexToHSL(this.color2, this.color2Trans) +
          "' stroke-width='" +
          Math.round(this.strokeSize * 20) / 100 +
          "'/></svg>"
        );
      }
    },
    {
      id: 3,
      color1: "#f00a00",
      color2: "#000a00",
      color1Trans: 1,
      color2Trans: 1,
      strokeSize: 1,
      scale: 1,
      svg: function() {
        return (
          "<svg xmlns='http://www.w3.org/2000/svg' width='" +
          (this.scale * 20 + 20) +
          "' height='" +
          (this.scale * 20 + 20) +
          "' viewBox='0 0 10.583 10.583'><rect x='0' y='0' height='40' width='40' fill='" +
          hexToHSL(this.color1, this.color1Trans) +
          "'/><g fill='" +
          hexToHSL(this.color2, this.color2Trans) +
          "' fill-rule='evenodd' stroke='" +
          hexToHSL(this.color2, this.color2Trans) +
          "' stroke-width='" +
          Math.round(this.strokeSize * 20) / 100 +
          "'><path d='M2.858 5.292L.026 2.459v.374l2.46 2.459L.025 7.75v.374z' overflow='visible'/><path d='M8.151 5.292L2.861 0V0h-.375l5.29 5.292-5.29 5.29v.001h.375zM10.61 2.459L8.15 0V0h-.374l2.832 2.834zm0 5.29l-2.834 2.833v.001h.376l2.457-2.459z' overflow='visible'/><path d='M2.858 5.292L.026 2.459v.374l2.46 2.459L.025 7.75v.374z' overflow='visible'/><path d='M8.151 5.292L2.861 0V0h-.375l5.29 5.292-5.29 5.29v.001h.375zM10.61 2.459L8.15 0V0h-.374l2.832 2.834zm0 5.29l-2.834 2.833v.001h.376l2.457-2.459z' overflow='visible'/></g></svg>"
        );
      }
    },
    {
      id: 4,
      color1: "#f00a00",
      color2: "#000a00",
      color1Trans: 1,
      color2Trans: 1,
      strokeSize: 1,
      scale: 1,
      svg: function() {
        return (
          "<svg xmlns='http://www.w3.org/2000/svg' width='" +
          (this.scale * 20 + 20) +
          "' height='" +
          (this.scale * 20 + 20) +
          "' viewBox='0 0 10.583 10.583'><rect x='0' y='0' height='40' width='40' fill='" +
          hexToHSL(this.color1, this.color1Trans) +
          "'/><g fill='" +
          hexToHSL(this.color2, this.color2Trans) +
          "' fill-rule='evenodd' stroke='" +
          hexToHSL(this.color2, this.color2Trans) +
          "' stroke-width='" +
          Math.round(this.strokeSize * 20) / 100 +
          "'><circle r='2.646' cy='5.292' cx='5.292' overflow='visible'/><path overflow='visible' d='M0 4.63h10.583v1.323H0z'/><path overflow='visible' d='M5.953 0v10.583H4.63V0z'/></g></svg>"
        );
      }
    }
  ];

  let cssText = "CSS";
  $: clickedId = 0;
  $: color1HSL = hexToHSL(
    patterns[clickedId].color1,
    patterns[clickedId].color1Trans
  ); // Background
  $: color2HSL = hexToHSL(
    patterns[clickedId].color2,
    patterns[clickedId].color2Trans
  ); // Stroke
  $: svgFile = patterns[clickedId].svg();

  $: cssOutput =
    // 'background-color: ' +
    // color1HSL +
    // ';\r\n'+
    'background-image: url("data:image/svg+xml,' + svgFile + '")';

  function check() {
    for (var j = 0; j < patterns.length; j++) {
      if ("pattern" + patterns[j].id === this.id)
        clickedId = patterns[j].id - 1;
    }
  }

  function hexToHSL(H, t) {
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

    return "hsl(" + h + "," + s + "%," + l + "%, " + t + ")";
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
      canvas.width = 1080; //image.width;
      canvas.height = 1080; //image.height;
      var context = canvas.getContext("2d");
      var ptrn = context.createPattern(image, "repeat");
      context.fillStyle = ptrn;
      context.fillRect(0, 0, canvas.width, canvas.height);

      var a = document.createElement("a");
      a.download = "image.png";
      a.href = canvas.toDataURL("pattern/png");
      // a.title = "This is Link";
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
    cssText = "Copied";
  }
</script>

<style>
  .page {
    width: 100%;
    height: 100vh;
    display: block;
    color: black;
  }

  .container {
    width: 80%;
    margin: 0 auto;
    padding: 2em;
    background-color: whitesmoke;
  }

  .inputs {
    display: grid;
    grid-template-columns: auto auto auto;
    grid-template-rows: auto auto auto auto auto;
    column-gap: 16px;
    row-gap: 16px;
    align-items: center;
  }

  input[type="text"],
  input[type="number"] {
    color: rgb(179, 172, 161);
    /* border-color: rgb(159,122,234); */
    line-height: 1.25;
    padding: 0.5rem 1rem;
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
    background: rgba(48, 113, 169, 0.78);
    border: 0.2px solid #010101;
    border-radius: 1.3px;
    width: 100%;
    height: 11.4px;
    cursor: pointer;
  }
  input[type="range"]::-webkit-slider-thumb {
    margin-top: -7.5px;
    width: 26px;
    height: 26px;
    background: #ffffff;
    border: 1.8px solid #00001e;
    border-radius: 15px;
    cursor: pointer;
    -webkit-appearance: none;
  }
  input[type="range"]:focus::-webkit-slider-runnable-track {
    background: #367ebd;
  }
  input[type="range"]::-moz-range-track {
    background: rgba(48, 113, 169, 0.78);
    border: 0.2px solid #010101;
    border-radius: 1.3px;
    width: 100%;
    height: 11.4px;
    cursor: pointer;
  }
  input[type="range"]::-moz-range-thumb {
    width: 26px;
    height: 26px;
    background: #ffffff;
    border: 1.8px solid #00001e;
    border-radius: 15px;
    cursor: pointer;
  }
  input[type="range"]::-ms-track {
    background: transparent;
    border-color: transparent;
    border-width: 8.2px 0;
    color: transparent;
    width: 100%;
    height: 11.4px;
    cursor: pointer;
  }
  input[type="range"]::-ms-fill-lower {
    background: #2a6495;
    border: 0.2px solid #010101;
    border-radius: 2.6px;
  }
  input[type="range"]::-ms-fill-upper {
    background: rgba(48, 113, 169, 0.78);
    border: 0.2px solid #010101;
    border-radius: 2.6px;
  }
  input[type="range"]::-ms-thumb {
    width: 26px;
    height: 26px;
    background: #ffffff;
    border: 1.8px solid #00001e;
    border-radius: 15px;
    cursor: pointer;
    margin-top: 0px;
    /*Needed to keep the Edge thumb centred*/
  }
  input[type="range"]:focus::-ms-fill-lower {
    background: rgba(48, 113, 169, 0.78);
  }
  input[type="range"]:focus::-ms-fill-upper {
    background: #367ebd;
  }
  /*TODO: Use one of the selectors from https://stackoverflow.com/a/20541859/7077589 and figure out
how to remove the virtical space around the range input in IE*/
  @supports (-ms-ime-align: auto) {
    /* Pre-Chromium Edge only styles, selector taken from hhttps://stackoverflow.com/a/32202953/7077589 */
    input[type="range"] {
      margin: 0;
      /*Edge starts the margin from the thumb, not the track as other browsers do*/
    }
  }

  .grid {
    display: grid;
    grid-template-columns: auto auto auto;
    justify-content: center;
    align-items: center;
    column-gap: 16px;
    row-gap: 16px;
  }

  .colorPicker {
    height: 48px;
  }

  .button {
    background-color: rgb(255, 218, 6);
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

    <div class="inputs">
      <label>Scale</label>
      <input
        type="range"
        bind:value={patterns[clickedId].scale}
        min="0"
        max="16" />
      <input
        type="number"
        bind:value={patterns[clickedId].scale}
        min="0"
        max="16" />
      <label>Stroke Size</label>
      <input
        type="range"
        bind:value={patterns[clickedId].strokeSize}
        min="0"
        max="16" />
      <input
        type="number"
        bind:value={patterns[clickedId].strokeSize}
        min="0"
        max="16" />
      <label for="color1">Color 1</label>
      <input
        class="colorPicker"
        type="color"
        id="color1"
        name="color1"
        bind:value={patterns[clickedId].color1} />
      <input type="text" bind:value={patterns[clickedId].color1} />
      <label>Transparency</label>
      <input
        type="range"
        bind:value={patterns[clickedId].color1Trans}
        min="0"
        step="0.1"
        max="1" />
      <input
        type="number"
        bind:value={patterns[clickedId].color1Trans}
        min="0"
        max="1" />
      <label for="color2">Color 2</label>
      <input
        class="colorPicker"
        type="color"
        id="color2"
        name="color2"
        bind:value={patterns[clickedId].color2} />
      <input type="text" bind:value={patterns[clickedId].color2} />
      <label>Transparency</label>
      <input
        type="range"
        bind:value={patterns[clickedId].color2Trans}
        min="0"
        step="0.1"
        max="1" />
      <input
        type="number"
        bind:value={patterns[clickedId].color2Trans}
        min="0"
        max="1" />
    </div>
    <br />
    <div class="grid">
      <span>Copy</span>
      <div class="button" on:click={copyText(cssOutput)} title="CSS">{cssText}</div>
      <div <div class="button" on:click={copyText(svgFile)} title="SVG">
        SVG
      </div>
      <span>Download</span>
      <div class="button" on:click={downloadSVG} title="Download as SVG file">
        SVG
      </div>
      <div class="button" on:click={downloadPNG} title="Download as PNG file">
        PNG
      </div>
    </div>
  </div>
</div>
