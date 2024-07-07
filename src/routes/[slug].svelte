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
  console.log(post)
  import lang from "./_lang.js";
  let strings = lang.strings;

  import { onMount } from "svelte";
  import { themeStore } from "./stores.js";

  let w;

  import Constants from "./_constants.js";
  import Values from "./_values.js";
  let page = post.slug;
  let { title, url, keywords, desc, image, versions } = Constants.pageDetails(page);

  title = post.title + " - Pattern Monster | " + strings.title;
  keywords = post.tags + ", random, " + strings.keywords;
  desc = post.title + " - " + strings.description + " " + strings.description3;

  let changing = false;

  let Pickr, svg;
  $: hide = false;

  let defaultWidth = "1080",
    defaultHeight = "1080";

  onMount(async () => {
    const module = await import("@simonwep/pickr");
    Pickr = module.default;
    const module1 = await import("save-svg-as-png");
    svg = module1.default;
    setPickers();

    defaultHeight = localStorage.getItem("defaultHeight");

    if (!defaultHeight) {
      defaultHeight = "1080";

      localStorage.setItem("defaultHeight", defaultHeight);
    }
    defaultWidth = localStorage.getItem("defaultWidth");

    if (!defaultWidth) {
      defaultWidth = "1080";

      localStorage.setItem("defaultWidth", defaultWidth);
    }
  });

  function setPickers() {
    const elements = document.getElementsByClassName("pcr-app");
    while (elements.length > 0) elements[0].remove();
    // for (let i = 1; i <= selectedPattern.colors.length; i++) createPicker("color" + i + "Div", i - 1);
    for (let i = 1; i <= 5; i++) {
      document.getElementById("color" + i + "Div").style.visibility = "visible";
      // if (i <= selectedPattern.colors.length) createPicker("color" + i + "Div", i - 1);
      // if (i <= post.path.split("~").length + 1) createPicker("color" + i + "Div", i - 1);
      if (i <= selectedPattern.colorCounts) createPicker("color" + i + "Div", i - 1);
      else document.getElementById("color" + i + "Div").style.visibility = "hidden";
    }
  }

  let svgPattern = (colors, colorCounts, stroke, scale, spacing, angle, join, moveLeft, moveTop) => {
    function multiStroke(i) {
      let defColor = colors[i + 1];
      if ((vHeight === 0) & (maxColors > 2)) {
        // if(colorCounts !== maxColors) defColor = colors[1];
        if ((colorCounts === 3) & (maxColors === 4) & (i === 2)) defColor = colors[1];
        else if ((colorCounts === 4) & (maxColors === 5) & (i === 3)) defColor = colors[1];
        else if ((colorCounts === 3) & (maxColors === 5) & (i === 3)) defColor = colors[1];
        else if ((colorCounts === 3) & (maxColors === 5) & (i === 2)) defColor = colors[1];
        else if (colorCounts === 2) defColor = colors[1];
        // console.log("colorCounts: " + colorCounts + ", maxColors: " + maxColors + ", defColor: " + defColor);
        // console.log("colors: " + colors);
      } 

      if (mode === "stroke-join") {
        strokeFill = " stroke='" + defColor + "' fill='none'";
        joinMode = join == 2 ? "stroke-linejoin='round' stroke-linecap='round' " : "stroke-linecap='square' ";
      } else if (mode === "stroke") {
        strokeFill = " stroke='" + defColor + "' fill='none'";
      } else strokeFill = " stroke='none' fill='" + defColor + "'";

      // console.log("vHeight: " + vHeight + "; colorCount: " + colorCount + "; maxColors: " + maxColors);
      return path
        .split("~")
        [i].replace("/>", " transform='translate(" + spacing[0] / 2 + ",0)' " + joinMode + "stroke-width='" + stroke + "'" + strokeFill + "/>")
        .replace("transform='translate(0,0)' ", " ");
    }

    let strokeFill = "",
      joinMode = "",
      strokeGroup = "";

    if ((vHeight === 0) & (maxColors > 2)) {
      for (let i = 0; i < maxColors - 1; i++) strokeGroup += multiStroke(i);
    } else {
      for (let i = 0; i < colorCounts - 1; i++) strokeGroup += multiStroke(i);
    }

    let patternNew =
      "<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs>" +
      "<pattern id='a' patternUnits='userSpaceOnUse' width='" +
      (width + spacing[0]) +
      "' height='" +
      // (height * (colors.length - 1) + spacing[1] * ((colors.length - 1) * 0.5)) +
      (height - vHeight * (maxColors - colorCounts) + spacing[1]) +
      "' patternTransform='scale(" +
      scale +
      ") rotate(" +
      angle +
      ")'><rect x='0' y='0' width='100%' height='100%' fill='" +
      colors[0] +
      "'/>" +
      strokeGroup +
      "</pattern></defs><rect width='800%' height='800%' transform='translate(" +
      scale * moveLeft +
      "," +
      scale * moveTop +
      ")' fill='url(#a)'/></svg>";
    // return patternNew
    return patternNew.replace("#", "%23");
  };

  let downloadPattern = (colors, colorCounts, stroke, scale, spacing, angle, join, moveLeft, moveTop) => {
    function multiStroke(i) {
      let defColor = colors[i + 1];
      if ((vHeight === 0) & (maxColors > 2)) {
        // if(colorCounts !== maxColors) defColor = colors[1];
        if ((colorCounts === 3) & (maxColors === 4) & (i === 2)) defColor = colors[1];
        else if ((colorCounts === 4) & (maxColors === 5) & (i === 3)) defColor = colors[1];
        else if ((colorCounts === 3) & (maxColors === 5) & (i === 3)) defColor = colors[1];
        else if ((colorCounts === 3) & (maxColors === 5) & (i === 2)) defColor = colors[1];
        else if (colorCounts === 2) defColor = colors[1];
        // console.log("colorCounts: " + colorCounts + ", maxColors: " + maxColors + ", defColor: " + defColor);
        // console.log("colors: " + colors);
      }

      if (mode === "stroke-join") {
        strokeFill = " stroke='" + defColor + "' fill='none'";
        joinMode = join == 2 ? "stroke-linejoin='round' stroke-linecap='round' " : "stroke-linecap='square' ";
      } else if (mode === "stroke") {
        strokeFill = " stroke='" + defColor + "' fill='none'";
      } else strokeFill = " stroke='none' fill='" + defColor + "'";

      // console.log("vHeight: " + vHeight + "; colorCount: " + colorCount + "; maxColors: " + maxColors);
      return path
        .split("~")
        [i].replace("/>", " transform='translate(" + spacing[0] / 2 + ",0)' " + joinMode + "stroke-width='" + stroke + "'" + strokeFill + "/>")
        .replace("transform='translate(0,0)' ", " ");
    }

    let strokeFill = "",
      joinMode = "",
      strokeGroup = "";

    if ((vHeight === 0) & (maxColors > 2)) {
      for (let i = 0; i < maxColors - 1; i++) strokeGroup += multiStroke(i);
    } else {
      for (let i = 0; i < colorCounts - 1; i++) strokeGroup += multiStroke(i);
    }

    let patternNew =
      "<svg xmlns='http://www.w3.org/2000/svg' width='" +
      (width + spacing[0]) +
      "' height='" +
      // (height * (colors.length - 1) + spacing[1] * ((colors.length - 1) * 0.5)) +
      (height - vHeight * (maxColors - colorCounts) + spacing[1]) +
      "' transform='scale(" +
      scale +
      ")'><rect x='0' y='0' width='100%' height='100%' fill='" +
      colors[0] +
      "'/>" +
      strokeGroup +
      "</svg>";
    return patternNew.replace("#", "%23");
  };

  let colorCount = post.path.split("~").length + 1;
  const maxColors = post.path.split("~").length + 1,
    maxStroke = post.maxStroke,
    maxScale = post.maxScale,
    maxSpacing = post.maxSpacing,
    width = post.width,
    height = post.height,
    vHeight = post.vHeight,
    path = post.path,
    mode = post.mode;

  let lightColors = [
    "hsla(0,0%,100%,1)",
    "hsla(258.5,59.4%,59.4%,1)",
    "hsla(339.6,82.2%,51.6%,1)",
    "hsla(198.7,97.6%,48.4%,1)",
    "hsla(47,80.9%,61%,1)",
  ];
  let darkColors = [
    "hsla(240,6.7%,17.6%,1)",
    "hsla(47,80.9%,61%,1)",
    "hsla(4.1,89.6%,58.4%,1)",
    "hsla(186.8,100%,41.6%,1)",
    "hsla(258.5,59.4%,59.4%,1)",
  ];

  const presetPattern = {
    id: 1,
    colors: $themeStore === "light" ? lightColors : darkColors,
    colorCounts: colorCount,
    stroke: 1,
    scale: 2,
    spacing: [0, 0],
    angle: 0,
    join: 1,
    moveLeft: 0,
    moveTop: 0,
  };

  $: selectedPattern = presetPattern;
  $: svgFile = svgPattern(
    selectedPattern.colors,
    selectedPattern.colorCounts,
    selectedPattern.stroke,
    selectedPattern.scale,
    selectedPattern.spacing,
    selectedPattern.angle,
    selectedPattern.join,
    selectedPattern.moveLeft,
    selectedPattern.moveTop
  );
  $: svgDownload = downloadPattern(
    selectedPattern.colors,
    selectedPattern.colorCounts,
    selectedPattern.stroke,
    selectedPattern.scale,
    selectedPattern.spacing,
    selectedPattern.angle,
    selectedPattern.join,
    selectedPattern.moveLeft,
    selectedPattern.moveTop
  );

  $: cssOutput = 'background-image: url("data:image/svg+xml,' + svgFile + '")';

  function randomColorSets(length) {
    let colorArray = Values.colorPalettes[Values.randomNumber(0, Values.colorPalettes.length - 1)];

    for (let i = colorArray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = colorArray[i];
      colorArray[i] = colorArray[j];
      colorArray[j] = temp;
    }
    return colorArray;
  }

  function resetPattern() {
    selectedPattern = presetPattern;

    selectedPattern.colorCounts = colorCount;
    selectedPattern.scale = 2;
    selectedPattern.stroke = 1;
    selectedPattern.spacing = [0, 0];
    selectedPattern.join = 1;
    selectedPattern.angle = 0;
    setPickers();
  }

  function randomPattern() {
    let randomSpacing = Values.randomNumber(0, maxSpacing[0] / 3);
    selectedPattern = {
      id: 5,
      colors: randomColorSets(selectedPattern.colorCounts),
      // colors: randomColorSets(2),
      colorCounts: selectedPattern.colorCounts,
      stroke: Values.randomNumber(0.5, maxStroke),
      scale: Values.randomNumber(2, maxScale / 3),
      spacing: [maxSpacing[0] > 0 ? randomSpacing : 0, maxSpacing[1] > 0 ? randomSpacing : 0],
      angle: Values.randomAngle(),
      join: Values.randomNumber(1, 2),
      moveLeft: 0,
      moveTop: 0,
    };
    setPickers();
  }

  function downloadSVG() {
    let a = document.createElement("a");
    document.body.appendChild(a);
    a.setAttribute("href", "data:image/svg+xml," + svgDownload);
    a.setAttribute("download", "pattern.svg");
    a.click();
    a.remove();
  }

  function downloadPNG() {
    document.getElementById("pngOutput").innerHTML = svgFile
      .replace("%23", "#")
      .replace("width='100%' height='100%'", "width='" + defaultWidth + "px' height='" + defaultHeight + "px'");

    let fileName = "pattern_" + post.slug + "_" + selectedPattern.stroke + "_" + selectedPattern.scale + "_";
    fileName += selectedPattern.spacing.toString().replace(",", "-") + "_" + selectedPattern.angle + "_" + selectedPattern.join + "_";

    for (let i = 0; i < selectedPattern.colorCounts; i++) {
      fileName += "_" + Values.HSLAToHexA(selectedPattern.colors[i]);
    }
    // console.log(selectedPattern.scale + "~~~~~" + fileName);
    // svg.saveSvgAsPng(document.getElementById("patternId"), "pattern.png");
    svg.saveSvgAsPng(document.getElementById("patternId"), fileName + ".png");
    document.getElementById("pngOutput").innerHTML = "";
  }

  function copyText(text, buttonType, id) {
    let textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
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
          "hsla(4.1,89.6%,58.4%,1)",
          "hsla(339.4,70.4%,60.2%,1)",
          "hsla(291.2,63.7%,42.2%,1)",
          "hsla(258.5,59.4%,59.4%,1)", // 4
          "hsla(230.8,48.4%,47.8%,1)",
          "hsla(198.7,97.6%,48.4%,1)",
          "hsla(186.8,100%,41.6%,1)", // 7
          "hsla(174.4,100%,29.4%,1)",
          "hsla(122.4,39.4%,49.2%,1)",
          "hsla(87.8,50.2%,52.7%,1)",
          "hsla(65.5,70%,54.3%,1)", // 11
          "hsla(53.9,100%,61.6%,1)",
          "hsla(47,80.9%,61%,1)",
          "hsla(32.8,89.9%,64.9%,1)", // 14
          "hsla(0,0%,100%,1)",
          "hsla(0,0%,0%,1)",
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

<svelte:head>
  <title>{title}</title>
  <link rel="canonical" href={url} />
  {#if versions}
    {#each versions as version}
      <link rel="alternate" href={version.website} hreflang={version.lang} />
    {/each}
  {/if}
  <meta name="description" content={desc} />
  <meta name="keywords" content={keywords} />

  <!-- Open Graph / Facebook -->
  <meta property="og:url" content={url} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={desc} />
  <meta property="og:image" content={image} />

  <!-- Twitter -->
  <meta name="twitter:url" content={url} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={desc} />
  <meta name="twitter:image" content={image} />
  <meta name="twitter:image:src" content={image} />
  <meta name="twitter:image:alt" content={title} />
</svelte:head>

<div bind:clientWidth={w} class="page" style="grid-template-columns: {hide ? '0 1fr' : w <= 768 ? '1fr' : '1fr 1fr'}">
  <div class="patternContainer justify-center items-center">
    <div class="mobileBg" style={cssOutput} />

    <div class="controls" style="display: {hide ? 'none' : 'block'}; opacity: {(w <= 768) & changing ? '0.75' : '1'}">
      <h1>{post.title}</h1>
      <div class="inputs">
        <label class="leftColumn" for="scale">{strings.zoom}</label>
        <div class="grid rightColumn">
          <input
            id="scale"
            type="range"
            bind:value={selectedPattern.scale}
            min="1"
            max={maxScale}
            on:input={() => (changing = true)}
            on:change={() => (changing = false)}
          />
          <input class="uneditable hidden" bind:value={selectedPattern.scale} readonly />
        </div>
        <label class="leftColumn" for="scale">{strings.hPosition}</label>
        <div class="grid rightColumn">
          <input
            id="moveLeft"
            type="range"
            bind:value={selectedPattern.moveLeft}
            min={Math.round(width * -2)}
            max="0"
            step="1"
            on:input={() => (changing = true)}
            on:change={() => (changing = false)}
          />
          <input class="uneditable hidden" bind:value={selectedPattern.moveLeft} readonly />
        </div>
        <label class="leftColumn" for="scale">{strings.vPosition}</label>
        <div class="grid rightColumn">
          <input
            id="moveTop"
            type="range"
            bind:value={selectedPattern.moveTop}
            min={height * -2}
            max="0"
            on:input={() => (changing = true)}
            on:change={() => (changing = false)}
          />
          <input class="uneditable hidden" bind:value={selectedPattern.moveTop} readonly />
        </div>
        {#if mode === "stroke-join" || mode === "stroke"}
          <label class="leftColumn" for="stroke">{strings.stroke}</label>
          <div class="grid rightColumn">
            <input
              id="stroke"
              type="range"
              bind:value={selectedPattern.stroke}
              min="0.5"
              max={maxStroke}
              step="0.5"
              on:input={() => (changing = true)}
              on:change={() => (changing = false)}
            />
            <input class="uneditable hidden" bind:value={selectedPattern.stroke} readonly />
          </div>
        {/if}
        {#if mode === "stroke-join"}
          <label class="leftColumn">{strings.join}</label>
          <div class="rightColumn strokeJoin">
            <label> <input type="radio" bind:group={selectedPattern.join} value={1} />{strings.square}</label>
            <label> <input type="radio" bind:group={selectedPattern.join} value={2} />{strings.rounded}</label>
          </div>
        {/if}
        {#if maxSpacing[0] > 0}
          <label class="leftColumn" for="hspacing">{strings.hSpacing}</label>
          <div class="grid rightColumn">
            <input
              id="hspacing"
              type="range"
              bind:value={selectedPattern.spacing[0]}
              min="0"
              max={maxSpacing[0]}
              step="0.5"
              on:input={() => (changing = true)}
              on:change={() => (changing = false)}
            />
            <input class="uneditable hidden" bind:value={selectedPattern.spacing[0]} readonly />
          </div>
        {/if}
        {#if maxSpacing[1] > 0}
          <label class="leftColumn" for="vspacing">{strings.vSpacing}</label>
          <div class="grid rightColumn">
            <input
              id="vspacing"
              type="range"
              bind:value={selectedPattern.spacing[1]}
              min="0"
              max={maxSpacing[1]}
              step="0.5"
              on:input={() => (changing = true)}
              on:change={() => (changing = false)}
            />
            <input class="uneditable hidden" bind:value={selectedPattern.spacing[1]} readonly />
          </div>
        {/if}
        <label class="leftColumn" for="angle">{strings.angle}</label>
        <div class="grid rightColumn">
          <input
            id="angle"
            type="range"
            bind:value={selectedPattern.angle}
            min="0"
            max="180"
            step="5"
            on:input={() => (changing = true)}
            on:change={() => (changing = false)}
          />
          <!-- <input class="uneditable" bind:value={selectedPattern.angle} readonly /> -->
          <span class="uneditable">{selectedPattern.angle}</span>
        </div>
        <label class="leftColumn colorLabel capitalize">{strings.colors}</label>

        {#if maxColors > 2}
          <div class="grid rightColumn">
            <input
              id="colorNum"
              type="range"
              bind:value={selectedPattern.colorCounts}
              min="2"
              max={maxColors}
              step="1"
              on:input={() => {
                changing = true;
                setPickers();
              }}
              on:change={() => (changing = false)}
            />
            <span class="uneditable">{selectedPattern.colorCounts}</span>
          </div>
        {/if}

        <div class="rightColumn colors">
          {#each { length: 5 } as _, i}
            <div id="color{i + 1}Div" />
          {/each}
        </div>
        <div class="buttons">
          <button title={strings.random} on:click={randomPattern}>{strings.inspire}</button>
          <button id="resetButton1" title={strings.reset} on:click={resetPattern}>{strings.reset}</button>
        </div>
      </div>

      <hr />

      <div class="exportBar">
        <div class="exportGrid">
          <span>{strings.copy}</span>
          <button id="cssExport" on:click={copyText(cssOutput, "CSS", this.id)} title={strings.copyCSS}>CSS</button>
          <button id="svgExport" on:click={copyText(svgFile.replace("%23", "#"), "SVG", this.id)} title={strings.copySVG}>SVG</button>
        </div>
        <div class="downloadGrid">
          <span>{strings.download}</span>
          <button on:click={downloadSVG} title={strings.downloadSVG}>SVG</button>
          <button on:click={downloadPNG} title={strings.downloadPNG}>PNG</button>
        </div>
        <div class="dimensionGrid">
          <span>{strings.dimensions}</span>
          <input
            id="width"
            type="number"
            title={strings.width}
            placeholder={strings.width}
            bind:value={defaultWidth}
            min="0"
            max="9999"
            on:change={(e) => {
              localStorage.setItem("defaultWidth", e.target.value);
            }}
            on:input={(e) => {
              if (e.target.value.length > 4) e.target.value = e.target.value.slice(0, 4);
            }}
          />
          <input
            id="height"
            type="number"
            title={strings.height}
            placeholder={strings.height}
            bind:value={defaultHeight}
            min="0"
            max="9999"
            on:change={(e) => {
              localStorage.setItem("defaultHeight", e.target.value);
            }}
            on:input={(e) => {
              if (e.target.value.length > 4) e.target.value = e.target.value.slice(0, 4);
            }}
          />
        </div>
      </div>
    </div>
  </div>
  <div class="preview" style={cssOutput}>
    <div id="pngOutput" />

    <div class="buttons" style="display: {hide ? 'grid' : 'none'}">
      <button title={strings.random} on:click={randomPattern}>{strings.inspire}</button>
      <button id="resetButton2" title={strings.reset} on:click={resetPattern}>{strings.reset}</button>
    </div>
  </div>
</div>

<div class="bottomBar">
  <div class="exportGrid">
    <span>{strings.copy}</span>
    <button id="cssBottom" on:click={copyText(cssOutput, "CSS", this.id)} title={strings.copyCSS}>CSS</button>
    <button id="svgBottom" on:click={copyText(svgFile.replace("%23", "#"), "SVG", this.id)} title={strings.copySVG}>SVG</button>
  </div>
  <div class="downloadGrid">
    <span>{strings.download}</span>
    <button on:click={downloadSVG} title={strings.downloadSVG}>SVG</button>
    <button on:click={downloadPNG} title={strings.downloadSVG}>PNG</button>
  </div>
  <div class="dimensionGrid">
    <span>{strings.dimensions}</span>
    <input
      id="width"
      type="number"
      title={strings.width}
      placeholder={strings.width}
      bind:value={defaultWidth}
      min="0"
      max="9999"
      on:change={(e) => {
        localStorage.setItem("defaultWidth", e.target.value);
      }}
      on:input={(e) => {
        if (e.target.value.length > 4) e.target.value = e.target.value.slice(0, 4);
      }}
    />
    <input
      id="height"
      type="number"
      title={strings.height}
      placeholder={strings.height}
      bind:value={defaultHeight}
      min="0"
      max="9999"
      on:change={(e) => {
        localStorage.setItem("defaultHeight", e.target.value);
      }}
      on:input={(e) => {
        if (e.target.value.length > 4) e.target.value = e.target.value.slice(0, 4);
      }}
    />
  </div>
  <div class="buttons">
    <button title={strings.random} on:click={randomPattern}>{strings.inspire}</button>
    <button id="resetButton3" title={strings.reset} on:click={resetPattern}>{strings.reset}</button>
  </div>
  <label class="hideCheckbox"> <input type="checkbox" bind:checked={hide} /> {strings.hide} </label>
</div>

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
    display: flex;
    align-items: center;
    padding: 0;
    flex-wrap: wrap;
    margin-right: -1em;
  }
  .colors div {
    margin-right: 1em;
    margin-bottom: 1em;
  }

  .colorLabel {
    align-self: flex-start;
  }

  .uneditable {
    border: 0 none;
    background-color: var(--accent-text);
    color: var(--accent-text-color);
    font-size: 0.9em;
    padding: 5px 2px 0 2px;
    text-align: center;
    min-width: 2.5em;
    border-radius: var(--border-radius);
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

  .strokeJoin > label {
    display: grid;
    grid-auto-flow: column;
    place-content: start;
    gap: 0.35em;
    align-items: baseline;
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
