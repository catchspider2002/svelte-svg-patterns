<script context="module">
  export async function preload({ params, query }) {
    const res = await this.fetch(`patterns/${params.slug}.json`);
    const data = await res.json();

    if (res.status === 200) return { post: data };
    else this.error(res.status, data.message);
  }
</script>

<script>
  export let post;
  import constants from "../_constants.js";
  import { onMount } from "svelte";
  import { bind } from "svelte/internal";

  let Pickr, svg;
  $: hide = false;

  onMount(async () => {
    const module = await import("@simonwep/pickr");
    Pickr = module.default;
    const module1 = await import("save-svg-as-png");
    svg = module1.default;
    setPickers();
  });

  function setPickers() {
    const elements = document.getElementsByClassName("pcr-app");
    while (elements.length > 0) elements[0].remove();
    // for (let i = 1; i <= selectedPattern.colors.length; i++) createPicker("color" + i + "Div", i - 1);
    for (let i = 1; i <= 5; i++) {
      document.getElementById("color" + i + "Div").style.display = "block";
      if (i <= selectedPattern.colors.length) {
        createPicker("color" + i + "Div", i - 1);
      } else {
        document.getElementById("color" + i + "Div").style.display = "none";
      }
    }
  }

  let svgPattern = (colors, stroke, scale, spacing, angle, join) => {
    function multiStroke(i) {
      if (mode[0] === "stroke") {
        strokeFill = " stroke = '" + colors[i + 1] + "' fill='none'";
        joinMode = join == 2 ? "stroke-linejoin='round' stroke-linecap='round' " : "stroke-linecap='square' ";
      } else strokeFill = " stroke = 'none' fill='" + colors[i + 1] + "'";

      return (
        "<g transform='translate(" +
        spacing[0] / 2 +
        "," +
        (height * i + spacing[1] * i * 0.5) +
        ")' " +
        joinMode +
        "stroke-width='" +
        stroke +
        "'" +
        strokeFill +
        ">" +
        path +
        "</g>"
      );
    }

    let strokeFill, joinMode, strokeGroup;

    for (let i = 0; i <= colors.length - 2; i++) strokeGroup += strokeGroup + multiStroke(i);

    let patternNew =
      "<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs>" +
      "<pattern id='a' patternUnits='userSpaceOnUse' width='" +
      (width + spacing[0]) +
      "' height='" +
      (height * (colors.length - 1) + spacing[1] * ((colors.length - 1) * 0.5)) +
      "' patternTransform='scale(" +
      scale +
      ") rotate(" +
      angle +
      ")'><rect x='0' y='0' width='100%' height='100%' fill='" +
      colors[0] +
      "'/>" +
      strokeGroup +
      "</pattern></defs><rect width='100%' height='100%' fill='url(#a)'/></svg>";
    return patternNew.replace("#", "%23");
  };

  const colorCount = post.colors,
    maxStroke = post.maxStroke,
    maxScale = post.maxScale,
    maxSpacing = post.maxSpacing,
    width = post.width,
    height = post.height,
    path = post.path,
    mode = post.mode;

  const presetPattern = {
    id: 1,
    colors: ["black", "white"],
    stroke: 0.5,
    scale: 1,
    spacing: [0, 0],
    angle: 0,
    join: 1
  };

  $: selectedPattern = presetPattern;
  $: svgFile = svgPattern(
    selectedPattern.colors,
    selectedPattern.stroke,
    selectedPattern.scale,
    selectedPattern.spacing,
    selectedPattern.angle,
    selectedPattern.join
  );

  let outputWidth = 1080,
    outputHeight = 1080;

  $: cssOutput = 'background-image: url("data:image/svg+xml,' + svgFile + '")';

  function randomColorSets(length) {
    let colorArray = [];
    for (var i = 0; i < length; i++) colorArray.push(constants.randomColor(1));
    return colorArray;
  }

  function resetPattern() {
    selectedPattern = presetPattern;
    setPickers();
  }

  function randomPattern() {
    selectedPattern = {
      id: 5,
      colors: randomColorSets(constants.randomNumber(2, 5)),
      stroke: constants.randomNumber(0.5, maxStroke),
      scale: constants.randomNumber(1, maxScale),
      spacing: [
        maxSpacing[0] > 0 ? constants.randomNumber(0, maxSpacing[0] / 3) : 0,
        maxSpacing[1] > 0 ? constants.randomNumber(0, maxSpacing[1] / 3) : 0
      ],
      angle: constants.randomAngle(),
      join: constants.randomNumber(1, 2)
    };
    setPickers();
  }

  function downloadSVG() {
    let a = document.createElement("a");
    document.body.appendChild(a);
    a.setAttribute("href", "data:image/svg+xml," + svgFile);
    a.setAttribute("download", "pattern.svg");
    a.click();
    a.remove();
  }

  function downloadPNG() {
    document.getElementById("pngOutput").innerHTML = svgFile
      .replace("%23", "#")
      .replace("width='100%' height='100%'", "width='" + outputWidth + "px' height='" + outputHeight + "px'");

    svg.saveSvgAsPng(document.getElementById("patternId"), "pattern.png");
    document.getElementById("pngOutput").innerHTML = "";
  }

  function copyText(text) {
    let textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
  }

  function createPicker(parentDiv, colorId) {
    let colorDiv = document.getElementById(parentDiv);

    if (colorDiv) {
      while (colorDiv.hasChildNodes()) colorDiv.removeChild(colorDiv.firstChild);

      const newElement = document.createElement("div");
      document.getElementById(parentDiv).appendChild(newElement);

      const pickr = Pickr.create({
        el: newElement,
        theme: "monolith",
        autoReposition: true,
        comparison: false,
        default: selectedPattern.colors[colorId],
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
          "rgba(233, 30, 99, 1)",
          "#44337a"
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
        selectedPattern.colors[colorId] = color.toHSLA().toString();
      });
    }
  }
