<script context="module">
  export async function preload({ params, query }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte
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
  import "../_monolith.min.css";

  let Pickr, svg;

  onMount(async () => {
    const module = await import("@simonwep/pickr");
    Pickr = module.default;
    const module1 = await import("save-svg-as-png");
    svg = module1.default;
    doStuff();
  });

  function doStuff(){
    const elements = document.getElementsByClassName("pcr-app");
    while (elements.length > 0) elements[0].remove();
    createColorPickers();
    console.log("do Stuff End");
  }

  function setSvgFile() {
    svgFile = svgPattern(
      selectedPattern.color1,
      selectedPattern.color2,
      selectedPattern.stroke,
      selectedPattern.scale,
      selectedPattern.angle
    );

  }

  //   let svgPattern = (color1, color2, stroke, scale) => {
  //     return (
  //       "<svg xmlns='http://www.w3.org/2000/svg' width='" +
  //       scale * width +
  //       "' height='" +
  //       scale * height +
  //       "' viewBox='0 0 " +
  //       viewBoxWidth +
  //       " " +
  //       viewBoxHeight +
  //       "'><rect x='0' y='0' width='" +
  //       width +
  //       "' height='" +
  //       height +
  //       "' fill='" +
  //       color1 +
  //       "'/><g fill='none' stroke='" +
  //       color2 +
  //       "' stroke-width='" +
  //       Math.round(stroke * 50) / 100 +
  //       "'>" +
  //       path +
  //       "</g></svg>"
  //     );
  //   };

  let svgPattern = (color1, color2, stroke, scale, angle) => {
    let patternNew =
      "<svg id='testId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs>" +
      "<pattern id='a' patternUnits='userSpaceOnUse' width='" +
      width +
      "' height='" +
      height +
      "' patternTransform='scale(" +
      scale +
      ") rotate(" +
      angle +
      ")'><rect x='0' y='0' width='" +
      width +
      "' height='" +
      height +
      "' fill='" +
      color1 +
      "'/><g stroke-width='" +
      stroke +
      "' stroke = '" +
      color2 +
      "' fill='" +
      // color2 +
      "none" +
      "'>" +
      path +
      "</g></pattern></defs><rect width='100%' height='100%' fill='url(#a)'/></svg>";
    return patternNew.replace("#", "%23");
  };

  const colors = post.colors,
    maxStroke = post.maxStroke,
    maxScale = post.maxScale,
    width = post.width,
    height = post.height,
    path = post.path;

  const presetPatterns = [
    {
      id: 1,
      color1: "white",
      color2: "black",
      stroke: 0.5,
      scale: 1,
      angle: 0
    },
    {
      id: 2,
      color1: constants.randomColor(0.8),
      color2: constants.randomColor(1),
      stroke: constants.randomNumber(0.5, maxStroke),
      scale: constants.randomNumber(0.1, maxScale / 3),
      angle: constants.randomNumber(0, 180)
    },
    {
      id: 3,
      color1: constants.randomColor(1),
      color2: constants.randomColor(1),
      stroke: constants.randomNumber(0.5, maxStroke),
      scale: constants.randomNumber(1, maxScale / 2),
      angle: constants.randomNumber(0, 180)
    },
    {
      id: 4,
      color1: constants.randomColor(0.9),
      color2: constants.randomColor(1),
      stroke: constants.randomNumber(0.5, maxStroke),
      scale: constants.randomNumber(1, maxScale / 2),
      angle: constants.randomNumber(0, 180)
    }
  ];

  let selectedPattern = presetPatterns[0];
  $: svgFile = svgPattern(
    selectedPattern.color1,
    selectedPattern.color2,
    selectedPattern.stroke,
    selectedPattern.scale,
    selectedPattern.angle
  );

  let outputWidth = 1080,
    outputHeight = 1080;

  $: cssOutput = 'background-image: url("data:image/svg+xml,' + svgFile + '")';

  function check() {
    for (var j = 0; j < presetPatterns.length; j++) {
      if ("pattern" + presetPatterns[j].id === this.id) {
        selectedPattern = presetPatterns[presetPatterns[j].id - 1];
        setSvgFile();
      }
    }
  }

  function randomPattern() {
    selectedPattern = {
      id: 5,
      color1: constants.randomColor(0.8),
      color2: constants.randomColor(1),
      stroke: constants.randomNumber(0.5, maxStroke),
      scale: constants.randomNumber(1, maxScale),
      angle: constants.randomNumber(0, 180)
    };
    setSvgFile();
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
    
    document.getElementById("sampleOutput").innerHTML = svgFile
      .replace("%23", "#")
      .replace("width='100%' height='100%'", "width='" + outputWidth + "px' height='" + outputHeight + "px'");

    svg.saveSvgAsPng(document.getElementById("testId"), "diagram.png");
    document.getElementById("sampleOutput").innerHTML = ""
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
    for (let i = 1; i <= colors; i++) createPicker("color" + i + "Div", "color" + i);
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
    margin: 0 auto 220px auto;
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

  .downloadGrid {
    display: grid;
    grid-template-columns: auto auto auto;
    justify-content: center;
    align-items: center;
    column-gap: 16px;
    row-gap: 16px;
    position: fixed;
    bottom: 0;
    right: 0;
    background-color: black;
    width: 100%;
    padding: 1em;
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

  #sampleOutput {
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
  <title>{post.title}</title>
</svelte:head>


<!-- <div class="content">{post.path}</div> -->
<div id="page" class="page">
  <div class="container">
    <div>{post.title}</div>
    <div class="samples">
      {#each presetPatterns as pattern}
        <button id="pattern{pattern.id}" class="pattern" on:click={check}
          style={'background-image: url("data:image/svg+xml,' + svgPattern(pattern.color1, pattern.color2, pattern.stroke, pattern.scale, pattern.angle) + '"' + ')'} />
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
      <input type="number" bind:value={selectedPattern.scale} min="1" max="100" />
      <input type="number" bind:value={selectedPattern.stroke} min="0.5" max="100" />
      <label for="scale">Scale</label>
      <input id="scale" type="range" on:input={setSvgFile} bind:value={selectedPattern.scale} min="1" max={maxScale} /> 
	  <label for="stroke">Stroke Size</label>
      <input id="stroke" type="range" on:input={setSvgFile} bind:value={selectedPattern.stroke} min="0.5" max={maxStroke} step="0.5"/>
	  <label for="angle">Angle</label>
      <input id="angle" type="range" on:input={setSvgFile} bind:value={selectedPattern.angle} min="0" max="180" step="5"/>
      <label>Colors</label>
      <div class="inputs py-05">
        {#each { length: colors } as _, i}
          <div id="color{i + 1}Div" />
        {/each}
      </div>
    </div>
    <div id="sampleOutput" style={cssOutput}></div>
    <br />
    <div class="downloadGrid">
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
