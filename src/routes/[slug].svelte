<script context="module">
  export async function preload({ params, query }) {
    const res = await this.fetch(`${params.slug}.json`);
    const data = await res.json();

    if (res.status === 200) return { post: data };
    else this.error(res.status, data.message);
  }
</script>

<script>
  export let post;
  import constants from "./_constants.js";
  import { onMount } from "svelte";

  import { themeStore } from "./stores.js";

  // import { bind } from "svelte/internal";
  let w;
  let website = "https://pattern.monster";

  // import { fly, fade, slide } from "svelte/transition";
  let changing = false;

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
      // if (i <= selectedPattern.colors.length) createPicker("color" + i + "Div", i - 1);
      if (i <= post.path.split("~").length + 1) createPicker("color" + i + "Div", i - 1);
      else document.getElementById("color" + i + "Div").style.display = "none";
    }
  }

  // let svgPattern = (colors, stroke, scale, spacing, angle, join) => {
  //   function multiStroke(i) {
  //     if (mode === "stroke-join") {
  //       strokeFill = " stroke='" + colors[i + 1] + "' fill='none'";
  //       joinMode = join == 2 ? "stroke-linejoin='round' stroke-linecap='round' " : "stroke-linecap='square' ";
  //     } else if (mode === "stroke") {
  //       strokeFill = " stroke='" + colors[i + 1] + "' fill='none'";
  //     } else strokeFill = " stroke='none' fill='" + colors[i + 1] + "'";

  //     return (
  //       "<g transform='translate(" +
  //       spacing[0] / 2 +
  //       "," +
  //       (height * i + spacing[1] * i * 0.5) +
  //       ")' " +
  //       joinMode +
  //       "stroke-width='" +
  //       stroke +
  //       "'" +
  //       strokeFill +
  //       ">" +
  //       path +
  //       "</g>"
  //     );
  //   }

  //   let strokeFill = "",
  //     joinMode = "",
  //     strokeGroup = "";

  //   for (let i = 0; i <= colors.length - 2; i++) strokeGroup += strokeGroup + multiStroke(i);

  //   let patternNew =
  //     "<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs>" +
  //     "<pattern id='a' patternUnits='userSpaceOnUse' width='" +
  //     (width + spacing[0]) +
  //     "' height='" +
  //     // (height * (colors.length - 1) + spacing[1] * ((colors.length - 1) * 0.5)) +
  //     (height * (colors.length - 1) + spacing[1] * (colors.length - 1)) +
  //     "' patternTransform='scale(" +
  //     scale +
  //     ") rotate(" +
  //     angle +
  //     ")'><rect x='0' y='0' width='100%' height='100%' fill='" +
  //     colors[0] +
  //     "'/>" +
  //     strokeGroup +
  //     "</pattern></defs><rect width='100%' height='100%' fill='url(#a)'/></svg>";
  //   return patternNew.replace("#", "%23");
  // };

  let svgPattern = (colors, stroke, scale, spacing, angle, join) => {
    function multiStroke(i) {
      if (mode === "stroke-join") {
        strokeFill = " stroke='" + colors[i + 1] + "' fill='none'";
        joinMode = join == 2 ? "stroke-linejoin='round' stroke-linecap='round' " : "stroke-linecap='square' ";
      } else if (mode === "stroke") {
        strokeFill = " stroke='" + colors[i + 1] + "' fill='none'";
      } else strokeFill = " stroke='none' fill='" + colors[i + 1] + "'";

      return (
        "<g transform='translate(" +
        spacing[0] / 2 +
        ",0)' " +
        joinMode +
        "stroke-width='" +
        stroke +
        "'" +
        strokeFill +
        ">" +
        path.split("~")[i] +
        "</g>"
      );
    }

    let strokeFill = "",
      joinMode = "",
      strokeGroup = "";

    for (let i = 0; i < colorCount - 1; i++) strokeGroup += multiStroke(i);

    let patternNew =
      "<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs>" +
      "<pattern id='a' patternUnits='userSpaceOnUse' width='" +
      (width + spacing[0]) +
      "' height='" +
      // (height * (colors.length - 1) + spacing[1] * ((colors.length - 1) * 0.5)) +
      (height + spacing[1]) +
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

  const colorCount = post.path.split("~").length + 1,
    maxStroke = post.maxStroke,
    maxScale = post.maxScale,
    maxSpacing = post.maxSpacing,
    width = post.width,
    height = post.height,
    path = post.path,
    mode = post.mode;

  const presetPattern = {
    id: 1,
    colors: [
      $themeStore === "light" ? "white" : "rgb(42,42,48)",
      $themeStore === "light" ? "rgb(128,90,213)" : "rgb(236,201,75)",
      "rgba(244, 67, 54, 1)",
    ],
    stroke: 1,
    scale: 2,
    spacing: [0, 0],
    angle: 0,
    join: 1,
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
    selectedPattern.scale = 2;
    selectedPattern.stroke = 1;
    selectedPattern.spacing = [0, 0];
    selectedPattern.join = 1;
    selectedPattern.angle = 0;
    setPickers();
  }

  function randomPattern() {
    let randomSpacing = constants.randomNumber(0, maxSpacing[0] / 3);
    selectedPattern = {
      id: 5,
      colors: randomColorSets(colorCount),
      // colors: randomColorSets(2),
      stroke: constants.randomNumber(0.5, maxStroke),
      scale: constants.randomNumber(2, maxScale / 3),
      spacing: [maxSpacing[0] > 0 ? randomSpacing : 0, maxSpacing[1] > 0 ? randomSpacing : 0],
      angle: constants.randomAngle(),
      join: constants.randomNumber(1, 2),
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

  function copyText(text, buttonType, id) {
    let textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
    // console.log(id);
    document.getElementById(id).textContent = "Copied!";
    setTimeout(function () {
      document.getElementById(id).textContent = buttonType;
    }, 1500);
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
          "rgba(236, 201, 75, 1)",
          "rgba(128, 90, 213, 1)",
          "rgba(255, 255, 255, 1)",
          "rgba(0, 0, 0, 1)",
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
            clear: false,
          },
        },
      });
      pickr.on("change", (color, instance) => {
        selectedPattern.colors[colorId] = color.toHSLA().toString(0);
      });
    }
  }