</script>

<style>
  .page {
    /* width: 100%; */
    /* height: 100vh; */
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .patternContainer {
    /*width: 100%;*/
    /* margin: 0 auto 0 auto; */
    padding: 2em;
    background-color: var(--accent-color);
    color: #edf2f7;
    min-height: 100vh;
    display: grid;
  }

  .inputs {
    display: grid;
    grid-template-columns: auto 1fr auto;
    column-gap: 1rem;
    row-gap: 2rem;
    align-items: center;
    padding: 2em 0;
  }

  .colors {
    display: grid;
    grid-template-columns: auto auto auto auto 1fr;
    column-gap: 1rem;
    row-gap: 1rem;
    align-items: center;
    padding: 2em 0;
    grid-column: 2/4;
  }
  .py-05 {
    padding: 0.5em 0;
  }

  .uneditable {
    border: 0 none;
    background-color: var(--secondary-color);
    color: black;
    height: 24px;
    font-size: 0.9em;
    padding: 2px 2px 0 2px;
    text-align: center;
    width: 36px;
    cursor: none;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none;
  }

  .bottomBar {
    display: flex;
    flex-wrap: wrap;
    /* grid-template-columns: auto auto auto; */
    justify-content: center;
    align-items: center;
    row-gap: 1rem;
    position: fixed;
    z-index: 2;
    bottom: 0;
    right: 0;
    background-color: black;
    width: 100%;
    padding: 1em 0;
  }

  .bottomBar * {
    margin: 0 5px;
  }

  .strokeJoin {
    display: grid;
    grid-template-columns: auto auto;
    grid-column: 2/4;
    column-gap: 1rem;
  }

  .text-center {
    text-align: center;
  }

  .exportGrid {
    display: grid;
    grid-template-columns: auto auto auto;
    /* column-gap: 0.5rem; */
    padding: 0.125rem;
    align-items: center;
  }
  .dimensionGrid {
    display: grid;
    grid-template-columns: auto auto auto auto;
    /* column-gap: 0.5rem; */
    padding: 0.125rem;
    align-items: center;
  }

  .mobileBg {
    display: none;
  }

  .controls {
    z-index: 1;
    padding: 2em;
  }
  button {
    max-width: 150px;
  }
  .buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column: 1/4;
    column-gap: 1rem;
    justify-items: center;
  }
  .hideCheckbox {
    display: none;
  }

  .pattern {
    width: 100%;
    height: 60px;
    cursor: pointer;
    display: flex;
    align-items: center;
    margin: 0 auto;
  }
  @media (max-width: 640px) {
    .page {
      grid-template-columns: 1fr;
    }
    .mobileBg {
      display: block;
      position: fixed;
      height: 100%;
      width: 100%;
      left: 0;
      top: 0;
    }
    .hideCheckbox {
      display: block;
    }
    .controls {
      background-color: var(--accent-color);
      padding: 2rem;
    }
    .preview {
      display: none;
    }
  }
