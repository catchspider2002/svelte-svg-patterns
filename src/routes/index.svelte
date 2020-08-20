<script>
  import { onMount } from "svelte";
  $: stroke = 3;
  $: angle = "30";
  $: scale = 4;
  const palettes = [
    ["#44337a", "#ffc800", "#FFFFFF", "#FF0054", "#00A878"],
    ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"],
    ["#e63946", "#f1faee", "#a8dadc", "#457b9d", "#1d3557"],
    ["#000000", "#14213d", "#fca311", "#e5e5e5", "#ffffff"],
    ["#f4f1de", "#e07a5f", "#3d405b", "#81b29a", "#f2cc8f"],
    ["#247ba0", "#70c1b3", "#b2dbbf", "#f3ffbd", "#ff1654"],
    ["#606c38", "#283618", "#fefae0", "#dda15e", "#bc6c25"],
    ["#9381ff", "#b8b8ff", "#f8f7ff", "#ffeedd", "#ffd8be"],
    ["white","blue","purple"],
    ["#20bf55","#0b4f6c","#01baef","#fbfbff","#757575"],
    ["white","red","blue","purple"]
  ];
  let size = 220
  $: colorPalette = palettes[0];

</script>

<style>
  :root {
    --main-bg-color: #1a202c;
    /* --accent-color: rgb(255, 218, 6); */
    --accent-color: #44337a;
    --secondary-color: #ffc800;
    --accent-text-color: #ffffff;
    --secondary-text-color: #000000;
    --accent-color-hover: rgba(255, 218, 6, 0.8);
    --border-radius: 4px;
    --text-gray-300: #e2e8f0;
    --text-gray-500: #a0aec0;
    --text-gray-900: #1a202c;
  }

  .accent-text {
    color: var(--accent-color);
  }

