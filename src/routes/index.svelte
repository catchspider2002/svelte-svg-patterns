<script>
  // $: color = "#553c9a";
  // $: bg = "#ffc800";
  $: color = "black";
  $: bg = "white";
  $: stroke = 1;
  $: angle = "90";
  $: scale = 1;
  let border = 0,
    size = 200,
    // yPos = -600,
    cardSize = 200,
    cardBackground = "white";
  const palettes = [
    ["#553c9a", "#ffc800"],
    ["#e9c46a", "#264653"],
    ["#ffcdb2", "#e5989b"],
    ["#50514f", "#f25f5c"],
    ["#247ba0", "#70c1b3"],
    ["#f0a6ca", "#9c89b8"],
    ["#cad2c5", "#84a98c"],
    ["#1a936f", "#88d498"]
  ];
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
  }

  .newmountains-container {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .mountains {
    /* position: absolute; */
    /* top: 0; */
    /* left: 0; */
    display: grid;
    align-items: center;
    justify-content: center;
    /* background: var(--accent-text-color); */
    background-color: var(--accent-color);
    /* animation: slide 15s linear infinite; */
  }

  /* @keyframes slide {
    from {
      transform: translate(0, 0);
    }
    to {
      transform: translate(-1800px, 0);
    }
  } */

  .landing {
    background-color: var(--main-bg-color);
    /* height: 100vh; */
    display: grid;
    color: black;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
  .header__bg {
    position: absolute;
    width: 100%;
    height: 100px;
    background: var(--accent-color);
    z-index: 1;
    clip-path: polygon(0 46%, 0 0, 100% 0);
  }
  .subscribe {
    display: grid;
  }
  .toolbox {
    display: grid;
    color: var(--secondary-color);
    margin: 1.5rem;
    grid-column-gap: 1em;
    grid-row-gap: 1em;
    background: var(--main-bg-color);
    grid-template-columns: auto 1fr;
    border-radius: var(--border-radius);
  }

  .topGrid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 32px;
    /* 		grid-template-rows: 1fr; */
  }
  .topSide {
    background-color: var(--accent-color);
    /*     margin-bottom: -50px; */
  }

  h1 {
    color: var(--secondary-color);
  }

  .h5 {
    color: var(--text-gray-300);
    color: var(--accent-color);
  }

  .bottomSide {
    position: relative;
  }

  .logoText {
    color: var(--accent-text-color);
    font-weight: 600;
    padding-left: 8px;
  }

  .p-6 {
    padding: 1.5rem;
  }
  .px-6 {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  .pt-8 {
    padding-top: 2rem;
  }
  .pb-12 {
    padding-bottom: 3rem;
  }
  .flex {
    display: flex;
  }
  .items-center {
    align-items: center;
  }
  /* .justify-center {
    justify-content: center;
  } */
  .justify-between {
    justify-content: space-between;
  }
  .text-sm {
    font-size: 0.875rem;
  }
  .text-lg {
    font-size: 1.125rem;
  }
  .text-3xl {
    font-size: 1.875rem;
  }
  .font-semibold {
    font-weight: 600;
  }
  .text-gray-300 {
    color: var(--text-gray-300);
  }
  .uppercase {
    text-transform: uppercase;
  }
  .tracking-wider {
    letter-spacing: 0.05em;
  }
  .mt-2 {
    margin-top: 0.5rem;
  }
  .leading-7 {
    line-height: 1.75rem;
  }
  .leading-9 {
    line-height: 2.25rem;
  }

  .radio-toolbar {
    margin: 0 1rem;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    /* 		grid-auto-flow: column; */
    /* 		grid-auto-rows: auto; */
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

  @media (max-width: 768px) {
    .topGrid {
      grid-template-columns: 1fr;
    }
    .landing {
      height: unset;
    }

    .radio-toolbar {
      grid-template-columns: repeat(6, 1fr);
    }
  }
  @media (max-width: 520px) {
    .radio-toolbar {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>

<div class="landing">
  <div class="topSide">
    <div class="px-6 pt-8 pb-12">
      <div class="flex items-center justify-between">
        <div class="flex items-center tracking-wider">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            focusable="false"
            role="img"
            class="iconify iconify--noto-v1"
            width="2em"
            height="2em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 128 128"
            style="transform: rotate(360deg);">
            <path
              d="M102.26 21.7s-1.19-1.83-3.65-2.22c-3.06-.48-6.08.07-7.05 4.51c-.96 4.42-1.45 10.11 3.49 14.08l-7.6 2.13l-6.51-7.89s2.52.96
              2.86-.91c.42-2.29.42-4.36.97-7.87c.58-3.67 1.73-7.51 5.25-9.54c1.92-1.11 4.98-1.74 5.99-2.55c.78-.63.99-2.65 1.33-4.84l5.42
              4.16l1.7 7.4l-2.2 3.54z"
              fill="#d7598b" />
            <circle cx="107.39" cy="12.02" r="11.93" fill="#fcc21b" />
            <path
              d="M25.74 21.7s1.19-1.83 3.65-2.22c3.06-.48 6.08.07 7.05 4.51c.96 4.42 1.46 10.11-3.49 14.08l7.6
              2.13l6.51-7.89s-2.52.96-2.86-.91c-.42-2.29-.42-4.36-.97-7.87c-.59-3.67-1.73-7.51-5.25-9.54c-1.92-1.11-4.98-1.74-5.99-2.55c-.78-.63-.99-2.65-1.33-4.84l-5.42
              4.16l-1.7 7.4l2.2 3.54z"
              fill="#d7598b" />
            <circle cx="20.61" cy="12.02" r="11.93" fill="#fcc21b" />
            <path
              d="M107.29 114.08c-.43-2.59.02-5.5.48-7.83c.82-4.19 2.31-8.22 3.78-12.21c.47-1.29.95-2.58 1.4-3.87c1.5-4.32 2.32-8.9
              2.32-13.67c0-25.47-16.78-46.11-51.26-46.11S12.75 51.04 12.75 76.5c0 4.45.71 8.74 2.03 12.81c2.48 7.64 6.49 15.25 6.23
              23.48c-.15 4.94-2.97 7.47-6.43 10.44c-1.07.92-1.27 2.42.08 3.19c3.1 1.78 8.32-.19 11.33-1.4c2.69-1.08 5.21-2.93
              7.31-5.08c1.08-1.1 2.08-2.27 3.07-3.44c.82-.96 2.18-3.42 3.74-2.72c3.4 1.53-.58 7.86-2.3 9.38c-.7.62-1.65 1.18-1.97 2.12c-.36
              1.03.37 1.93 1.3 2.3c2.6 1.04 8.28-.72 10.88-2.46c1.86-1.25 3.41-2.85 4.71-4.68c.81-1.14 2.21-4.74 4.02-4.31c3.32.8 1.92 6.03
              2.14 8.3c.11 1.16.78 2.32 1.94 2.77c2.52.99 4.74-.79 6.22-2.63c1.65-2.05 2.44-4.32 3.73-6.54c1.03-1.79 2.83-2.16 4.12-.31c1.88
              2.69 3.04 5.25 6.03 6.96c2.46 1.4 5.3 2.27 8.14 2.29c1.25 0 6.79-.66
              4.92-3.11c-.82-1.06-2.39-1.32-3.46-2.11c-1.76-1.31-2.57-3.48-2.63-5.62c-.08-3.05 2.87-2.27 4.32-.8c2.35 2.38 3.75 5.76 6.78
              7.39c3.63 1.95 9.29 2.9 13.29 1.67c1.36-.42 2.92-1.01
              3.01-2.65c.09-1.55-1.23-1.92-2.47-2.27c-1.59-.44-2.69-.84-3.91-2.06c-.92-.88-1.42-2.08-1.63-3.33z"
              fill="#d7598b" />
            <g>
              <path
                d="M72.04 80.73l18.22-8.71s2.54 3.93 1.92 8.56c-.38 2.77-2.22 6-6.35 7.38c-3.72
                1.24-6.78.81-8.78-.08c-4.77-2.11-5.01-7.15-5.01-7.15z"
                fill="#bdcf46" />
              <path
                d="M55.4 80.73l-18.22-8.71s-2.54 3.93-1.92 8.56c.38 2.77 2.23 6 6.35 7.38c3.72 1.24 6.78.81 8.78-.08c4.78-2.11 5.01-7.15
                5.01-7.15z"
                fill="#bdcf46" />
              <path
                d="M74.85 94.95c-.37-1.25-1.66-2.33-2.97-2.38c-1.57-.06-2.57 1.41-3.73 2.22c-1.34.94-3.01 1.61-4.67
                1.46c-2.01-.19-3.07-1.54-4.61-2.64c-1.4-.99-3.15-1-4.39.3c-.59.62-.91 1.47-.86 2.33c.06 1.13.81 2.28 1.61 3.03c3.14 2.97
                8.02 3.62 12.08 2.58c2.83-.73 8.73-2.93 7.54-6.9z"
                fill="#2f2f2f" />
            </g>
          </svg>
          <span class="logoText">PATTERN MONSTER</span>
        </div>
      </div>
    </div>
    <div class="topGrid">
      <div class="px-6">
        <p class="text-sm font-semibold text-gray-300 uppercase tracking-wider">COMING SOON</p>
        <h1 class="mt-2 text-3xl leading-9 font-semibold font-display">Create amazing SVG patterns in seconds</h1>
        <p class="mt-2 text-lg leading-7 text-gray-300">
          A simple online pattern generator to create repeatable SVG patterns. Perfect for website backgrounds, apparel, branding, packaging
          design and more.
        </p>
        <div class="subscribe">
          <p class="h5 mt-2 leading-7 text-gray-300">Sign up for project updates, early previews and to find out when it is ready</p>
          <div>
            <script async data-uid="ba0253339a" src="https://crafty-artist-9316.ck.page/ba0253339a/index.js">

            </script>
          </div>
        </div>
      </div>
      <div class="toolbox p-6 items-center">

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
                color = palette[0];
                bg = palette[1];
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
  <div class="bottomSide">
    <!-- <div class="header__bg" /> -->
    <div class="newmountains-container">
      <div class="mountains">
        <svg id="patternId" width="1200" height="1200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="a" patternUnits="userSpaceOnUse" width="20" height="20" patternTransform="scale({scale}) rotate({angle})">
              <rect x="0" y="0" width="100%" height="100%" fill={bg} />
              <g transform="translate(0,0)" stroke-linecap="square" stroke-width={stroke} stroke={color} fill="none">
                <path d="M -2.3354725e-8,9.8330078 H 20 Z" />
              </g>
            </pattern>
            <pattern id="b" patternUnits="userSpaceOnUse" width="20" height="20" patternTransform="scale({scale}) rotate({angle})">
              <rect x="0" y="0" width="100%" height="100%" fill={bg} />
              <g transform="translate(0,0)" stroke-linecap="square" stroke-width={stroke} stroke={color} fill="none">
                <path d="M-6 5h20v10H-6zM-16 15H4v10h-20zM4 15h20v10H4zM-16-5H4V5h-20zM4-5h20V5H4zM14 5h20v10H14z" />
              </g>
            </pattern>
            <pattern id="c" patternUnits="userSpaceOnUse" width="20" height="15" patternTransform="scale({scale}) rotate({angle})">
              <rect x="0" y="0" width="100%" height="100%" fill={bg} />
              <g transform="translate(0,0)" stroke-linecap="square" stroke-width={stroke} stroke={color} fill="none">
                <path
                  d="M-20-13.307c3.334-1.667 6.667-3.334 10-3.333 3.335 0 6.668 1.667 10 1.666 3.334 0 6.667-1.667 10-1.666 3.335 0 6.668
                  1.667 10 1.666 3.334 0 6.667-1.667 10-1.666 3.335 0 6.668 1.667 10 3.333M-20-.407c3.334 3.335 6.668 6.668 10 6.667 3.333 0
                  6.667-3.333 10-3.333 3.334 0 6.668 3.334 10 3.333 3.333 0 6.667-3.333 10-3.333 3.334 0 6.668 3.334 10 3.333 3.333 0
                  6.667-3.333 10-6.667" />
              </g>
            </pattern>
            <pattern id="d" patternUnits="userSpaceOnUse" width="20" height="28" patternTransform="scale({scale}) rotate({angle})">
              <rect x="0" y="0" width="100%" height="100%" fill={bg} />
              <g transform="translate(0,0)" stroke-linecap="square" stroke-width={stroke} stroke={color} fill="none">
                <path d="M5 12H-5L0 2zM-5 16H5L0 26zM5 26h10l-5-10zM5 2h10l-5 10zM25 12H15l5-10zM15 16h10l-5 10z" />
              </g>
            </pattern>
            <pattern id="e" patternUnits="userSpaceOnUse" width="20" height="20" patternTransform="scale({scale}) rotate({angle})">
              <rect x="0" y="0" width="100%" height="100%" fill={bg} />
              <g transform="translate(0,0)" stroke-linecap="square" stroke-width={stroke} stroke={color} fill="none">
                <path d="M3.25 10h13.5M10 3.25v13.5" />
              </g>
            </pattern>
            <pattern id="f" patternUnits="userSpaceOnUse" width="20" height="20" patternTransform="scale({scale}) rotate({angle})">
              <rect x="0" y="0" width="100%" height="100%" fill={bg} />
              <g transform="translate(0,0)" stroke-linecap="square" stroke-width={stroke} stroke={color} fill="none">
                <path d="M 12.5,10 A 2.5,2.5 0 0 1 10,12.5 2.5,2.5 0 0 1 7.5,10 2.5,2.5 0 0 1 10,7.5 2.5,2.5 0 0 1 12.5,10 Z" />
              </g>
            </pattern>
          </defs>
          <filter id="dropshadow" height="130%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <!-- stdDeviation is how much to blur -->
            <feOffset dx="2" dy="2" result="offsetblur" />
            <!-- how much to offset -->
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.5" />
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
          <g >
            <rect x={border} width={size} height="100%" fill="url(#f)" transform="translate(1000, 0)" style="filter:url(#dropshadow)" />
            <rect x={border} width={size} height="100%" fill="url(#e)" transform="translate(800, 0)" style="filter:url(#dropshadow)" />
            <rect x={border} width={size} height="100%" fill="url(#d)" transform="translate(600, 0)" style="filter:url(#dropshadow)" />
            <rect x={border} width={size} height="100%" fill="url(#c)" transform="translate(400, 0)" style="filter:url(#dropshadow)" />
            <rect x={border} width={size} height="100%" fill="url(#b)" transform="translate(200, 0)" style="filter:url(#dropshadow)" />
            <rect x={border} width={size} height="100%" fill="url(#a)" transform="translate(0, 0)" style="filter:url(#dropshadow)" />
          </g>
        </svg>
      </div>
    </div>
  </div>

  <section class="text-gray-500 bg-gray-900 body-font">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-800 sm:flex-row flex-col">
      <div class="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full text-indigo-400 bg-gray-800 flex-shrink-0">
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="sm:w-16 sm:h-16 w-10 h-10" viewBox="0 0 24 24">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
        </svg>
      </div>
      <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
        <h2 class="text-white text-lg title-font font-medium mb-2">Shooting Stars</h2>
        <p class="leading-relaxed text-base">Customize foreground and background colors easily</p>
      </div>
    </div>
    <div class="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-800 sm:flex-row flex-col">
      <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
        <h2 class="text-white text-lg title-font font-medium mb-2">The Catalyzer</h2>
        <p class="leading-relaxed text-base">Adjust the stroke weight on supported patterns</p>
      </div>
      <div class="sm:w-32 order-first sm:order-none sm:h-32 h-20 w-20 sm:ml-10 inline-flex items-center justify-center rounded-full text-indigo-400 bg-gray-800 flex-shrink-0">
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="sm:w-16 sm:h-16 w-10 h-10" viewBox="0 0 24 24">
          <circle cx="6" cy="6" r="3"></circle>
          <circle cx="6" cy="18" r="3"></circle>
          <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
        </svg>
      </div>
    </div>
    <div class="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-800 sm:flex-row flex-col">
      <div class="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full text-indigo-400 bg-gray-800 flex-shrink-0">
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="sm:w-16 sm:h-16 w-10 h-10" viewBox="0 0 24 24">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
        </svg>
      </div>
      <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
        <h2 class="text-white text-lg title-font font-medium mb-2">Shooting Stars</h2>
        <p class="leading-relaxed text-base">Download a tileable SVG or a high resolution PNG image for print</p>
      </div>
    </div>
    <div class="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-800 sm:flex-row flex-col">
      <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
        <h2 class="text-white text-lg title-font font-medium mb-2">The Catalyzer</h2>
        <p class="leading-relaxed text-base">Copy CSS and SVG directly to your clipboard for web projects</p>
      </div>
      <div class="sm:w-32 order-first sm:order-none sm:h-32 h-20 w-20 sm:ml-10 inline-flex items-center justify-center rounded-full text-indigo-400 bg-gray-800 flex-shrink-0">
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="sm:w-16 sm:h-16 w-10 h-10" viewBox="0 0 24 24">
          <circle cx="6" cy="6" r="3"></circle>
          <circle cx="6" cy="18" r="3"></circle>
          <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
        </svg>
      </div>
    </div>
    <div class="flex items-center lg:w-3/5 mx-auto sm:flex-row flex-col">
      <div class="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full text-indigo-400 bg-gray-800 flex-shrink-0">
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="sm:w-16 sm:h-16 w-10 h-10" viewBox="0 0 24 24">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </div>
      <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
        <h2 class="text-white text-lg title-font font-medium mb-2">The 400 Blows</h2>
        <p class="leading-relaxed text-base">Change the angle to generate unique images</p>
      </div>
    </div>
  </div>
</section>
  








</div>