</style>

<svelte:head>
  <title>{post.title}</title>
</svelte:head>

<div class="page">
  <div class="patternContainer justify-center items-center">
    <div class="mobileBg" style={cssOutput} />

    <!-- <div class="controls" style="visibility: {hide ? true : 'hidden'}"> -->
    <div class="controls" style="visibility: {hide ? 'hidden' : 'visible'}">
      <div>{post.title}</div>

      <div
        id="ax"
        class="pattern"
        style={'background-image: url("data:image/svg+xml,' + svgPattern(presetPattern.colors, presetPattern.stroke, presetPattern.scale, presetPattern.spacing, presetPattern.angle, presetPattern.join) + '"' + ')'} />

      <div class="inputs">
        <label for="scale">Scale</label>
        <input id="scale" type="range" bind:value={selectedPattern.scale} min="1" max={maxScale} />
        <input class="uneditable" bind:value={selectedPattern.scale} readonly />
        {#if mode[0] === 'stroke'}
          <label for="stroke">Stroke</label>
          <input id="stroke" type="range" bind:value={selectedPattern.stroke} min="0.5" max={maxStroke} step="0.5" />
          <input class="uneditable" bind:value={selectedPattern.stroke} readonly />
          <label>Join</label>
          <div class="strokeJoin">
            <label>
              <input type="radio" bind:group={selectedPattern.join} value={1} />
              Square
            </label>
            <label>
              <input type="radio" bind:group={selectedPattern.join} value={2} />
              Rounded
            </label>
          </div>
        {/if}
        {#if maxSpacing[0] > 0}
          <label for="hspacing">Horizontal Spacing</label>
          <input id="hspacing" type="range" bind:value={selectedPattern.spacing[0]} min="0" max={maxSpacing[0]} step="0.5" />
          <input class="uneditable" bind:value={selectedPattern.spacing[0]} readonly />
        {/if}
        {#if maxSpacing[1] > 0}
          <label for="vspacing">Vertical Spacing</label>
          <input id="vspacing" type="range" bind:value={selectedPattern.spacing[1]} min="0" max={maxSpacing[1]} step="0.5" />
          <input class="uneditable" bind:value={selectedPattern.spacing[1]} readonly />
        {/if}
        <label for="angle">Angle</label>
        <input id="angle" type="range" bind:value={selectedPattern.angle} min="0" max="180" step="5" />
        <input class="uneditable" bind:value={selectedPattern.angle} readonly />
        <label>Colors</label>
        <div class="colors py-05">
          {#each { length: 5 } as _, i}
            <div id="color{i + 1}Div" />
          {/each}
        </div>
        <div class="buttons">
          <button title="Random" on:click={randomPattern}>Inspire Me</button>
          <button title="Reset" on:click={resetPattern}>Reset</button>
        </div>
      </div>
    </div>
    <div class="bottomBar">
      <div class="exportGrid">
        <span>Copy</span>
        <button on:click={copyText(cssOutput)} title="CSS">CSS</button>
        <button on:click={copyText(svgFile)} title="SVG">SVG</button>
      </div>
      <div class="exportGrid">
        <span>Download</span>
        <button on:click={downloadSVG} title="Download as SVG file">SVG</button>
        <button on:click={downloadPNG} title="Download as PNG file">PNG</button>
      </div>
      <div class="dimensionGrid">
        <label for="width" class="text-center">Width</label>
        <input
          id="width"
          type="number"
          bind:value={outputWidth}
          min="0"
          max="9999"
          on:input={e => {
            if (e.target.value.length > 4) e.target.value = e.target.value.slice(0, 4);
          }} />
        <label for="height" class="text-center">Height</label>
        <input
          id="height"
          type="number"
          bind:value={outputHeight}
          min="0"
          max="9999"
          on:input={e => {
            if (e.target.value.length > 4) e.target.value = e.target.value.slice(0, 4);
          }} />
      </div>
      <label class="hideCheckbox">
        <input type="checkbox" bind:checked={hide} />
        <!-- <input type="checkbox" /> -->
        Hide Controls
      </label>
    </div>
  </div>
  <div class="preview" style={cssOutput}>
    <div id="pngOutput" />
  </div>
</div>