</script>

<style>
  .page {
    display: grid;
  }
  .hidden {
    /* visibility: hidden; */
    display: none;
  }

  .grid {
    display: grid;
    grid-auto-flow: column;
    gap: 0.5em;
  }

  .patternContainer {
    background-color: var(--pattern-bg);
    color: var(--secondary-text-color);
    display: grid;
  }

  .bottomBar {
    background-color: var(--accent-color);
    color: var(--secondary-text-color);
  }

  .inputs {
    display: grid;
    grid-template-columns: 1fr auto 1fr 1fr;
    gap: 2em;
    align-items: center;
    padding: 2em 0;
  }

  .leftColumn {
    grid-column: 1/3;
  }

  .rightColumn {
    grid-column: 3/5;
    grid-template-columns: 1fr auto;
  }

  .colors {
    display: grid;
    grid-template-columns: auto auto auto auto 1fr;
    gap: 1em;
    align-items: center;
    padding: 2em 0;
    /* grid-column: 2/4; */
  }
  .py-05 {
    padding: 0.5em 0;
  }

  .uneditable {
    border: 0 none;
    background-color: var(--accent-text);
    color: var(--accent-text-color);
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
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 1em;
    grid-row-start: 2;
    grid-row-end: 3;
    z-index: 2;
    background-color: var(--card-bg);
    width: 100%;
    color: var(--secondary-text-color);
  }

  .strokeJoin {
    display: grid;
    grid-template-columns: auto auto;
    gap: 1em;
  }

  .exportGrid,
  .downloadGrid,
  .dimensionGrid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0.5em;
    align-items: center;
    justify-items: center;
  }

  .mobileBg {
    display: none;
  }

  .controls {
    z-index: 1;
    padding: 2em;
  }
  button {
    min-width: 6em;
    max-width: 10em;
    background-color: var(--accent-text);
    border: 0.125em solid var(--accent-text);
    color: var(--accent-text-color);
  }
  button:hover,
  button:focus {
    background-color: var(--accent-hover);
  }
  #resetButton1,
  #resetButton2,
  #resetButton3 {
    border: 0.125em solid var(--accent-text);
    color: var(--accent-text);
  }
  #resetButton1 {
    background-color: var(--pattern-bg);
  }
  #resetButton2 {
    background-color: var(--pattern-bg);
  }
  #resetButton3 {
    background-color: var(--card-bg);
  }
  #resetButton1:hover,
  #resetButton2:hover,
  #resetButton3:hover,
  #resetButton1:focus,
  #resetButton2:focus,
  #resetButton3:focus {
    border: 0.125em solid var(--accent-hover);
    color: var(--accent-hover);
  }
  .buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column: 1/5;
    gap: 1em;
    justify-items: center;
  }

  .exportBar .exportGrid,
  .exportBar .downloadGrid,
  .exportBar .dimensionGrid {
    display: none;
  }

  .bottomBar .buttons {
    display: none;
  }
  .preview {
    display: grid;
    place-content: center;
  }
  .preview .buttons {
    gap: 4em;
  }

  hr {
    display: none;
  }

  h1 {
    font-size: 2em;
    /* text-align: center; */
    /* padding: 0.5em; */
    color: var(--secondary-text-color);
  }

  @media (max-width: 768px) {
    .patternContainer {
      padding: 1em;
      margin-top: -1em;
      margin-bottom: 2em;
    }
    .mobileBg {
      display: block;
      position: fixed;
      min-height: 100%;
      width: 100%;
      left: 0;
    }
    .bottomBar {
      position: fixed;
      bottom: 0;
      right: 0;
    }
    .exportBar {
      padding-top: 2em;
    }

    .bottomBar .exportGrid,
    .bottomBar .downloadGrid,
    .bottomBar .dimensionGrid {
      display: none;
    }
    .exportBar .exportGrid,
    .exportBar .downloadGrid,
    .exportBar .dimensionGrid {
      display: grid;
      padding: 0.5em 0;
    }

    .buttons {
      display: none;
    }

    .bottomBar .buttons {
      display: grid;
    }

    .controls {
      background-color: var(--pattern-bg);
      padding: 2rem;
      margin: 1rem 0 2.5rem;
      border-radius: var(--border-radius);
    }
    .preview {
      display: none;
    }

    hr {
      display: block;
      border: 0;
      height: 1px;
      background: var(--secondary-text-color);
      background-image: linear-gradient(to right, var(--pattern-bg), var(--secondary-text-color), var(--pattern-bg));
      /* background: rgba(var(--text-color), 0.8);
  background-image: linear-gradient(to right, rgba(var(--bg-color), 0.8), rgba(var(--text-color), 0.8), rgba(var(--bg-color), 0.8)); */
    }
  }
  @media (max-width: 408px) {
    .controls {
      margin: 1rem 0 5rem;
    }
    .inputs {
      padding: 1em 0;
      gap: 1em;
    }

    .leftColumn {
      grid-column: 1/5;
      padding-top: 1em;
    }

    .rightColumn {
      grid-column: 1/5;
      grid-template-columns: 1fr auto;
    }

    .strokeJoin {
      grid-template-columns: auto auto;
    }
    .exportBar .exportGrid,
    .exportBar .downloadGrid,
    .exportBar .dimensionGrid {
      grid-template-columns: 1fr 1fr;
      padding: 0.5em 0;
    }
    .exportBar .exportGrid span,
    .exportBar .downloadGrid span,
    .exportBar .dimensionGrid span {
      grid-column: 1/3;
    }
  }