/*  .secondary-text {
    color: var(--secondary-color);
  }

  .primary-font {
    font-family: "Josefin Sans", sans-serif;
  }*/

  .secondary-font {
    font-family: "Montserrat", sans-serif;
  }

  button {
    font-size: 1em;
  }

  #logo {
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 1rem;
    padding-top: 2rem;
    padding-bottom: 5rem;
    align-items: flex-end;
  }

  .comingSoon {
    font-size: 0.875em;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding-bottom: 1rem;
  }

  .subtitle {
    margin-top: 0.5rem;
    margin-bottom: 2.5rem;
    /* line-height: 1.75rem; */
    font-size: 1.125em;
  }

  .features {
    background-color: var(--secondary-color);
  }

  .featureDescription {
    line-height: 1.625;
    font-size: 1em;
    color: var(--main-bg-color);
    font-family: "Montserrat", sans-serif;
  }

  .big-icon .iconify {
    font-size: 4em;
    line-height: 1em;
  }
  .normal-icon .iconify {
    font-size: 2em;
    line-height: 1em;
  }

  .svgContainer {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .landing {
    display: grid;
    color: black;
		background-color: var(--accent-color);
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    grid-column-gap: 32px;
    min-height: 90vh;
  }
/*   .header__bg {
    position: absolute;
    width: 100%;
    height: 100px;
    background: var(--accent-color);
    z-index: 1;
    clip-path: polygon(0 46%, 0 0, 100% 0);
  } */
  .subscribe {
    display: grid;
  }
  .toolbox {
    display: grid;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 360px;
    height: 240px;
    color: var(--secondary-color);
    padding: 1rem 1.5rem;
    /*     margin: 1.5rem; */
    grid-column-gap: 1em;
    grid-row-gap: 1em;
    background: var(--main-bg-color);
    grid-template-columns: auto 1fr;
    border-radius: var(--border-radius);
  }

  .topSide {
    display: grid;
    align-items: center;
  }

  h1 {
    color: var(--secondary-color);
    font-size: 3.2em;
    margin-top: 0.5rem;
    line-height: 1em;
  }

  h2 {
    color: black;
    font-weight: 600;
    font-size: 1.125em;
    margin-bottom: 0.5rem;
  }

  .bottomSide {
    position: relative;
    display: grid;
  }

  .logoText {
    color: var(--accent-text-color);
    font-weight: 600;
    padding-left: 8px;
  }
  .p-6 {
    padding: 1.5rem;
  }
  .flex {
    display: flex;
  }
  .items-center {
    align-items: center;
  }

  .radio-toolbar {
    margin: 0 1rem;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
  }

  .radio-toolbar input[type="radio"] {
    opacity: 0;
    position: fixed;
    width: 0;
  }

  .radio-toolbar label {
    display: inline-block;
    height: 2em;
    width: 2em;
    /*   margin-right: 0.5rem; */
    margin-bottom: 0.5rem;
    font-size: 1rem;
    /*   background:linear-gradient(-45deg, #e9c46a 0%, #e9c46a 50%, #264653 50%, #264653 100%); */
    border-radius: var(--border-radius);
    cursor: pointer;
    border: 2px solid transparent;
  }

  .radio-toolbar label:hover {
    border: 2px solid var(--secondary-color);
  }

  .radio-toolbar input[type="radio"]:focus + label {
    border: 2px solid var(--secondary-color);
  }

  .radio-toolbar input[type="radio"]:checked + label {
    border: 2px solid var(--secondary-color);
  }
  @media (max-width: 1024px) {
    .landing {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr;
    }
  }

  /*   @media (max-width: 768px) {

    .radio-toolbar {
      grid-template-columns: repeat(6, 1fr);
    }
  }
  @media (max-width: 520px) {
    .radio-toolbar {
      grid-template-columns: repeat(3, 1fr);
    }
  } */
</style>

<div class="landing accent-text">
  <div class="topSide">
    <div class="p-6">
      <div id="logo">
        <div class="normal-icon">
          <span class="iconify" data-icon="noto-v1:alien-monster" data-inline="false" />
        </div>
        <span class="logoText">PATTERN MONSTER</span>
      </div>
      <p class="comingSoon text-gray-400 secondary-font">COMING SOON</p>
      <h1>Create amazing SVG patterns in seconds</h1>
      <p class="subtitle text-gray-400 secondary-font">
        A simple online pattern generator to create repeatable SVG patterns. Perfect for website backgrounds, apparel, branding, packaging
        design and more.
      </p>
      <div class="subscribe">
        <script async data-uid="ba0253339a" src="https://crafty-artist-9316.ck.page/ba0253339a/index.js">

        </script>
      </div>
    </div>
  </div>
  <div class="bottomSide">
    <!-- <div class="header__bg" /> -->
    <div class="svgContainer">
      <div class="accent-text">
        <svg id="patternId" width="100%" height="100%" viewbox="0 0 1200 3600" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="a" patternUnits="userSpaceOnUse" width="20" height="{(colorPalette.length-1) * 20}" patternTransform="scale({scale}) rotate({angle})">
              <rect x="0" y="0" width="100%" height="100%" fill={colorPalette[0]} />
              
        {#each colorPalette as colorList, i}
          <g transform="translate(0,{20*i})" stroke-linecap="square" stroke-width={stroke} stroke={colorPalette[i+1]} fill="none">
            <path d="M -2.3354725e-8,9.8330078 H 20 Z" />
          </g>
        {/each}
            </pattern>
            <pattern id="b" patternUnits="userSpaceOnUse" width="20" height="20" patternTransform="scale({scale}) rotate({angle})">
              <rect x="0" y="0" width="100%" height="100%" fill={colorPalette[0]} />
              <g transform="translate(0,0)" stroke-linecap="square" stroke-width={stroke} stroke={colorPalette[1]} fill="none">
                <path d="M-6 5h20v10H-6zM-16 15H4v10h-20zM4 15h20v10H4zM-16-5H4V5h-20zM4-5h20V5H4zM14 5h20v10H14z" />
              </g>
            </pattern>
            <pattern id="c" patternUnits="userSpaceOnUse" width="20" height="15" patternTransform="scale({scale}) rotate({angle})">
              <rect x="0" y="0" width="100%" height="100%" fill={colorPalette[0]} />
              <g transform="translate(0,0)" stroke-linecap="square" stroke-width={stroke} stroke={colorPalette[1]} fill="none">
                <path
                  d="M-20-13.307c3.334-1.667 6.667-3.334 10-3.333 3.335 0 6.668 1.667 10 1.666 3.334 0 6.667-1.667 10-1.666 3.335 0 6.668
                  1.667 10 1.666 3.334 0 6.667-1.667 10-1.666 3.335 0 6.668 1.667 10 3.333M-20-.407c3.334 3.335 6.668 6.668 10 6.667 3.333 0
                  6.667-3.333 10-3.333 3.334 0 6.668 3.334 10 3.333 3.333 0 6.667-3.333 10-3.333 3.334 0 6.668 3.334 10 3.333 3.333 0
                  6.667-3.333 10-6.667" />
              </g>
            </pattern>
            <pattern id="d" patternUnits="userSpaceOnUse" width="20" height="28" patternTransform="scale({scale}) rotate({angle})">
              <rect x="0" y="0" width="100%" height="100%" fill={colorPalette[0]} />
              <g transform="translate(0,0)" stroke-linecap="square" stroke-width={stroke} stroke={colorPalette[1]} fill="none">
                <path d="M5 12H-5L0 2zM-5 16H5L0 26zM5 26h10l-5-10zM5 2h10l-5 10zM25 12H15l5-10zM15 16h10l-5 10z" />
              </g>
            </pattern>
            <pattern id="e" patternUnits="userSpaceOnUse" width="20" height="20" patternTransform="scale({scale}) rotate({angle})">
              <rect x="0" y="0" width="100%" height="100%" fill={colorPalette[0]} />
              <g transform="translate(0,0)" stroke-linecap="square" stroke-width={stroke} stroke={colorPalette[1]} fill="none">
                <path d="M3.25 10h13.5M10 3.25v13.5" />
              </g>
            </pattern>
            <pattern id="f" patternUnits="userSpaceOnUse" width="20" height="{(colorPalette.length-1) * 20}" patternTransform="scale({scale}) rotate({angle})">
              <rect x="0" y="0" width="100%" height="100%" fill={colorPalette[0]} />
        {#each colorPalette as colorList, i}
          <g transform="translate(0,{20*i})" stroke-linecap="square" stroke-width={stroke} stroke={colorPalette[i+1]} fill="none">
            <path d="M 12.5,10 A 2.5,2.5 0 0 1 10,12.5 2.5,2.5 0 0 1 7.5,10 2.5,2.5 0 0 1 10,7.5 2.5,2.5 0 0 1 12.5,10 Z" />
          </g>
        {/each}
            </pattern>
          </defs>
          <filter id="dropshadow" height="130%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="7" />
            <!-- stdDeviation is how much to blur -->
            <feOffset dx="3" dy="3" result="offsetblur" />
            <!-- how much to offset -->
            <feComponentTransfer>
              <feFuncA type="linear" slope="1.5" />
              <!-- slope is the opacity of the shadow -->
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <!-- this contains the offset blurred image -->
              <feMergeNode in="SourceGraphic" />
              <!-- this contains the element that the filter is applied to -->
            </feMerge>
          </filter>
          <!-- <g transform="translate(1200, 0) rotate(90)"> -->
          <g>
            <rect x="980" width={size} height="100%" fill="url(#f)" style="filter:url(#dropshadow)" />
            <rect x="780" width={size} height="100%" fill="url(#e)" style="filter:url(#dropshadow)" />
            <rect x="580" width={size} height="100%" fill="url(#d)" style="filter:url(#dropshadow)" />
            <rect x="380" width={size} height="100%" fill="url(#c)" style="filter:url(#dropshadow)" />
            <rect x="180" width={size} height="100%" fill="url(#b)" style="filter:url(#dropshadow)" />
            <rect x="-20" width={size} height="100%" fill="url(#a)" style="filter:url(#dropshadow)" />
          </g>
        </svg>
      </div>
    </div>
    <div class="toolbox items-center">
      <label for="scale">Scale</label>
      <input id="scale" type="range" bind:value={scale} min="0.5" max="10" step="0.5" />
      <label for="stroke">Stroke</label>
      <input id="stroke" type="range" bind:value={stroke} min="0.5" max="10" step="0.5" />
      <label for="angle">Angle</label>
      <input id="angle" type="range" bind:value={angle} min="0" max="180" step="5" />
      <label for="angle">Colors</label>
      <div class="radio-toolbar padding-top-5">
        {#each palettes as palette, i}
          <input
            type="radio"
            id="palette{i}"
            name="palette"
            value={i}
            on:change={() => {
            colorPalette = palette;
            }} />
          <label
            style="background:linear-gradient(-45deg, {palette[0]} 0%, {palette[0]} 50%, {palette[1]} 50%, {palette[1]} 100%);"
            class="disable-select"
            for="palette{i}" />
        {/each}
      </div>
    </div>
  </div>
</div>

<section class="features text-gray-500 body-font">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-800 sm:flex-row flex-col">
      <div
        class="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full text-indigo-400 bg-gray-800
        flex-shrink-0">
        <div class="big-icon">
          <span class="iconify" data-icon="bx:bxs-palette" data-inline="false" />
        </div>
      </div>
      <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
        <h2>Shooting Stars</h2>
        <p class="featureDescription">Customize foreground and background colors easily</p>
      </div>
    </div>
    <div class="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-800 sm:flex-row flex-col">
      <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
        <h2>The Catalyzer</h2>
        <p class="featureDescription">Adjust the stroke weight on supported patterns</p>
      </div>
      <div
        class="sm:w-32 order-first sm:order-none sm:h-32 h-20 w-20 sm:ml-10 inline-flex items-center justify-center rounded-full
        text-indigo-400 bg-gray-800 flex-shrink-0">
        <div class="big-icon">
          <span class="iconify" data-icon="zondicons:stroke-width" data-inline="false" />
        </div>
      </div>
    </div>
    <div class="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-800 sm:flex-row flex-col">
      <div
        class="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full text-indigo-400 bg-gray-800
        flex-shrink-0">

        <div class="big-icon">
          <span class="iconify" data-icon="whh:pattern" data-inline="false" />
        </div>
      </div>
      <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
        <h2>Shooting Stars</h2>
        <p class="featureDescription">Download a tileable SVG or a high resolution PNG image for print</p>
      </div>
    </div>
    <div class="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-800 sm:flex-row flex-col">
      <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
        <h2>The Catalyzer</h2>
        <p class="featureDescription">Copy CSS and SVG directly to your clipboard for web projects</p>
      </div>
      <div
        class="sm:w-32 order-first sm:order-none sm:h-32 h-20 w-20 sm:ml-10 inline-flex items-center justify-center rounded-full
        text-indigo-400 bg-gray-800 flex-shrink-0">
        <div class="big-icon">
          <span class="iconify" data-icon="vaadin:css" data-inline="false" />
        </div>
      </div>
    </div>
    <div class="flex items-center lg:w-3/5 mx-auto sm:flex-row flex-col">
      <div
        class="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full text-indigo-400 bg-gray-800
        flex-shrink-0">
        <div class="big-icon">
          <span class="iconify" data-icon="mdi:angle-acute" data-inline="false" />
        </div>
      </div>
      <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
        <h2>The 400 Blows</h2>
        <p class="featureDescription">Change the angle to generate unique images</p>
      </div>
    </div>
  </div>
</section>
