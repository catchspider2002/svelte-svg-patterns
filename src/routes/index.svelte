<script>
  let a = 2;
  let color1 = "#008b00"; // Background
  let color2 = "#8b008b"; // Stroke
  let color1Trans = 1;
  let color2Trans = 1;
  $: color1HSL = hexToHSL(color1); // Background
  $: color2HSL = hexToHSL(color2); // Stroke

  $: svgFile =
    "<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 10.583 10.583'><path d='M2.46 0L0 2.458v.375L2.835 0h-.376zm5.29 0l2.833 2.833v-.375L8.125 0h-.376zM5.291 2.458L0 7.75v.375l5.292-5.29 5.29 5.29h.001V7.75L5.292 2.458zm0 5.293l-2.833 2.832h.374l2.459-2.458 2.458 2.458h.374L5.292 7.751z' fill-rule='evenodd' fill='" +
    color2HSL +
    "' stroke='" +
    color2HSL +
    "' stroke-width='" +
    Math.round(a * 20) / 100 +
    "'/><path d='M2.458 0l5.29 5.292-5.29 5.29v.001h.375l5.292-5.291L2.833 0h-.375zM7.75 0l2.833 2.835v-.376L8.125 0H7.75zM0 2.46v.373l2.458 2.459L0 7.75v.374l2.832-2.832L0 2.459zm10.583 5.29L7.75 10.582h.375l2.458-2.458v-.376z' fill='" +
    color2HSL +
    "' fill-rule='evenodd' stroke='" +
    color2HSL +
    "' stroke-width='" +
    Math.round(a * 20) / 100 +
    "'/></svg>";
  $: dataURIOld = 'data:image/svg+xml,' + svgFile;
  $: dataURI = '"data:image/svg+xml,' + svgFile + '"';

  $: cssOutput =
    "background-color: " +
    color1HSL +
    ";\r\nbackground-image: url(" +
    dataURI +
    ")";

  function download() {
    var dl = document.createElement("a");
    document.body.appendChild(dl); // This line makes it work in Firefox.
    dl.setAttribute("href", dataURIOld);
    dl.setAttribute("download", "test.svg");
    dl.click();
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

  .cssCode {
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
    /* font-size: 32em; */
    text-align: center;
    cursor: pointer;
  }

  @media (min-width: 480px) {
  }
</style>

<svelte:head>
  <title>SVG Patterns</title>
</svelte:head>
<div class="page" style={cssOutput}>
  <div class="container">
    {@html svgFile}
    <p />
    <div class="inputs">
      <label>Stroke Size</label>
      <input type="range" bind:value={a} min="0" max="16" />
      <input type="number" bind:value={a} min="0" max="16" />
      <label for="color1">Color 1</label>
      <input
        class="colorPicker"
        type="color"
        id="color1"
        name="color1"
        bind:value={color1} />
      <input type="text" bind:value={color1} />
      <label for="color2">Color 2</label>
      <input
        class="colorPicker"
        type="color"
        id="color2"
        name="color2"
        bind:value={color2} />
      <input type="text" bind:value={color2} />
    </div>
    <code>{svgFile}</code>
    <br />
    <div
      class="download-button"
      on:click={download}
      title="Download as SVG file." >Download SVG</div>
    <br />
    <div class="cssCode" contenteditable>{cssOutput}</div>
  </div>
</div>