</style>

<svelte:head>
  <title>{post.title} - Pattern Monster</title>
  <link rel="canonical" href="{website}/{post.slug}" />
  <meta
    name="description"
    content="{post.slug} - Pattern generator to create repeatable SVG patterns.  Perfect for website backgrounds, apparel, branding, packaging design and more." />
  <meta name="keywords" content={post.slug} />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="{website}/{post.slug}" />
  <meta property="og:title" content={post.title} />
  <meta property="og:description" content={post.slug} />
  <meta property="og:image" content="{website}/social/{post.slug}.png" />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="{website}/{post.slug}" />
  <meta property="twitter:title" content={post.title} />
  <meta property="twitter:description" content={post.slug} />
  <meta name="twitter:image" content="{website}/TwitterBG2.png" />
  <!-- <meta property="twitter:image" content="{website}/social/{post.slug}.png" /> -->
</svelte:head>
<div bind:clientWidth={w} class="page" style="grid-template-columns: {hide ? '0 1fr' : w <= 768 ? '1fr' : '1fr 1fr'}">
  <div class="patternContainer justify-center items-center">
    <div class="mobileBg" style={cssOutput} />

    <div class="controls" style="display: {hide ? 'none' : 'block'}; opacity: {(w <= 768) & changing ? '0.75' : '1'}">
      <h1>{post.title}</h1>
      <div class="inputs">
        <label class="leftColumn" for="scale">Scale</label>
        <div class="grid rightColumn">
          <input
            id="scale"
            type="range"
            bind:value={selectedPattern.scale}
            min="1"
            max={maxScale}
            on:input={() => (changing = true)}
            on:change={() => (changing = false)} />
          <input class="uneditable hidden" bind:value={selectedPattern.scale} readonly />
        </div>
        {#if mode === 'stroke-join' || mode === 'stroke'}
          <label class="leftColumn" for="stroke">Stroke</label>
          <div class="grid rightColumn">
            <input
              id="stroke"
              type="range"
              bind:value={selectedPattern.stroke}
              min="0.5"
              max={maxStroke}
              step="0.5"
              on:input={() => (changing = true)}
              on:change={() => (changing = false)} />
            <input class="uneditable hidden" bind:value={selectedPattern.stroke} readonly />
          </div>
        {/if}
        {#if mode === 'stroke-join'}
          <label class="leftColumn">Join</label>
          <div class="rightColumn strokeJoin">
            <label> <input type="radio" bind:group={selectedPattern.join} value={1} /> Square </label>
            <label> <input type="radio" bind:group={selectedPattern.join} value={2} /> Rounded </label>
          </div>
        {/if}
        {#if maxSpacing[0] > 0}
          <label class="leftColumn" for="hspacing">Horizontal Spacing</label>
          <div class="grid rightColumn">
            <input
              id="hspacing"
              type="range"
              bind:value={selectedPattern.spacing[0]}
              min="0"
              max={maxSpacing[0]}
              step="0.5"
              on:input={() => (changing = true)}
              on:change={() => (changing = false)} />
            <input class="uneditable hidden" bind:value={selectedPattern.spacing[0]} readonly />
          </div>
        {/if}
        {#if maxSpacing[1] > 0}
          <label class="leftColumn" for="vspacing">Vertical Spacing</label>
          <div class="grid rightColumn">
            <input
              id="vspacing"
              type="range"
              bind:value={selectedPattern.spacing[1]}
              min="0"
              max={maxSpacing[1]}
              step="0.5"
              on:input={() => (changing = true)}
              on:change={() => (changing = false)} />
            <input class="uneditable hidden" bind:value={selectedPattern.spacing[1]} readonly />
          </div>
        {/if}
        <label class="leftColumn" for="angle">Angle</label>
        <div class="grid rightColumn">
          <input
            id="angle"
            type="range"
            bind:value={selectedPattern.angle}
            min="0"
            max="180"
            step="5"
            on:input={() => (changing = true)}
            on:change={() => (changing = false)} />
          <input class="uneditable" bind:value={selectedPattern.angle} readonly />
        </div>
        <label class="leftColumn">Colors</label>
        <div class="rightColumn colors py-05">
          {#each { length: 5 } as _, i}
            <div id="color{i + 1}Div" />
          {/each}
        </div>
        <div class="buttons">
          <button title="Random" on:click={randomPattern}>Inspire Me</button>
          <button id="resetButton1" title="Reset" on:click={resetPattern}>Reset</button>
        </div>
      </div>

      <hr />

      <div class="exportBar">
        <div class="exportGrid">
          <span>Copy</span>
          <button id="cssExport" on:click={copyText(cssOutput, 'CSS', this.id)} title="Copy CSS">CSS</button>
          <button id="svgExport" on:click={copyText(svgFile, 'SVG', this.id)} title="Copy SVG">SVG</button>
        </div>
        <div class="downloadGrid">
          <span>Download</span>
          <button on:click={downloadSVG} title="Download as SVG file">SVG</button>
          <button on:click={downloadPNG} title="Download as PNG file">PNG</button>
        </div>
        <div class="dimensionGrid">
          <span>Dimensions</span>
          <input
            id="width"
            type="number"
            title="Width"
            placeholder="Width"
            bind:value={outputWidth}
            min="0"
            max="9999"
            on:input={(e) => {
              if (e.target.value.length > 4) e.target.value = e.target.value.slice(0, 4);
            }} />
          <input
            id="height"
            type="number"
            title="Height"
            placeholder="Height"
            bind:value={outputHeight}
            min="0"
            max="9999"
            on:input={(e) => {
              if (e.target.value.length > 4) e.target.value = e.target.value.slice(0, 4);
            }} />
        </div>
      </div>
    </div>
  </div>
  <div class="preview" style={cssOutput}>
    <div id="pngOutput" />

    <div class="buttons" style="display: {hide ? 'grid' : 'none'}">
      <button title="Random" on:click={randomPattern}>Inspire Me</button>
      <button id="resetButton2" title="Reset" on:click={resetPattern}>Reset</button>
    </div>
  </div>
</div>

<div class="bottomBar">
  <div class="exportGrid">
    <span>Copy</span>
    <button id="cssBottom" on:click={copyText(cssOutput, 'CSS', this.id)} title="Copy CSS">CSS</button>
    <button id="svgBottom" on:click={copyText(svgFile, 'SVG', this.id)} title="Copy SVG">SVG</button>
  </div>
  <div class="downloadGrid">
    <span>Download</span>
    <button on:click={downloadSVG} title="Download as SVG file">SVG</button>
    <button on:click={downloadPNG} title="Download as PNG file">PNG</button>
  </div>
  <div class="dimensionGrid">
    <span>Dimensions</span>
    <input
      id="width"
      type="number"
      title="Width"
      placeholder="Width"
      bind:value={outputWidth}
      min="0"
      max="9999"
      on:input={(e) => {
        if (e.target.value.length > 4) e.target.value = e.target.value.slice(0, 4);
      }} />
    <input
      id="height"
      type="number"
      title="Height"
      placeholder="Height"
      bind:value={outputHeight}
      min="0"
      max="9999"
      on:input={(e) => {
        if (e.target.value.length > 4) e.target.value = e.target.value.slice(0, 4);
      }} />
  </div>
  <div class="buttons">
    <button title="Random" on:click={randomPattern}>Inspire Me</button>
    <button id="resetButton3" title="Reset" on:click={resetPattern}>Reset</button>
  </div>
  <label class="hideCheckbox"> <input type="checkbox" bind:checked={hide} /> Hide UI </label>
</div>
