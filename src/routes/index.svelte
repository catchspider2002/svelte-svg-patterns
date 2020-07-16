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
    return "<svg xmlns='http://www.w3.org/2000/svg' width='" +
      (this.scale * 20 + 20) +
      "' height='" +
      (this.scale * 20 + 20) +
      "' viewBox='0 0 10.583 10.583'><path d='M2.46 0L0 2.458v.375L2.835 0h-.376zm5.29 0l2.833 2.833v-.375L8.125 0h-.376zM5.291 2.458L0 7.75v.375l5.292-5.29 5.29 5.29h.001V7.75L5.292 2.458zm0 5.293l-2.833 2.832h.374l2.459-2.458 2.458 2.458h.374L5.292 7.751z' fill-rule='evenodd' fill='" +
      hexToHSL(this.color2) +
      "' stroke='" +
      hexToHSL(this.color2) +
      "' stroke-width='" +
      Math.round(this.strokeSize * 20) / 100 +
      "'/><path d='M2.458 0l5.29 5.292-5.29 5.29v.001h.375l5.292-5.291L2.833 0h-.375zM7.75 0l2.833 2.835v-.376L8.125 0H7.75zM0 2.46v.373l2.458 2.459L0 7.75v.374l2.832-2.832L0 2.459zm10.583 5.29L7.75 10.582h.375l2.458-2.458v-.376z' fill='" +
      hexToHSL(this.color2) +
      "' fill-rule='evenodd' stroke='" +
      hexToHSL(this.color2) +
      "' stroke-width='" +
      Math.round(this.strokeSize * 20) / 100 +
      "'/></svg>"
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
    return   "<svg xmlns='http://www.w3.org/2000/svg' width='" +
      (this.scale * 20 + 20) +
      "' height='" +
      (this.scale * 20 + 20) +
      "' viewBox='0 0 10.583 10.583'><path d='M7.752-5.292L-5.291 7.75v.376L8.127-5.291H7.75zm-5.293 0L15.873 8.125V7.75L2.835-5.29h-.377zm2.832 7.75L-5.291 13.041v.375L5.292 2.835l10.582 10.581h0v-.375L5.292 2.458zm0 5.293l-8.124 8.123h.374l7.75-7.749 7.75 7.75h.374L5.292 7.75z' fill='" +
      hexToHSL(this.color2) +
      "' fill-rule='evenodd' stroke='" +
      hexToHSL(this.color2) +
      "' stroke-width='" +
      Math.round(this.strokeSize * 20) / 100 +
      "'/></svg>"
  }
    }
  ];

  $: clickedId = 0;
  $: color1HSL = hexToHSL(patterns[clickedId].color1); // Background
  $: color2HSL = hexToHSL(patterns[clickedId].color2); // Stroke
  $: svgFile = patterns[clickedId].svg() //svg2;

  $: dataURIOld = "data:image/svg+xml," + svgFile;
  $: dataURI = '"data:image/svg+xml,' + svgFile + '"';

  $: cssOutput =
    "background-color: " +
    color1HSL +
    ";\r\nbackground-image: url(" +
    dataURI +
    ")";
  
  // $: svg3 = () => {
    // return (
      // "<svg xmlns='http://www.w3.org/2000/svg' width='" +
      // (scale * 20 + 20) +
      // "' height='" +
      // (scale * 20 + 20) +
      // "' viewBox='0 0 10.583 10.583'><path d='M2.46 0L0 2.458v.375L2.835 0h-.376zm5.29 0l2.833 2.833v-.375L8.125 0h-.376zM5.291 2.458L0 7.75v.375l5.292-5.29 5.29 5.29h.001V7.75L5.292 2.458zm0 5.293l-2.833 2.832h.374l2.459-2.458 2.458 2.458h.374L5.292 7.751z' fill='" +
      // color2HSL +
      // "' fill-rule='evenodd' stroke='" +
      // color2HSL +
      // "' stroke-width='" +
      // Math.round(strokeSize * 20) / 100 +
      // "'/></svg>"
    // );
  // };

  function download() {
    var dl = document.createElement("a");
    document.body.appendChild(dl); // This line makes it work in Firefox.
    dl.setAttribute("href", dataURIOld);
    dl.setAttribute("download", "test.svg");
    dl.click();
  }
	
  function check() {
    for (var j = 0; j < patterns.length; j++) {
      if ("pattern" + patterns[j].id === this.id)
        clickedId = patterns[j].id - 1;
    }
  }
	
  function hexToHSL(H) {
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

    return "hsl(" + h + "," + s + "%," + l + "%)";
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
    background-color: whitesmoke;
  }

  .inputs {
    display: grid;
    grid-template-columns: auto auto auto;
    grid-template-rows: auto auto auto auto auto;
    column-gap: 16px;
    row-gap: 16px;
    align-items: center;
    color: black;
  }

  #cssCode {
    color: black;
    border: 1px solid gray;
    overflow: auto;
    background-color: white;
    padding: 4px;
  }

  .colorPicker {
    height: 48px;
  }

  .download-button {
    background-color: aqua;
    color: black;
    text-align: center;
    cursor: pointer;
  }

  #pattern1,
  #pattern2 {
    height: 40px;
    width: 80px;
    background-color: lightgray;
  }

  @media (min-width: 480px) {
  }
</style>

<svelte:head>
  <title>SVG Patterns</title>
</svelte:head>
<div id="page" class="page" style={cssOutput}>
  <div class="container">
    <div id="svgSelection">{@html svgFile}</div>
    <p />

		<div class="inputs">			
    <div id="pattern1" on:click={check}>Pattern 1</div>
    <div id="pattern2" on:click={check}>Pattern 2</div>
		</div>

    <div class="inputs">
      <label>Scale</label>
      <input type="range" bind:value={patterns[clickedId].scale} min="0" max="16" />
      <input type="number" bind:value={patterns[clickedId].scale} min="0" max="16" />
      <label>Stroke Size</label>
      <input type="range" bind:value={patterns[clickedId].strokeSize} min="0" max="16" />
      <input type="number" bind:value={patterns[clickedId].strokeSize} min="0" max="16" />
      <label for="color1">Color 1</label>
      <input
        class="colorPicker"
        type="color"
        id="color1"
        name="color1"
        bind:value={patterns[clickedId].color1} />
      <input type="text" bind:value={patterns[clickedId].color1} />
      <label for="color2">Color 2</label>
      <input
        class="colorPicker"
        type="color"
        id="color2"
        name="color2"
        bind:value={patterns[clickedId].color2} />
      <input type="text" bind:value={patterns[clickedId].color2} />
    </div>
    <code id="svgCode">{svgFile}</code>
    <br />
    <div
      class="download-button"
      on:click={download}
      title="Download as SVG file.">
      Download SVG
    </div>
    <br />
    <div id="cssCode" contenteditable>{cssOutput}</div>
  </div>
</div>
