<script context="module">
  export async function preload({ params, query }) {
    const res = await this.fetch(`patterns/${params.slug}.json`);
    const data = await res.json();

    if (res.status === 200) return { post: data };
    else this.error(res.status, data.message);
  }
</script>

<script>
  import { Tabs, TabList, TabPanel, Tab } from "../../components/tabs.js";
  export let post;
  import constants from "../_constants.js";
  import { onMount } from "svelte";
  import "../_monolith.min.css";
  import { bind } from "svelte/internal";

  let Pickr, svg;

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
    for (let i = 1; i <= selectedPattern.colors.length; i++) createPicker("color" + i + "Div", i - 1);
  }

  let svgPattern = (colors, stroke, scale, spacing, angle, join) => {
      function multiStroke(i){
        if (mode[0] === "stroke") {
          strokeFill = " stroke = '" + colors[i+1] + "' fill='none'";
          joinMode = join == 2 ? "stroke-linejoin='round' stroke-linecap='round' " : "stroke-linecap='square' ";
        } else strokeFill = " stroke = 'none' fill='" + colors[i+1] + "'";
    
          return "<g transform='translate(" +
                  spacing[0] / 2 +
                  "," +
                  (height* i + spacing[1] * i * 0.5) +
                  ")' " +
                  joinMode +
                  "stroke-width='" +
                  stroke +
                  "'" +
                   strokeFill +
                  ">" +
                  path +
                  "</g>"
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
      "'/>"+
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
    mode = post.type;

  const presetPatterns = [
    {
      id: 1,
      colors: ["white", "black"],
      stroke: 0.5,
      scale: 1,
      spacing: [0, 0],
      angle: 0,
      join: 1
    },
    {
      id: 2,
      colors: [constants.randomColor(1), constants.randomColor(1), constants.randomColor(1)],
      stroke: constants.randomNumber(0.5, maxStroke),
      scale: constants.randomNumber(1, maxScale / 3),
      spacing: [
        mode[1] === "yes" ? constants.randomNumber(0, maxSpacing[0] / 3) : 0,
        mode[2] === "yes" ? constants.randomNumber(0, maxSpacing[0] / 3) : 0
      ],
      angle: constants.randomAngle(),
      join: constants.randomNumber(1, 2)
    },
    {
      id: 3,
      colors: [constants.randomColor(1), constants.randomColor(1), constants.randomColor(1), constants.randomColor(1)],
      stroke: constants.randomNumber(0.5, maxStroke),
      scale: constants.randomNumber(1, maxScale / 2),
      spacing: [
        mode[1] === "yes" ? constants.randomNumber(0, maxSpacing[0] / 3) : 0,
        mode[2] === "yes" ? constants.randomNumber(0, maxSpacing[0] / 3) : 0
      ],
      angle: constants.randomAngle(),
      join: constants.randomNumber(1, 2)
    },
    {
      id: 4,
      colors: [constants.randomColor(0.9), constants.randomColor(1), constants.randomColor(1)],
      stroke: constants.randomNumber(0.5, maxStroke),
      scale: constants.randomNumber(1, maxScale / 2),
      spacing: [
        mode[1] === "yes" ? constants.randomNumber(0, maxSpacing[0] / 3) : 0,
        mode[2] === "yes" ? constants.randomNumber(0, maxSpacing[0] / 3) : 0
      ],
      angle: constants.randomAngle(),
      join: constants.randomNumber(1, 2)
    }
  ];

  let selectedPattern = presetPatterns[0];
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

  function check() {
    for (let j = 0; j < presetPatterns.length; j++) {
      if ("pattern" + presetPatterns[j].id === this.id) {
        selectedPattern = presetPatterns[presetPatterns[j].id - 1];
        setPickers();
      }
    }
  }

  function randomPattern() {
    selectedPattern = {
      id: 5,
      // colors: [constants.randomColor(1), constants.randomColor(1), constants.randomColor(1)],
      colors: Array(constants.randomNumber(2, 5)).fill(constants.randomColor(1)),
      stroke: constants.randomNumber(0.5, maxStroke),
      scale: constants.randomNumber(1, maxScale),
      spacing: [
        mode[1] === "yes" ? constants.randomNumber(0, maxSpacing[0] / 3) : 0,
        mode[2] === "yes" ? constants.randomNumber(0, maxSpacing[0] / 3) : 0
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

if (colorDiv){
    while (colorDiv.hasChildNodes()) colorDiv.removeChild(colorDiv.firstChild);
}

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
      selectedPattern.colors[colorId] = color.toHSLA().toString();
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
    margin: 0 auto 0 auto;
    padding: 2em;
    background-color: #1a202c;
    color: #edf2f7;
  }

  .inputs {
    display: grid;
    grid-template-columns: auto 1fr auto;
    column-gap: 16px;
    row-gap: 16px;
    align-items: center;
    padding: 2em 0;
  }

  .colors {
    display: grid;
    grid-template-columns: auto auto auto auto 1fr ;
    column-gap: 16px;
    row-gap: 16px;
    align-items: center;
    padding: 2em 0;
  }
  .py-05 {
    padding: 0.5em 0;
  }

  .uneditable {
    border: 0 none;
    background-color: var(--accent-color);
    color: black;
    height: 24px;
    font-size: 0.9em;
    padding: 2px 2px 0 2px;
    text-align: center;
    width: 30px;
    cursor: none;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none;
  }

  .bottomBar {
    display: grid;
    grid-template-columns: auto auto auto;
    justify-content: center;
    align-items: center;
    /*column-gap: 16px;*/
    row-gap: 16px;
    position: fixed;
    bottom: 48px;
    right: 0;
    background-color: black;
    width: 100%;
    padding: 1em 0;
  }

  .downloadGrid {
    display: grid;
    grid-template-columns: auto auto auto;
    justify-content: center;
    align-items: center;
    column-gap: 16px;
    row-gap: 16px;
    background-color: black;
    padding: 1em;
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

  #sampleOutput,
  #preview {
    width: 100%;
    height: 500px;
  }

  .strokeJoin {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column: 2/4;
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
  <title>{post.title}</title>
</svelte:head>

<Tabs>
	<TabList>
		<Tab>design</Tab>
		<Tab>preview</Tab>
		<Tab>export</Tab>
	</TabList>

	<TabPanel>
<div id="page" class="page">
  <div class="container">
    <div>{post.title}</div>
    <div class="samples">
      {#each presetPatterns as pattern}
        <button id="pattern{pattern.id}" class="pattern" on:click={check}
          style={'background-image: url("data:image/svg+xml,' + svgPattern(pattern.colors, pattern.stroke, pattern.scale, pattern.spacing, pattern.angle, pattern.join) + '"' + ')'} />
      {/each}
    </div>

    <div class="inputs">
      <label for="scale">Scale</label>
      <input id="scale" type="range" bind:value={selectedPattern.scale} min="1" max={maxScale} /> 
      <input class="uneditable" bind:value={selectedPattern.scale} readonly/>
      {#if (mode[0] === 'stroke')}
	  <label for="stroke">Stroke</label>
      <input id="stroke" type="range" bind:value={selectedPattern.stroke} min="0.5" max={maxStroke} step="0.5"/>
      <input class="uneditable" bind:value={selectedPattern.stroke} readonly/>
	  <label>Join</label>
    <div class="strokeJoin">
      <label><input type=radio bind:group={selectedPattern.join} value={1}>Square</label>
      <label><input type=radio bind:group={selectedPattern.join} value={2}>Rounded</label>
      </div>
      {/if}
      {#if (mode[1] === 'yes')}
	  <label for="hspacing">Horizontal Spacing</label>
      <input id="hspacing" type="range" bind:value={selectedPattern.spacing[0]} min="0" max={maxSpacing[0]} step="0.5"/>
      <input class="uneditable" bind:value={selectedPattern.spacing[0]} readonly/>
      {/if}
      {#if (mode[2] === 'yes')}
	  <label for="vspacing">Vertical Spacing</label>
      <input id="vspacing" type="range" bind:value={selectedPattern.spacing[1]} min="0" max={maxSpacing[1]} step="0.5"/>
      <input class="uneditable" bind:value={selectedPattern.spacing[1]} readonly/>
      {/if}
	  <label for="angle">Angle</label>
      <input id="angle" type="range" bind:value={selectedPattern.angle} min="0" max="180" step="5"/>
      <input class="uneditable" bind:value={selectedPattern.angle} readonly/>
      <label>Colors</label>
      <div class="colors py-05">
        {#each { length: selectedPattern.colors.length } as _, i}
          <div id="color{i + 1}Div" />
        {/each}
      </div>
    </div>
    <div id="sampleOutput" style={cssOutput}></div>
    <br />
    <div class="bottomBar" style={cssOutput}>
        <button title="Random" on:click={randomPattern}>Inspire Me</button>
    </div>
  </div>
</div>
	</TabPanel>

	<TabPanel>
    Business Card
    <div id="preview" style={cssOutput}></div>
    <!-- <svg -->
      <!-- xmlns="http://www.w3.org/2000/svg" -->
      <!-- width="525" -->
      <!-- height="300" -->
      <!-- viewBox="0 0 525 300"> -->
      <!-- <rect x="0" y="0" width="525" height="300" fill="red" /> -->
      <!-- <g fill="none" stroke="pink" stroke-width="0.5"> -->
        <!-- <path -->
          <!-- d="M-7.5 33.505h15L0 46.495zM-7.5-6.495h15L0 6.495zM7.5 26.495h-15L0 -->
          <!-- 13.505zM27.5 6.495h-15L20-6.495zM12.5 13.505h15L20 26.495zM27.5 -->
          <!-- 46.495h-15l7.5-12.99zM32.5 33.505h15L40 46.495zM32.5-6.495h15L40 -->
          <!-- 6.495zM47.5 26.495h-15l7.5-12.99z" /> -->
      <!-- </g> -->
    <!-- </svg> -->
	</TabPanel>

	<TabPanel>
        
    <div class="downloadGrid">
      <span>Copy</span>
      <button on:click={copyText(cssOutput)} title="CSS">CSS</button>
      <button on:click={copyText(svgFile)} title="SVG">SVG</button>
      <span>Download</span>
      <button on:click={downloadSVG} title="Download as SVG file">SVG</button>
      <button on:click={downloadPNG} title="Download as PNG file">PNG</button>
      <div />
      <label for="width" class="text-center">Width</label>
      <label for="height" class="text-center">Height</label>
      <span>Dimensions</span>
      <input id="width" type="number" bind:value={outputWidth} min="0" max="9999" 
	  on:input={e => {if (e.target.value.length > 4) e.target.value = e.target.value.slice(0,4)}}/>
      <input id="height" type="number" bind:value={outputHeight} min="0" max="9999" 
	  on:input={e => {if (e.target.value.length > 4) e.target.value = e.target.value.slice(0,4)}}/>
    </div>
    <div id="pngOutput"></div>
	</TabPanel>
</Tabs>
